> ⚠️ **ATTENTION: This repository is exclusively for Basecamp Teachers.**
> If you are a developer looking to learn Starknet, please visit [speedrunstark.com](https://speedrunstark.com)

# Basecamp Scaffold Tutorial

Welcome to the Basecamp Scaffold Tutorial!!! This project provides a step-by-step guide to building decentralized applications on Starknet using Scaffold-Stark. Through a series of progressive steps, you'll learn how to create, deploy, and enhance smart contracts while building a production-ready frontend.

> 💡 **Note:** Throughout this tutorial, all HTML and CSS code is provided in comments - you don't need to write it. Focus on implementing the hooks and contract logic as guided in each step.

## What You'll Build

This tutorial guides you through building a decentralized application in three progressive steps, with each section designed to take 30-40 minutes in a workshop setting. All changes throughout the tutorial are focused on just two main files:
- Frontend: [`packages/nextjs/app/page.tsx`](https://github.com/Scaffold-Stark/basecamp/blob/base/packages/nextjs/app/page.tsx)
- Smart Contract: [`packages/snfoundry/contracts/src/yourcontract.cairo`](https://github.com/Scaffold-Stark/basecamp/blob/base/packages/snfoundry/contracts/src/yourcontract.cairo)

The tutorial is divided into the following steps:

0. **Step 0: Scaffold Stark Base** ([branch: step-0](https://github.com/Scaffold-Stark/basecamp/tree/step-0))
   - Starts from zero as a fresh clone of Scaffold-Stark
   - At this step lets showcase the basic UI layout and the contract layout with the `debug-ui` tab
   - play around with the `debug-ui` tab, sending transactions and reading values
   - Basic UI layout with zero functionality

1. **Step 1: Basic Hooks Integration** ([branch: step-1](https://github.com/Scaffold-Stark/basecamp/tree/step-1))
   - No contract updates needed, time to write UI
   - Changes only in [`page.tsx`](https://github.com/Scaffold-Stark/basecamp/blob/step-1/packages/nextjs/app/page.tsx)
   - Introduces core Scaffold-Stark hooks (`useScaffoldWriteContract`, `useScaffoldReadContract`, `useScaffoldMultiWriteContract`, `useTargetNetwork`, `useDeployedContractInfo`)
   - You can now interact with the contract using the hooks on the UI and deploy the contract and website to the network of your choice
   - At this point we should showcase a `MAINNET` or `SEPOLIA` deployment
   - At this point we should showcase a `VERCEL` deployment
   - [View changes from step-0 to step-1](https://github.com/Scaffold-Stark/basecamp/compare/step-0...step-1)

2. **Step 2: Multi-Token Support** ([branch: step-2](https://github.com/Scaffold-Stark/basecamp/tree/step-2))
   - Updates [`YourContract.cairo`](https://github.com/Scaffold-Stark/basecamp/blob/step-2/packages/snfoundry/contracts/src/YourContract.cairo) to support STRK and ETH deposits
   - Enhances [`page.tsx`](https://github.com/Scaffold-Stark/basecamp/blob/step-2/packages/nextjs/app/page.tsx) with token selection and balance display
   - Introduces `useScaffoldEventHistory` hook to fetch filtered events from the contract
   - We dont need to showcase `MAINNET` or `SEPOLIA` deployment here nor `VERCEL` deployment
   - At this point the user should be able to send STRK and ETH to the contract through our UI and see the events logged at the bottom.
   - [View changes from step-1 to step-2](https://github.com/Scaffold-Stark/basecamp/compare/step-1...step-2)

3. **Step 3: Full zklend Integration** ([branch: step-3](https://github.com/Scaffold-Stark/basecamp/tree/step-3))
   - Updates [`YourContract.cairo`](https://github.com/Scaffold-Stark/basecamp/blob/step-3/packages/snfoundry/contracts/src/YourContract.cairo) with zklend integration
   - All the STRK and ETH deposits are now sent to zklend for yield farming
   - Introduces development on mainnet fork
   - Minor `page.tsx` and `scaffold.config.ts` updates to support mainnetFork testing
   - Includes mainnet deployment steps
   - You can send STRK and ETH along with a greeting, these deposits will generate yield from first second onwards, owner can withdraw the yield anytime
   - [View changes from step-2 to step-3](https://github.com/Scaffold-Stark/basecamp/compare/step-2...step-3)

Each step builds upon the previous one, introducing new concepts and features while maintaining a clean, production-ready codebase.

## Getting Started

1. **Clone and Setup**
   ```bash
   git clone https://github.com/Scaffold-Stark/basecamp.git
   cd basecamp
   git checkout step-0
   yarn install
   ```

2. **Environment Setup**
   ```bash
   # [OPTIONAL] The postinstall should have created the .env file for you, if not, copy the example env file in packages/snfoundry
   cp packages/snfoundry/.env.example packages/snfoundry/.env
   ```
   Example of `packages/snfoundry/.env` for Sepolia:
   ```bash
   PRIVATE_KEY_SEPOLIA=0xSOMETHING
   RPC_URL_SEPOLIA=https://starknet-sepolia.public.blastapi.io/rpc/v0_7
   ACCOUNT_ADDRESS_SEPOLIA=0xSOMETHING
   ```
   > ⚠️ **NEVER commit your `.env` file or expose your private key!**
   > 
   > 💡 The `.env` file belongs in the `packages/snfoundry/` directory where your smart contracts live
   >
   > 🔥 Try to use mainnet to teach !!! , use the same format but replace `SEPOLIA` with `MAINNET` in the variable names

3. **Start Development**
   ```bash
   # Terminal 1
   yarn deploy --network sepolia

   # Terminal 2
   yarn start
   ```

4. **Development Guide**
   - Begin with `step-0` branch which provides the basic layout
   - Open `packages/nextjs/app/page.tsx` in your editor
   - Compare with [step-0 to step-1 changes](https://github.com/Scaffold-Stark/basecamp/compare/step-0...step-1) to see what needs to be implemented
   - Implement the hooks and functionality as guided in the comments on `What You'll Build` section, make sure you understand what we are building through each of the steps
   - Use the comparison view as a reference if you get stuck

> 💡 **Tip:** Each step's branch contains the complete implementation. If you're stuck, you can always check the final code in the corresponding branch or use the comparison links provided above.

## Updating the Framework

This tutorial is built on top of Scaffold-Stark. To update the base branch from [Scaffold-Stark main](https://github.com/Scaffold-Stark/scaffold-stark-2):

```bash
# On a fresh terminal that doesnt have a `basecamp-temp` directory

git clone git@github.com:Scaffold-Stark/basecamp.git basecamp-temp && cd basecamp-temp && git checkout base && mkdir temp_scaffold && cd temp_scaffold && git clone git@github.com:Scaffold-Stark/scaffold-stark-2.git . && rm -rf .git .github README.md && cp -r * ../ && cd .. && rm -rf temp_scaffold && git add . && git commit -m "Update framework to latest version" && git push origin base
```

To update each step with changes from the previous step:

```bash
git checkout step-0 && git merge base --no-edit && git push origin step-0
```

```bash
git checkout step-1 && git merge step-0 --no-edit && git push origin step-1
```

```bash
git checkout step-2 && git merge step-1 --no-edit && git push origin step-2
```

```bash
git checkout step-3 && git merge step-2 --no-edit && git push origin step-3
```

This process will:
1. Clone the tutorial repository
2. Update the base framework
3. Merge changes progressively from each step to the next
4. Push the updated branches