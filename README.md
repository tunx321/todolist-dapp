# To Do List dApp

This is a simple To Do List project, that can add task, mark tasks, and check history of user's tasks. 

Technologies that was used in this project:
* backend, smart contract: Solidity, hardhat, ethers.js
* frontend: React.js  

##  How to Install and Run the Project

If you want to run this project locally(in hardhat localhost) you need to:

1. Install dependencies
```zsh
    npm i
```
2. Compile contract using 
```zsh
    npx hardhat compile
```
3. Run hardhat nodes 
```zsh
    npx hardhat node
```
4. Deploy to localhost 
```zsh
    npx hardhat run --network localhost scripts/deploy.js
```
5. Run server 
```zsh
    npm start
```

---

If you want to deploy this project to test network:

1. Create .env with following variables 
```
    NETWORK=(which network).
    INFURA_URL="https://sepolia.infura.io/v3/(YOUR-API-KEY)".
    PRIVATE_KEY=(PRIVATE KEY OF YOU METAMASK ACCOUNT).
    ETHERSCAN_API=(API that you can get from etherscan.io).
    OWNER="0xd3106F16102e2AEF6AC5D3E371c121885aa4f82e".
```

2. Install dependencies
```zsh
    npm i
```
3. Compile contract using 
```zsh
    npx hardhat compile
```
4. Deploy hardhat to blockchain 
```zsh
    npx hardhat run --network sepolia scripts/deploy.js
```
5. Verify contract 
```zsh
    npx hardhat verify --network sepolia {your contract address} 
```
6. Run server 
```zsh
    npm start
```

Dont forget to add your contract address to contractAddress variable in __Form.js__ and **HistoryPage.js**








