# Cross-Chain Name Service Testing with Chainlink Local and Hardhat
This project is part of an assignment to test the [CCIP Cross-Chain Name Service](https://github.com/smartcontractkit/ccip-cross-chain-name-service) using Hardhat in Chainlink Local's **Local Mode**. The goal is to simulate cross-chain interactions between smart contracts and verify the functionality of registering and looking up a cross-chain name.
## Project Overview
This project involves:
- Deploying a local instance of `CCIPLocalSimulator.sol` to simulate cross-chain interactions.
- Deploying `CrossChainNameServiceRegister.sol`, `CrossChainNameServiceReceiver.sol`, and `CrossChainNameServiceLookup.sol` smart contracts on simulated source and destination chains.
- Registering and looking up a cross-chain name (`alice.ccns`) and verifying that it returns the correct Ethereum address (EOA).
## Setup and Running the Project
To run this project on your local machine, follow these steps:
### 1. Clone the Repository
```bash
git clone https://github.com/smypmsa/CCIP-Bootcamp-2024-Day-2-HW
cd CCIP-Bootcamp-2024-Day-2-HW
```
### 2. Install Dependencies
Ensure you have [Node.js](https://nodejs.org/) installed, then install the required dependencies:
```bash
npm install
```
### 3. Compile the Smart Contracts
Compile the contracts in the `contracts` folder:
```bash
npx hardhat compile
```
### 4. Deploy and Test
Run the tests using Hardhat:
```bash
npx hardhat test
```
### Project Structure
- **contracts/**: Contains the smart contracts, including `CCIPLocalSimulator.sol`, `CrossChainNameServiceRegister.sol`, `CrossChainNameServiceReceiver.sol`, and `CrossChainNameServiceLookup.sol`.
- **ignition/modules/**: Contains the Ignition deployment module, which automates the deployment of contracts and initial configuration.
- **test/**: Contains the TypeScript test file that verifies the functionality of the cross-chain name service.
## Key Files
- **DeploymentsModule.ts**: Ignition module script for deploying and setting up the contracts.
- **Test.ts**: The test script that registers and looks up `alice.ccns` to verify cross-chain functionality.
## Useful Resources
- [Chainlink Local Documentation](https://cll-devrel.gitbook.io/chainlink-local-documentation)
- [CCIP Cross-Chain Name Service Repository](https://github.com/smartcontractkit/ccip-cross-chain-name-service)
- [Hardhat Ignition](https://hardhat.org/ignition/docs/guides/tests)
- [Hardhat Ignition Examples](https://github.com/NomicFoundation/hardhat-ignition-examples)
## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.