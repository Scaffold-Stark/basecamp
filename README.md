> ⚠️ **ATTENTION: This repository is exclusively for Basecamp Teachers.**
> If you are a developer looking to learn Starknet, please visit [speedrunstark.com](https://speedrunstark.com)

# Basecamp Scaffold Tutorial: Teacher's Guide

Welcome to the Basecamp Scaffold Tutorial! This comprehensive guide will prepare **teachers** to effectively lead students through building decentralized applications on Starknet using Scaffold-Stark. Through a series of progressive steps, teachers will show students how to create, deploy, and enhance smart contracts while building a production-ready frontend.

> 💡 **Note:** Throughout this tutorial, students can copy and paste all HTML and CSS code - students don't need to write it. They should focus on implementing the hooks and contract logic as guided in each step.

## What You'll Build

This tutorial guides students through building a decentralized application in three progressive steps, with each section designed to take 30-40 minutes in a workshop setting. All changes throughout the tutorial are focused on just two main files:

- Frontend: [`packages/nextjs/app/page.tsx`](https://github.com/Scaffold-Stark/basecamp/blob/base/packages/nextjs/app/page.tsx)
- Smart Contract: [`packages/snfoundry/contracts/src/yourcontract.cairo`](https://github.com/Scaffold-Stark/basecamp/blob/base/packages/snfoundry/contracts/src/YourContract.cairo)

The tutorial is divided into the following steps:

**Base: Scaffold Stark Base** ([branch: base](https://github.com/Scaffold-Stark/basecamp/tree/base))

- Starts from zero as a fresh clone of [Scaffold-Stark](https://github.com/Scaffold-Stark/scaffold-stark-2).
- At this step, let's showcase the default UI layout and the contract layout with the `debug-ui` tab.
- Play around with the `debug-ui` tab, sending transactions and reading values.

**Step 0: Basic UI** ([branch: step-0](https://github.com/Scaffold-Stark/basecamp/tree/step-0))

- Creates a basic UI layout with zero functionality. **Share the code with the students and explain the structure of the code.**
- [View changes from base to step-0](https://github.com/Scaffold-Stark/basecamp/compare/base...step-0)

**Step 1: Basic Hooks Integration** ([branch: step-1](https://github.com/Scaffold-Stark/basecamp/tree/step-1))

- No contract updates needed, time to write integration logic for the UI
- Changes only in [`page.tsx`](https://github.com/Scaffold-Stark/basecamp/blob/step-1/packages/nextjs/app/page.tsx)
- Introduces core Scaffold-Stark hooks (`useScaffoldWriteContract`, `useScaffoldReadContract`, `useScaffoldMultiWriteContract`, `useTargetNetwork`, `useDeployedContractInfo`)
- Students can now interact with the contract using the hooks on the UI and deploy the contract and website to the network of their choice
- At this point we should showcase a `MAINNET` or `SEPOLIA` deployment
- At this point we should showcase a `VERCEL` deployment. Can follow scaffold-stark [docs](https://scaffoldstark.com/docs/deploying) to deploy to vercel
- [View changes from step-0 to step-1](https://github.com/Scaffold-Stark/basecamp/compare/step-0...step-1)

**Step 2: Multi-Token Support** ([branch: step-2](https://github.com/Scaffold-Stark/basecamp/tree/step-2))

- Updates [`YourContract.cairo`](https://github.com/Scaffold-Stark/basecamp/blob/step-2/packages/snfoundry/contracts/src/YourContract.cairo) to support STRK and ETH deposits.
- Use `Configure Contracts` tool to download the ERC20 contract for ETH. Inputs are: Contract Name: `Eth`, Contract Address: `0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7`. Replace your local `configExternalContracts.ts` with the new downloaded file. You can find this tool next to the `faucet` button.
- Enhances [`page.tsx`](https://github.com/Scaffold-Stark/basecamp/blob/step-2/packages/nextjs/app/page.tsx) with token selection and balance display
- Introduces `useScaffoldEventHistory` hook to fetch filtered events from the contract
- We don't need to showcase `MAINNET` or `SEPOLIA` deployment here nor `VERCEL` deployment
- At this point the user should be able to send STRK and ETH to the contract through our UI and see the events logged at the bottom.
- [View changes from step-1 to step-2](https://github.com/Scaffold-Stark/basecamp/compare/step-1...step-2)

**Step 3: Full zklend Integration** ([branch: step-3](https://github.com/Scaffold-Stark/basecamp/tree/step-3))

- Updates [`YourContract.cairo`](https://github.com/Scaffold-Stark/basecamp/blob/step-3/packages/snfoundry/contracts/src/YourContract.cairo) with [zklend](https://app.zklend.com/markets) integration
- All the STRK and ETH deposits are now sent to zklend for yield farming
- Introduces development on mainnet fork. Can follow scaffold-stark [docs](https://scaffoldstark.com/docs/recipes/DevelopingOnFork) to run and interact with a local fork of Starknet mainnet.
- Minor `page.tsx` and `scaffold.config.ts` updates to support mainnetFork testing
- Includes mainnet deployment steps
- Users can send STRK or ETH along with a greeting, these deposits will generate yield from first second onwards, owner can withdraw the yield anytime. User can connect with `burner wallet` to interact with the contract on Starknet mainnet fork.
- [View changes from step-2 to step-3](https://github.com/Scaffold-Stark/basecamp/compare/step-2...step-3)

Each step builds upon the previous one, introducing new concepts and features while maintaining a clean, production-ready codebase.

## Getting Started

1. **Clone and Setup**

   Students should clone the scaffold-stark-2 repository and install the dependencies.

   ```bash
   git clone https://github.com/Scaffold-Stark/scaffold-stark-2.git
   cd scaffold-stark-2
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
   > 🔥 Try to use mainnet to teach! Use the same format but replace `SEPOLIA` with `MAINNET` in the variable names

3. **Start Development**

   ```bash
   # Terminal 1
   yarn deploy --network sepolia

   # Terminal 2
   yarn start
   ```

4. **Development Guide**
   - Start with a fresh clone of the scaffold-stark-2 repository
   - Look at the basecamp repository. Begin with `base` branch, then move into `step-0` branch which provides the basic layout. Students can copy the code from the basecamp repository to the scaffold-stark-2 repository.
   - Compare with [base to step-0 changes](https://github.com/Scaffold-Stark/basecamp/compare/base...step-0) to see what needs to be implemented/copied.
   - Open `packages/nextjs/app/page.tsx` in your editor
   - Compare with [step-0 to step-1 changes](https://github.com/Scaffold-Stark/basecamp/compare/step-0...step-1) to see what needs to be implemented
   - Implement the hooks and functionality as guided in the comments on `What You'll Build` section, making sure students understand what they are building through each of the steps
   - Use the comparison view as a reference if students get stuck

> 💡 **Tip:** Each step's branch contains the complete implementation. If students or teachers are stuck, they can always check the final code in the corresponding branch or use the comparison links provided above.

## Updating the Framework

This tutorial is built on top of Scaffold-Stark. To update the base branch from [Scaffold-Stark main](https://github.com/Scaffold-Stark/scaffold-stark-2):

```bash
# On a fresh terminal that doesnt have a `basecamp-temp` directory

git clone git@github.com:Scaffold-Stark/basecamp.git basecamp-temp && cd basecamp-temp && git checkout base && mkdir temp_scaffold && cd temp_scaffold && git clone git@github.com:Scaffold-Stark/scaffold-stark-2.git . && rm -rf .git .github README.md && cp -r * ../ && cd .. && rm -rf temp_scaffold && git add . && git commit -m "Update framework to latest version" && git push origin base
```

To update each step with changes from the previous step:

```bash
git checkout step-0 && git pull origin step-0 && git merge base --no-edit && git push origin step-0
```

```bash
git checkout step-1 && git pull origin step-1 && git merge step-0 --no-edit && git push origin step-1
```

```bash
git checkout step-2 && git pull origin step-2 && git merge step-1 --no-edit && git push origin step-2
```

```bash
git checkout step-3 && git pull origin step-3 && git merge step-2 --no-edit && git push origin step-3
```

This process will:

1. Clone the tutorial repository
2. Update the base framework
3. Merge changes progressively from each step to the next
4. Push the updated branches
