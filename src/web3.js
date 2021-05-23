import Web3 from "web3";

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    let currentWeb3;
    if (window.ethereum) {
      currentWeb3 = new Web3(window.ethereum);
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => {
          resolve(currentWeb3);
        })
        .catch((error) => reject(error));
    } else if (window.web3) {
      window.web3 = new Web3(Web3.currentProvider);
      // Acccounts always exposed
      resolve(currentWeb3);
    } else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  });

export default getWeb3;
