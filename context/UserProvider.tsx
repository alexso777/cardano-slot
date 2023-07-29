import React, { ReactNode, createContext, useState } from "react";

// Define the shape of the context
interface UserContextProps {
  wallet: string;
  setWallet: Function;
  balance: number;
  setBalance: Function;
}

// Create the User context
export const UserContext = createContext<UserContextProps | null>(null);

// Create the User context provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [balance, setBalance] = useState(0);
  const [wallet, setWallet] = useState("");
  return (
    <UserContext.Provider
      value={{
        wallet,
        setBalance,
        setWallet,
        balance,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
