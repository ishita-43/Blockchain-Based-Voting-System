## Blockchain-Based Voting System
Welcome to the Blockchain-Based Voting System project! This repository is part of the Winter of Blockchain 2024 open-source initiative, aimed at creating a secure and transparent voting system leveraging blockchain technology.

# Overview
The Blockchain-Based Voting System is designed to provide a decentralized, tamper-proof method for conducting elections. By utilizing blockchain technology, this system ensures that votes are recorded transparently and immutably, preventing fraud and enhancing trust in the voting process.

# Features
Decentralization: Votes are recorded on a distributed ledger, eliminating the need for a central authority.   
Transparency: All votes are visible on the blockchain, ensuring transparency.   
Security: Blockchain's cryptographic features ensure that votes cannot be altered once they are recorded.   
Anonymity: Voter identity is kept confidential, ensuring privacy.   
Scalability: The system is designed to handle large-scale elections efficiently.   
## Tech Stack
Backend: Solidity (Smart Contracts)   
Blockchain Platform: Ethereum   
Frontend: React.js   
Database: IPFS (InterPlanetary File System)   
Development and Testing: Foundry   
Version Control: Git   

## Getting Started   
### Prerequisites
Before you begin, ensure you have the following installed:   
Foundry   
Git   
### Installation   
Clone the repository:

```bash
git clone https://github.com/ishita-43/Blockchain-Based-Voting-System.git
cd Blockchain-Based-Voting-System
```

Compile the smart contracts:   

More info in Readme of Foundry_Contracts: 
```bash
cd Foundry_Contracts/
forge compile
```
Deploy contracts to local Blockchain (Anvil):

```bash
forge script script/Deploy.s.sol:DeployWithData --fork-url http://localhost:8545 --private-key <PRIVATE_KEY> --broadcast
```

Install dependencies in frontend folder:

```bash
cd frontend/
npm install
```
Run the app:
```bash
npm run dev
```
Open the application in your browser:

Navigate to http://localhost:3000 to view the app.

# Contributing
We welcome contributions from the community! To get started, please follow these steps:

Fork the repository on GitHub.
Create a new branch for your feature or bugfix.
```bash
git checkout -b feature/your-feature-name
```
Commit your changes with clear and descriptive messages.
```bash
git commit -m "Add feature/your-feature-name"
```
Push your branch to GitHub.
```bash
git push origin feature/your-feature-name
```
Create a Pull Request against the main branch of this repository.
Contribution Guidelines
Ensure your code adheres to the project's coding standards.
Write tests for your code and ensure all tests pass.
Provide detailed descriptions in your pull requests.
Respect the code of conduct.
Issues
If you find any bugs or have feature requests, please open an issue on GitHub. Be sure to provide as much context as possible.

# Contact
For any questions or discussions, feel free to join the Winter of Blockchain 2024 Discord server or reach out to the project maintainer:

Ishita- GitHub (https://github.com/ishita-43) 
We look forward to your contributions and hope you enjoy working on this project! 🤗
