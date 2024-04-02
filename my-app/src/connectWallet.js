import React, { useEffect } from "react";
import { ethers } from "ethers";
import { useEthereum } from "./ethereumContext.js";

const ConnectWalletButton = () => {
  const { setProvider, setUserAddress, userAddress } =
    useEthereum();

  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        console.log("Please connect to MetaMask.");
        setUserAddress("");
      } else if (accounts[0] !== userAddress) {
        const account = ethers.getAddress(accounts[0]);
        setUserAddress(account);
        console.log("Switched account:", account);
      }
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    // Cleanup the event listener on component unmount
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, [userAddress, setUserAddress]);

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_requestPermissions",
          params: [{ eth_accounts: {} }],
        });
        const ethProvider = window.ethereum;
        setProvider(ethProvider);
        const addresses = await ethProvider.request({
          method: "eth_requestAccounts",
        });
        setUserAddress(addresses[0]);
      } catch (error) {
        console.error("Failed to connect MetaMask:", error);
      }
    } else {
      alert(
        "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html"
      );
    }
  };

  const signOutHandler = () => {
    // "Sign out" by resetting the application state related to the user
    setUserAddress("");
    setProvider(null);
    console.log("User signed out");
  };

  return (
    <div>
      {userAddress ? (
        <>
          <p>
            Connected with: <strong>{userAddress}</strong>
          </p>
          <button onClick={signOutHandler}>Sign Out</button>
        </>
      ) : (
        <button onClick={connectWalletHandler}>Connect to MetaMask</button>
      )}
    </div>
  );
};

export default ConnectWalletButton;
