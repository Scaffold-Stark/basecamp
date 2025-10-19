"use client";

import { ConnectedAddress } from "~~/components/ConnectedAddress";
import { useState } from "react";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";
import { useScaffoldMultiWriteContract } from "~~/hooks/scaffold-stark/useScaffoldMultiWriteContract";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-stark/useScaffoldEventHistory";
import { useDeployedContractInfo } from "~~/hooks/scaffold-stark/useDeployedContractInfo";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark/useScaffoldWriteContract";
import { useTargetNetwork } from "~~/hooks/scaffold-stark/useTargetNetwork";
import { useAccount } from "@starknet-react/core";
import useScaffoldStrkBalance from "~~/hooks/scaffold-stark/useScaffoldStrkBalance";

const Home = () => {
  const [displayAmount, setDisplayAmount] = useState<string>("");
  const [amountWei, setAmountWei] = useState<bigint>(0n);

  const { targetNetwork } = useTargetNetwork();

  const { address: connectedAddress } = useAccount();

  // vSTRK contract info
  const { data: vStrk } = useDeployedContractInfo("vStrk");

  const toHex = (v: unknown) =>
    typeof v === "bigint" ? `0x${v.toString(16)}` : (v as string);

  // Deposited amount = user's vSTRK balance (shares)
  const { data: vStrkBalance } = useScaffoldReadContract({
    contractName: "vStrk",
    functionName: "balance_of",
    args: [connectedAddress],
  });

  // Available STRK balance of user
  const { value: availableStrk } = useScaffoldStrkBalance({
    address: connectedAddress || undefined,
  });

  // Redeem (withdraw) all vSTRK shares to STRK
  const { sendAsync: redeemAll, isPending: isRedeeming } =
    useScaffoldWriteContract({
      contractName: "vStrk",
      functionName: "redeem",
      args: [vStrkBalance as any, connectedAddress, connectedAddress],
    });

  // STRK-only deposit flow: approve STRK to vSTRK, then deposit assets
  const { sendAsync: depositStrk, isPending: isDepositing } =
    useScaffoldMultiWriteContract({
      calls: [
        {
          contractName: "Strk",
          functionName: "approve",
          args: [vStrk?.address, amountWei],
        },
        {
          contractName: "vStrk",
          functionName: "deposit",
          args: [amountWei, connectedAddress],
        },
      ],
    });

  // Event history for vSTRK Deposit and Withdraw
  const { data: depositEvents } = useScaffoldEventHistory({
    contractName: "vStrk",
    eventName: "Deposit",
    fromBlock: 1540452n, // NOTE : For now keep this block number as it is. When running local mainnet fork, use this block number as the starting block number. For example: `yarn chain --fork-network https://starknet-mainnet.public.blastapi.io/rpc/v0_9 --fork-block 1540452`
    watch: true,
    enabled: !!vStrk,
  });
  const { data: withdrawEvents } = useScaffoldEventHistory({
    contractName: "vStrk",
    eventName: "Withdraw",
    fromBlock: 1540452n,
    watch: true,
    enabled: !!vStrk,
  });

  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      <div className="px-5 w-full max-w-6xl">
        <h1 className="text-center mb-8">
          <span className="block text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Scaffold-Stark Workshop
          </span>
          <div className="flex justify-center">
            <span className="text-base mt-2 badge badge-primary">
              {targetNetwork.name}
            </span>
          </div>
        </h1>
        <ConnectedAddress />
        <div className="mt-8 space-y-6">
          {/* Contract Status removed for Vesu demo */}
          <div className="bg-base-100 p-8 rounded-3xl border border-gradient shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-secondary">
                Contract Management
              </h2>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => redeemAll()}
                disabled={
                  !vStrk ||
                  !connectedAddress ||
                  !vStrkBalance ||
                  (vStrkBalance as any) === 0n ||
                  isRedeeming
                }
              >
                {isRedeeming ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Withdraw All"
                )}
              </button>
            </div>
            <div className="p-4 bg-base-200 rounded-xl">
              <div className="text-lg mb-4">
                Withdraw all your vSTRK shares back to STRK.
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-base-300 rounded-lg">
                  <span className="block text-sm opacity-70">
                    Deposited vSTRK (shares)
                  </span>
                  <span className="text-xl font-medium">
                    {vStrkBalance
                      ? (Number(vStrkBalance) / 10 ** 18).toFixed(6)
                      : "0.000000"}{" "}
                    vSTRK
                  </span>
                </div>
                <div className="p-4 bg-base-300 rounded-lg">
                  <span className="block text-sm opacity-70">
                    Available STRK
                  </span>
                  <span className="text-xl font-medium">
                    {availableStrk
                      ? (Number(availableStrk) / 10 ** 18).toFixed(6)
                      : "0.000000"}{" "}
                    STRK
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-base-100 p-8 rounded-3xl border border-gradient shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-secondary">Deposit</h2>
            <div className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-medium">
                    Amount (STRK)
                  </span>
                </label>
                <div className="bg-base-200 p-4 rounded-xl border-2 border-secondary">
                  <div className="flex flex-col space-y-4">
                    <div className="flex bg-base-300 text-accent rounded-lg">
                      <input
                        type="number"
                        className="input input-ghost focus:outline-none h-[2.2rem] min-h-[2.2rem] px-4 w-full text-xs placeholder:text-[#9596BF] text-neutral rounded-lg"
                        value={displayAmount || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          setDisplayAmount(value);
                          if (value && value !== "") {
                            try {
                              const amountInWei = BigInt(
                                Math.floor(Number(value) * 10 ** 18),
                              );
                              setAmountWei(amountInWei);
                            } catch (error) {
                              console.error("Invalid number input:", error);
                              setAmountWei(0n);
                            }
                          } else {
                            setAmountWei(0n);
                          }
                        }}
                        placeholder="Enter amount"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="btn btn-primary btn-lg w-full text-lg"
                onClick={() => depositStrk()}
                disabled={
                  !vStrk ||
                  !connectedAddress ||
                  amountWei === 0n ||
                  isDepositing
                }
              >
                {isDepositing ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Deposit STRK"
                )}
              </button>
            </div>
          </div>
          <div className="bg-base-100 p-8 rounded-3xl border border-gradient shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-secondary">
              vSTRK Activity
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Deposits</h3>
                <div className="space-y-3">
                  {depositEvents?.length ? (
                    depositEvents.map((evt, idx) => (
                      <div
                        key={`dep-${idx}`}
                        className="p-4 bg-base-200 rounded-xl"
                      >
                        <p className="text-sm opacity-70 break-all">
                          Owner: {toHex(evt.args.owner)}
                        </p>
                        <p className="text-lg">
                          Assets:{" "}
                          {(Number(evt.args.assets) / 10 ** 18).toFixed(6)} STRK
                          · Shares:{" "}
                          {(Number(evt.args.shares) / 10 ** 18).toFixed(6)}{" "}
                          vSTRK
                        </p>
                      </div>
                    ))
                  ) : (
                    <span className="opacity-60">No deposit events</span>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Withdrawals</h3>
                <div className="space-y-3">
                  {withdrawEvents?.length ? (
                    withdrawEvents.map((evt, idx) => (
                      <div
                        key={`with-${idx}`}
                        className="p-4 bg-base-200 rounded-xl"
                      >
                        <p className="text-sm opacity-70 break-all">
                          Owner: {toHex(evt.args.owner)}
                        </p>
                        <p className="text-lg">
                          Assets:{" "}
                          {(Number(evt.args.assets) / 10 ** 18).toFixed(6)} STRK
                          · Shares:{" "}
                          {(Number(evt.args.shares) / 10 ** 18).toFixed(6)}{" "}
                          vSTRK
                        </p>
                      </div>
                    ))
                  ) : (
                    <span className="opacity-60">No withdraw events</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
