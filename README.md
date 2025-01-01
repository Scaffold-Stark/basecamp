> ⚠️ **ATTENTION: This repository is exclusively for Basecamp Teachers.**
> If you are a developer looking to learn Starknet, please visit [speedrunstark.com](https://speedrunstark.com)

# Basecamp Scaffold Tutorial

Welcome to the Basecamp Scaffold Tutorial!!! This project provides a step-by-step guide to building decentralized applications on Starknet using Scaffold-Stark. Through a series of progressive steps, you'll learn how to create, deploy, and enhance smart contracts while building a production-ready frontend.

> 💡 **Note:** Throughout this tutorial, all HTML and CSS code is provided in comments - you don't need to write it. Focus on implementing the hooks and contract logic as guided in each step.

## What You'll Build

This tutorial guides you through building a decentralized application in three progressive steps. All changes throughout the tutorial are focused on just two main files:
- Frontend: [`packages/nextjs/app/page.tsx`](https://github.com/Scaffold-Stark/basecamp/blob/base/packages/nextjs/app/page.tsx)
- Smart Contract: [`packages/snfoundry/contracts/src/yourcontract.cairo`](https://github.com/Scaffold-Stark/basecamp/blob/base/packages/snfoundry/contracts/src/yourcontract.cairo)

0. **Step 0: Scaffold Stark Base**
   - Starts from zero as a fresh clone of Scaffold-Stark
   - Basic UI layout with minimal functionality
     
1. **Step 1: Basic Hooks Integration**
   - No contract updates needed
   - Introduces core Scaffold-Stark hooks (`useScaffoldWriteContract` and `useScaffoldReadContract`)
   - Changes only in `page.tsx`

2. **Step 2: Multi-Token Support**
   - Updates `yourcontract.cairo` to support STRK and ETH deposits
   - Enhances `page.tsx` with token selection and balance display
   - Follow prompts in both files for guided implementation

3. **Step 3: Full zklend Integration**
   - Updates `yourcontract.cairo` with zklend protocol integration
   - Minor `page.tsx` and `scaffold.config.ts` updates to support mainnetFork testing
   - Includes mainnet deployment steps

You can review exact changes between steps here:
- [Changes from step-0 to step-1](https://github.com/Scaffold-Stark/basecamp/compare/step-0...step-1)
- [Changes from step-1 to step-2](https://github.com/Scaffold-Stark/basecamp/compare/step-1...step-2)
- [Changes from step-2 to step-3](https://github.com/Scaffold-Stark/basecamp/compare/step-2...step-3)

Each step builds upon the previous one, introducing new concepts and features while maintaining a clean, production-ready codebase.



## Getting Started

1. **Clone and Setup**
   ```bash
   git clone https://github.com/Scaffold-Stark/basecamp.git
   cd basecamp
   git checkout step-0
   yarn install
   ```

2. **Start Development**
   ```bash
   yarn start
   ```

3. **Follow Along**
   - Begin with `step-0` branch which provides the basic layout
   - Open `packages/nextjs/app/page.tsx` in your editor
   - Compare with [step-0 to step-1 changes](https://github.com/Scaffold-Stark/basecamp/compare/step-0...step-1) to see what needs to be implemented
   - Implement the hooks and functionality as guided in the comments
   - Use the comparison view as a reference if you get stuck

> 💡 **Tip:** Each step's branch contains the complete implementation. If you're stuck, you can always check the final code in the corresponding branch or use the comparison links provided above.


## Updating the Framework

This tutorial is built on top of Scaffold-Stark. To update the base branch from [Scaffold-Stark main](https://github.com/Scaffold-Stark/scaffold-stark-2):

```bash
// on a fresh terminal that doesnt have a `basecamp-temp` directory

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