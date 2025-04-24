"use client";

import { ConnectedAddress } from "~~/components/ConnectedAddress";
import { useState } from "react";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-stark/useScaffoldEventHistory";
import { useScaffoldMultiWriteContract } from "~~/hooks/scaffold-stark/useScaffoldMultiWriteContract";
import { useDeployedContractInfo } from "~~/hooks/scaffold-stark/useDeployedContractInfo";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark/useScaffoldWriteContract";
import { useTargetNetwork } from "~~/hooks/scaffold-stark/useTargetNetwork";
import { CairoOption, CairoOptionVariant } from "starknet";

const Home = () => {
  const [selectedToken] = useState<"STRK">("STRK");
  const [inputAmount, setInputAmount] = useState<bigint>(0n);
  const [greeting, setGreeting] = useState<string>("");
  const [displayAmount, setDisplayAmount] = useState<string>("");
  const [isNoneOption, setIsNoneOption] = useState<boolean>(true);

  const { targetNetwork } = useTargetNetwork();

  const { data: YourContract } = useDeployedContractInfo("YourContract");
  const { data: StrkContract } = useDeployedContractInfo("Strk");

  const { data: currentGreeting } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "greeting",
  });

  const { data: premium } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "premium",
  });

  const { data: strkBalance } = useScaffoldReadContract({
    contractName: "Strk",
    functionName: "balance_of",
    args: [YourContract?.address],
  });

  const noneOption: CairoOption<bigint> = new CairoOption(
    CairoOptionVariant.None,
  );

  const { sendAsync: setGreetingNoPayment } = useScaffoldWriteContract({
    contractName: "YourContract",
    functionName: "set_greeting",
    args: [greeting, noneOption],
  });

  const { sendAsync: withdrawAll } = useScaffoldWriteContract({
    contractName: "YourContract",
    functionName: "withdraw",
  });

  const someOption: CairoOption<bigint> = new CairoOption(
    CairoOptionVariant.Some,
    inputAmount,
  );

  const { sendAsync: setGreetingWithPayment } = useScaffoldMultiWriteContract({
    calls: [
      {
        contractName: "Strk",
        functionName: "approve",
        args: [YourContract?.address, someOption.unwrap()],
      },
      {
        contractName: "YourContract",
        functionName: "set_greeting",
        args: [greeting, someOption],
      },
    ],
  });

  const handleSetGreeting = async () => {
    if (isNoneOption) {
      await setGreetingNoPayment();
    } else {
      await setGreetingWithPayment();
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
                  {currentGreeting?.toString() ?? "No greeting set"}
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
                {/* <div className="p-4 bg-base-300 rounded-lg">
                  <span className="block text-sm opacity-70">
                    Available ETH
                  </span>
                  <span className="text-xl font-medium">
                    {ethBalance
						  ? (Number(ethBalance) / 10 ** 18).toFixed(6)
						  : "0.000000"}{" "}
                    ETH
                  </span>
                </div> */}
                <div className="p-4 bg-base-300 rounded-lg">
                  <span className="block text-sm opacity-70">
                    Available STRK
                  </span>
                  <span className="text-xl font-medium">
                    {strkBalance
                      ? (Number(strkBalance) / 10 ** 18).toFixed(6)
                      : "0.000000"}{" "}
                    STRK
                  </span>
                </div>
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
                <div className="bg-base-200 p-4 rounded-xl border-2 border-secondary">
                  <div className="flex flex-col space-y-4">
                    {/* Some Option */}
                    <label
                      className="flex items-center gap-3 cursor-pointer"
                      htmlFor="option-some"
                    >
                      <input
                        id="option-some"
                        className="radio radio-xs radio-secondary"
                        type="radio"
                        name="option-type"
                        checked={!isNoneOption}
                        onChange={() => setIsNoneOption(false)}
                        aria-label="Select some amount option"
                      />
                      <div className="flex flex-col gap-1.5 w-full">
                        <div className="flex items-center ml-2">
                          <span className="text-xs font-medium mr-2 leading-none">
                            Some amount
                          </span>
                        </div>
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
                                  setInputAmount(amountInWei);
                                } catch (error) {
                                  console.error("Invalid number input:", error);
                                }
                              } else {
                                setInputAmount(0n);
                              }
                              setIsNoneOption(false);
                            }}
                            placeholder="Enter amount"
                            disabled={isNoneOption}
                            autoComplete="off"
                          />
                        </div>
                      </div>
                    </label>

                    {/* None Option */}
                    <label
                      className="flex items-center gap-3 cursor-pointer"
                      htmlFor="option-none"
                    >
                      <input
                        id="option-none"
                        className="radio radio-xs radio-secondary"
                        type="radio"
                        name="option-type"
                        checked={isNoneOption}
                        onChange={() => setIsNoneOption(true)}
                        aria-label="Select no amount option"
                      />
                      <div className="flex flex-col gap-1.5 w-full">
                        <div className="flex items-center ml-2">
                          <span className="text-xs font-medium mr-2 leading-none">
                            No amount
                          </span>
                        </div>
                        <div className="flex bg-base-300 text-accent h-[2.2rem] px-4 items-center rounded-lg">
                          <span className="text-xs opacity-50">No value</span>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-control">
                <label className="label" htmlFor="greeting-input">
                  <span className="label-text text-lg font-medium">
                    Greeting Message
                  </span>
                </label>
                <input
                  id="greeting-input"
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
                    {event.args.value.unwrap() > 0n && (
                      <span className="ml-2 text-primary">
                        with{" "}
                        {(Number(event.args.value.unwrap()) / 10 ** 18).toFixed(
                          6,
                        )}
                        {event.args.token.unwrap() ===
                        BigInt(StrkContract?.address || "")
                          ? " STRK"
                          : " ETH"}
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
