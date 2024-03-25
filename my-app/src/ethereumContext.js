// EthereumContext.js
import React, { createContext, useContext, useState } from "react";

const EthereumContext = createContext();

export const useEthereum = () => useContext(EthereumContext);

export const EthereumProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [userAddress, setUserAddress] = useState("");

  return (
    <EthereumContext.Provider
      value={{ provider, setProvider, userAddress, setUserAddress }}
    >
      {children}
    </EthereumContext.Provider>
  );
};
