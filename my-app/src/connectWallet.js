import React from "react";
import { ethers } from "ethers";
import { useEthereum } from "./ethereumContext"; // Adjust the import path as necessary

const ConnectWalletButton = () => {
  const { setProvider, setUserAddress, userAddress } = useEthereum();

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      try {
        // Request access to the user's ETH accounts
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        // Use the first account
        const account = ethers.getAddress(accounts[0]);
        setUserAddress(account);

        // Wrap window.ethereum with a Web3Provider and set it in your context
        const web3Provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(web3Provider);

        // Optionally, log the connected account and provider for verification
        console.log("Connected account:", account);
        console.log("Provider set:", web3Provider);
      } catch (error) {
        console.error("Failed to connect MetaMask:", error);
      }
    } else {
      alert(
        "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html"
      );
    }
  };

  return (
    <div>
      {userAddress ? (
        <p>
          Connected with: <strong>{userAddress}</strong>
        </p>
      ) : (
        <button onClick={connectWalletHandler}>Connect to MetaMask</button>
      )}
    </div>
  );
};

export default ConnectWalletButton;
