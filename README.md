# 🪪 NeoCard - Decentralized Social Profiles on Neo X Blockchain

**NeoCard** is a decentralized application (dApp) that enables users to create and manage their personal profiles directly on the blockchain using their wallet addresses. Each user is given a unique profile URL that can be shared across social platforms. All user information is securely stored on the **Neo X** blockchain, leveraging its **EVM compatibility** and decentralized governance.

## 🚀 Features

-   **Create and Update Profiles**: Users can create and update their profile details (username, bio, avatar, and social links).
-   **Immutable & Decentralized**: Profile information is stored immutably on the blockchain.
-   **Unique Shareable URLs**: Each user gets a unique profile URL, which they can share on their bio.
-   **Blockchain Powered**: All operations are performed via smart contracts deployed on the Neo X blockchain.

## 🌐 Live Demo

A live demo of NeoCard can be accessed [here](#).

## 🛠️ Tech Stack

-   **Frontend**: Next.js, Wagmi
-   **Smart Contract**: Solidity
-   **Blockchain**: Neo X (EVM-Compatible)
-   **Tools**: Hardhat, Ignition, MetaMask

## 📄 Smart Contract Overview

The `NeoCard` contract allows users to create, edit, and retrieve profile information on-chain. It stores details such as username, bio, avatar hash, and social links. The contract is fully EVM-compatible and deployed on the Neo X blockchain.

### Contract Functions:

-   `upsertProfile`: Create or update a user's profile.
-   `getProfile`: Retrieve the profile data of a specific wallet address.

## 📦 Installation

Follow these steps to set up the project on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/en/) (version >= 16.x)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
-   [Hardhat](https://hardhat.org/getting-started/) (for compiling and deploying smart contracts)
-   [MetaMask](https://metamask.io/) (for interacting with the dApp)

### Clone the Repository

```bash
git clone https://github.com/almoloo/neocard.git
cd neocard
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory and add your Pinata API key and wallet's private key.

```bash
NEXT_PUBLIC_NETWORK=testnet
NEXT_PUBLIC_CONTRACT_ADDRESS=0x46405C02BB00f9215351277788c9F96857BC91A5
PRIVATE_KEY=your-ethereum-private-key
PINATA_JWT=your-pinata-api-key
NEXT_PUBLIC_PINATA_GATEWAY_KEY=your-pinata-gateway-key
NEXT_PUBLIC_PINATA_GATEWAY=your-pinata-gateway-url
```

## 🔨 Usage

### Compile the Smart Contract

To compile the NeoCard smart contract:

```bash
npx hardhat compile
```

### Deploy the Smart Contract

To deploy the contract to a specific network (e.g., Ropsten, Goerli):

```bash
npx hardhat ignition deploy ./ignition/modules/Neocard.js --network testnet
```

Replace `testnet` with 'mainnet' if you are deploying to mainnet.

## 📚 Testing

You can run the test suite to ensure everything is working as expected.

```bash
npx hardhat test
```

Sample test output:

```bash
  NeoCard Contract
    ✔ Should allow a user to create a new profile
    ✔ Should allow a user to update an existing profile
    ✔ Should return default values for a user with no profile
    ✔ Should emit an event when a profile is created
    ✔ Should emit an event when a profile is updated
```

## 🧑‍💻 Contributing

We welcome contributions to improve NeoCard! Here's how you can help:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit and push your changes (`git commit -m 'Add new feature' && git push origin feature/your-feature`).
5. Submit a pull request.

## 🛡️ Security

If you discover any security-related issues, please report them via the [Issues](https://github.com/almoloo/neocard/issues) page or contact us directly.

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 📝 Acknowledgments

-   **Neo X**: For providing a scalable and efficient EVM-compatible blockchain platform.
-   **Hardhat**: For making Ethereum development a breeze.

---

## 🙏 Support

If you like this project, please give it a ⭐️! You can also reach out to me via [Twitter](https://twitter.com/almoloo) or [email](mailto:amousavig@icloud.com).

---

## 💬 Contact

For any questions or feedback, feel free to open an issue or contact us at [email@example.com](mailto:amousavig@icloud.com).

---

> Built with ❤️ by [Ali Mousavi](https://github.com/almoloo)
