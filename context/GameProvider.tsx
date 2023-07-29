import { useQuery } from "@tanstack/react-query";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import { API_URL, DEMO_WALLET } from "../config";
import axios from "axios";
import { blockFrost } from "../utils/cardano";
import { Lucid } from "lucid-cardano";
import { BalanceType } from "../utils/types";

// Define the shape of the context
export interface GameContextProps {
  wallet: string;
  balance: BalanceType;
  getBalance: () => void;
  token: string;
  setToken: (newToken: string) => void;
}

// Create the Game context
export const GameContext = createContext<GameContextProps | null>(null);

// Create the Game context provider component
export const GameProvider = ({ children }: { children: ReactNode }) => {
  // const getUser = async () => {
  //   const lucidUser = await Lucid.new(blockFrost, "Preprod");
  //   console.log(lucidUser);
  // };

  const [wallet, setWallet] = useState(DEMO_WALLET);
  const [token, setToken] = useState("nebula");
  const [balance, setBalance] = useState({
    ada: 0,
    nebula: 0,
    dum: 0,
    snek: 0,
  });

  const [getFlag, setGetFlag] = useState(false);

  const balanceQuery = useQuery({
    queryKey: ["balanceData", wallet, getFlag],
    queryFn: async () =>
      await axios.post(`${API_URL}/getAmount`, {
        wallet: wallet,
      }),
  });

  const getBalance = async () => {
    const res = await axios.post(`${API_URL}/getAmount`, {
      wallet: wallet,
    });
    const data = res.data;
    if (data !== -100) {
      setBalance({
        ada: data.ada,
        dum: data.dum,
        nebula: data.nebula,
        snek: data.snek,
      });
    }
  };

  useEffect(() => {
    if (balanceQuery.data) {
      const data = balanceQuery.data.data;
      if (data !== -100) {
        setBalance({
          ada: data.ada,
          dum: data.dum,
          nebula: data.nebula,
          snek: data.snek,
        });
      }
    }
  }, [balanceQuery.data, getFlag]);

  useEffect(() => {
    // getUser();
  }, []);

  return (
    <GameContext.Provider
      value={{
        wallet,
        balance,
        getBalance,
        token,
        setToken,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
