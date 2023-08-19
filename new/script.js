document.getElementById('buyButton').addEventListener('click', function () {
    alert('Please wait while the Metamask processes your request!');
});

document.getElementById('profileButton').addEventListener('click', function () {
    window.location.href = 'profile.html';
});

document.addEventListener("DOMContentLoaded", async function () {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
            const contractAddress = "0xD9496778EEe1B00c8E7560c88d07c4f2e3F39b4f"; // This is the address of the contract that is deployed
            // the contract is deployed on polygon testnet (Mumbai)

            const response = await fetch('loyaltyPointsAbi.json');
            const contractABI = await response.json(); //ABI

            const contractInstance = new web3.eth.Contract(contractABI, contractAddress);
            window.contractInstance = contractInstance;
        } catch (error) {
            console.error("User denied access to their accounts.");
        }
    }
});

document.addEventListener("DOMContentLoaded", async function () {

    document.getElementById('buyButton').addEventListener('click', async function () {
        try {
            const accounts = await web3.eth.getAccounts();
            const recipient = accounts[0]; // The first account in the connected wallet
            const amount = web3.utils.toWei("100", "ether"); // Example: mint 100 tokens
            await contractInstance.methods.mint(recipient, amount).send({ from: recipient });
            alert('Tokens minted successfully!');
            colsole.log('Tokens minted successfully!');
        } catch (error) {
            console.error("Error minting tokens:", error);
        }
    });
});
