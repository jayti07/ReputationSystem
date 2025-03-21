const contractAddress = "0x1Fad549dA973434DA30b34F278c4945e32EfD5f7";
const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newReputation",
				"type": "uint256"
			}
		],
		"name": "ReputationUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getReputation",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "registerUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_newReputation",
				"type": "uint256"
			}
		],
		"name": "updateReputation",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

let userAccount;
let contract;

async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            userAccount = accounts[0];
            document.getElementById("walletAddress").innerText = `Connected: ${userAccount}`;
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            contract = new ethers.Contract(contractAddress, abi, signer);
        } catch (error) {
            console.error(error);
        }
    } else {
        alert("MetaMask not detected!");
    }
}

async function registerUser() {
    const address = document.getElementById("registerAddress").value;
    if (!contract) return alert("Connect wallet first!");
    try {
        const tx = await contract.registerUser(address);
        await tx.wait();
        alert("User registered!");
    } catch (error) {
        console.error(error);
    }
}

async function updateReputation() {
    const address = document.getElementById("updateAddress").value;
    const newReputation = document.getElementById("newReputation").value;
    if (!contract) return alert("Connect wallet first!");
    try {
        const tx = await contract.updateReputation(address, newReputation);
        await tx.wait();
        alert("Reputation updated!");
    } catch (error) {
        console.error(error);
    }
}

async function getReputation() {
    const address = document.getElementById("getAddress").value;
    if (!contract) return alert("Connect wallet first!");
    try {
        const reputation = await contract.getReputation(address);
        document.getElementById("reputationResult").innerText = `Reputation: ${reputation}`;
    } catch (error) {
        console.error(error);
    }
}

document.getElementById("connectWallet").addEventListener("click", connectWallet);
