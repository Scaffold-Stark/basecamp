"use client";

import Link from "next/link";
import Image from "next/image";
import { ConnectedAddress } from "~~/components/ConnectedAddress";
import { useState } from "react";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-stark/useScaffoldEventHistory";
import { useScaffoldMultiWriteContract } from "~~/hooks/scaffold-stark/useScaffoldMultiWriteContract";
import { useBlockNumber } from "@starknet-react/core";
import { BlockTag } from "starknet";
import { useDeployedContractInfo } from "~~/hooks/scaffold-stark";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark/useScaffoldWriteContract";
import { useTargetNetwork } from "~~/hooks/scaffold-stark/useTargetNetwork";

const Home = () => {
  const [selectedToken, setSelectedToken] = useState<"ETH">("ETH");
  const [inputAmount, setInputAmount] = useState<bigint>(0n);
  const [greeting, setGreeting] = useState<string>("");
  const [displayAmount, setDisplayAmount] = useState<string>("0");

  const { targetNetwork } = useTargetNetwork();

  const { data: YourContract } = useDeployedContractInfo("YourContract");
  const { data: EthContract } = useDeployedContractInfo("Eth");

  const { data: currentGreeting } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "greeting",
  });

  const { data: premium } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "premium",
  });

  const { data: ethBalance } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "token_deposits",
    args: [EthContract?.address],
  });

  const { data: lastBlock } = useBlockNumber({
    blockIdentifier: "pending" as BlockTag,
  });

  const { data: events } = useScaffoldEventHistory({
    contractName: "YourContract",
    eventName: "contracts::YourContract::YourContract::GreetingChanged",
    fromBlock: lastBlock ? (lastBlock > 50n ? BigInt(lastBlock - 50) : 0n) : 0n,
    watch: true,
  });

  const { sendAsync: setGreetingNoPayment } = useScaffoldWriteContract({
    contractName: "YourContract",
    functionName: "set_greeting",
    args: [greeting, 0n],
  });

  const { sendAsync: withdrawAll } = useScaffoldWriteContract({
    contractName: "YourContract",
    functionName: "withdraw",
  });

  const { sendAsync: setGreetingWithPayment } = useScaffoldMultiWriteContract({
    calls: [
      {
        contractName: "Eth",
        functionName: "approve",
        args: [YourContract?.address, BigInt(inputAmount)],
      },
      {
        contractName: "YourContract",
        functionName: "set_greeting",
        args: [greeting, BigInt(inputAmount)],
      },
    ],
  });

  const handleSetGreeting = async () => {
    const amount = BigInt(inputAmount);
    if (amount > 0n) {
<<<<<<< HEAD
      await setGreetingWithPayment();
    } else {
      await setGreetingNoPayment();
=======
    } else {
>>>>>>> step-0
    }
  };

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
          <div className="bg-base-100 p-8 rounded-3xl border border-gradient shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-secondary">
              Contract Status
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-base-200 rounded-xl">
                <h3 className="text-lg font-semibold mb-2">Current Greeting</h3>
                <p className="text-xl font-medium break-all">
                  {currentGreeting?.toString() || "No greeting set"}
                </p>
              </div>

              <div className="p-4 bg-base-200 rounded-xl">
                <h3 className="text-lg font-semibold mb-2">Premium Status</h3>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full ${premium ? "bg-green-500" : "bg-gray-400"}`}
                  ></div>
                  <span className="text-xl font-medium">
                    {premium ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-base-100 p-8 rounded-3xl border border-gradient shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-secondary">
                Contract Management
              </h2>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => withdrawAll()}
              >
                Withdraw All Funds
              </button>
            </div>
            <div className="p-4 bg-base-200 rounded-xl">
              <div className="text-lg mb-4">
                This action will withdraw all deposited tokens back to the
                contract owner.
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-base-300 rounded-lg">
                  <span className="block text-sm opacity-70">
                    Available ETH
                  </span>
                  <span className="text-xl font-medium">
                    {ethBalance
                      ? (Number(ethBalance) / 10 ** 18).toFixed(6)
                      : "0.000000"}{" "}
                    ETH
                  </span>
                </div>
                {/* <div className="p-4 bg-base-300 rounded-lg">
                  <span className="block text-sm opacity-70">
                    Available STRK
                  </span>
                  <span className="text-xl font-medium">
                    {strkBalance
                      ? (Number(strkBalance) / 10 ** 18).toFixed(6)
                      : "0.000000"}{" "}
                    STRK
                  </span>
                </div> */}
              </div>
            </div>
          </div>

          <div className="bg-base-100 p-8 rounded-3xl border border-gradient shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-secondary">
              Set Greeting & Deposit
            </h2>
            <div className="space-y-6">
              {/* <div className="space-y-2">
                <label className="text-lg font-medium">Select Token</label>
                <div className="flex gap-4">
                  <button
                    className={`btn btn-lg flex-1 ${selectedToken === "ETH" ? "btn-primary" : "btn-outline"}`}
                    onClick={() => setSelectedToken("ETH")}
                  >
                    ETH
                  </button>
                  <button
                    className={`btn btn-lg flex-1 ${selectedToken === "STRK" ? "btn-primary" : "btn-outline"}`}
                    onClick={() => setSelectedToken("STRK")}
                  >
                    STRK
                  </button>
                </div>
              </div> */}

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-medium">
                    Amount ({selectedToken})
                  </span>
                </label>
                <input
                  type="number"
                  className="input input-bordered input-lg text-lg"
                  value={displayAmount || ""}
                  onChange={(e) => {
                    setDisplayAmount(e.target.value);
                    setInputAmount(BigInt(Number(e.target.value) * 10 ** 18));
                  }}
                  placeholder={`Enter ${selectedToken} amount`}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-medium">
                    Greeting Message
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered input-lg text-lg"
                  value={greeting}
                  onChange={(e) => setGreeting(e.target.value)}
                  placeholder="Enter your greeting"
                />
              </div>

              <button
                className="btn btn-primary btn-lg w-full text-lg"
                onClick={handleSetGreeting}
                disabled={!greeting}
              >
                {Number(inputAmount) > 0
                  ? `Set Greeting with ${selectedToken}`
                  : "Set Greeting"}
              </button>
            </div>
          </div>

          {/* <div className="bg-base-100 p-8 rounded-3xl border border-gradient shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-secondary">
              Transaction History
            </h2>
            <div className="space-y-4">
              {events?.map((event, index) => (
                <div key={index} className="p-4 bg-base-200 rounded-xl">
                  <p className="text-lg">
                    Set Greeting to {event.args.new_greeting}
                    {event.args.value > 0n && (
                      <span className="ml-2 text-primary">
                        with {(Number(event.args.value) / 10 ** 18).toFixed(6)}
                        {event.args.token === BigInt(EthContract?.address || "")
                          ? " ETH"
                          : " STRK"}
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
