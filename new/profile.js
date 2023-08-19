
//JavaScript code to interact with Metamask
var account = null;

(async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.send('eth_requestAccounts');
      window.web3 = new Web3(window.ethereum);

      var accounts = await web3.eth.getAccounts();
      account = accounts[0];

      // Update the profile information with the wallet address
      document.getElementById('wallet-address').textContent = account;

      // Load the contract instance using the ABI and contract address
      const contractAddress = "0xD9496778EEe1B00c8E7560c88d07c4f2e3F39b4f"; // Replace with your contract address
      const contractABI = await fetch('loyaltyPointsAbi.json').then(response => response.json());
      const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

      // Call the smart contract function to get the user's available points
      const availablePointsWei = await contractInstance.methods.balanceOf(account).call();

      const availablePointsTokens = Number(availablePointsWei) / 1e18;

      // Update the available points on the profile page
      document.getElementById('available-points').textContent = availablePointsTokens;

    } catch (error) {
      console.error('Metamask authentication failed:', error);
    }
  }
})();
