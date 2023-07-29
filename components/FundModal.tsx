import { FC, useContext, useState } from "react";
import { CloseIcon } from "./SvgIcons";
import { ModalContext } from "../context/ModalProvider";
import ClickAwayComponent from "./ClickAwayComponent";
import { depositFund, withdrawFund } from "../utils/api";
import { DEMO_WALLET } from "../config";
import { successAlert } from "./ToastGroup";
import { GameContext, GameContextProps } from "../context/GameProvider";

const FundModal: FC = () => {
  const { isFundModal, setIsFundModal } = useContext<any>(ModalContext);
  const { balance, getBalance } =
    useContext<GameContextProps | null>(GameContext) ?? {};

  const [tab, setTab] = useState("deposit");
  const [ada, setAda] = useState(0);

  const [nebula, setNebula] = useState(0);
  const [dum, setDum] = useState(0);
  const [snek, setSnek] = useState(0);

  const handleChange = (e: any) => {
    setAda(e.target.value);
  };

  const [isLoading, setIsLoading] = useState(false);

  const clearForm = () => {
    setNebula(0);
    setDum(0);
    setSnek(0);
  };

  const handleDeposit = async () => {
    setIsLoading(true);
    await depositFund(DEMO_WALLET, nebula, dum, snek, ada);
    if (getBalance) getBalance();
    clearForm();
    successAlert("Deposit Success!");
    setIsLoading(false);
  };

  const handleWidraw = async () => {
    setIsLoading(true);
    await withdrawFund(DEMO_WALLET, nebula, dum, snek, ada);
    if (getBalance) getBalance();
    clearForm();
    successAlert("Withdraw Success!");
    setIsLoading(false);
  };

  const BlanceList = () => {
    return balance ? (
      <div className="tracking-wider">
        <p>Your current balance: </p>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="text-sm text-[#ddd] uppercase">
            ada:{" "}
            <span className="text-[#6673dc] font-black">
              {" "}
              {balance.ada.toLocaleString()}
            </span>
          </div>
          <div className="text-sm text-[#ddd] uppercase">
            nebula:{" "}
            <span className="text-[#6673dc] font-black">
              {" "}
              {balance.nebula.toLocaleString()}
            </span>
          </div>
          <div className="text-sm text-[#ddd] uppercase">
            dum:{" "}
            <span className="text-[#6673dc] font-black">
              {" "}
              {balance.dum.toLocaleString()}
            </span>
          </div>
          <div className="text-sm text-[#ddd] uppercase">
            snek:{" "}
            <span className="text-[#6673dc] font-black">
              {" "}
              {balance.snek.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    ) : (
      <></>
    );
  };

  const Forms = () => {
    return (
      <div className="grid grid-cols-2 gap-4 my-4">
        <div className="">
          <label htmlFor="ada" className="mb-2 text-sm font-bold uppercase">
            ada
          </label>
          <input
            className="p-3 value-input w-full py-0.5 text-[16px] font-bold text-white border border-yellow-300  bg-[#00000000] h-10"
            id="ada"
            placeholder="Input ada amount"
            value={ada}
            onChange={(e) => setAda(e.target.value as unknown as number)}
            type="number"
          />
        </div>
        <div className="">
          <label htmlFor="nebula" className="mb-2 text-sm font-bold uppercase">
            nebula
          </label>
          <input
            className="p-3 value-input w-full py-0.5 text-[16px] font-bold text-white border border-yellow-300  bg-[#00000000] h-10"
            id="nebula"
            placeholder="Input Nebula amount"
            value={nebula}
            onChange={(e) => setNebula(e.target.value as unknown as number)}
            type="number"
          />
        </div>
        <div className="">
          <label htmlFor="dum" className="mb-2 text-sm font-bold uppercase">
            dum
          </label>
          <input
            className="p-3 value-input w-full py-0.5 text-[16px] font-bold text-white border border-yellow-300  bg-[#00000000] h-10"
            id="dum"
            placeholder="Input DUM amount"
            value={dum}
            onChange={(e) => setDum(e.target.value as unknown as number)}
            type="number"
          />
        </div>
        <div className="">
          <label htmlFor="snek" className="mb-2 text-sm font-bold uppercase">
            snek
          </label>
          <input
            className="p-3 value-input w-full py-0.5 text-[16px] font-bold text-white border border-yellow-300  bg-[#00000000] h-10"
            id="snek"
            placeholder="Input SNEK amount"
            value={snek}
            onChange={(e) => setSnek(e.target.value as unknown as number)}
            type="number"
          />
        </div>
      </div>
    );
  };

  return isFundModal ? (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center text-white backdrop-blur-md">
      <ClickAwayComponent onClickAway={() => setIsFundModal(false)}>
        <div className="w-[560px] bg-[#170b3b] p-6 rounded-2xl border-2 border-[#ffffff60] relative">
          <button
            className="absolute right-5 top-5"
            onClick={() => setIsFundModal(false)}
            disabled={isLoading}
          >
            <CloseIcon color="#fff" />
          </button>
          <div className="inline-flex gap-1">
            <button
              className={` text-sm px-4 py-2 rounded-t-md uppercase font-bold ${
                tab === "deposit"
                  ? "bg-[#732e9f] text-[#fff]"
                  : "bg-[#471368] text-[#000]"
              }`}
              onClick={() => setTab("deposit")}
              disabled={isLoading}
            >
              deposit
            </button>
            <button
              className={` text-sm px-4 py-2 rounded-t-md uppercase font-bold ${
                tab === "withdraw"
                  ? "bg-[#732e9f] text-[#fff]"
                  : "bg-[#471368] text-[#000]"
              }`}
              onClick={() => setTab("withdraw")}
              disabled={isLoading}
            >
              withdraw
            </button>
          </div>
          {tab === "deposit" && (
            <div className="py-6 border-t-2 border-[#732e9f]">
              <BlanceList />
              <Forms />
              <button
                className="px-5 bg-[#4e2080] hover:bg-[#3b1762] py-2 uppercase border duration-300 w-[180px] cursor-pointer disabled:cursor-not-allowed"
                disabled={isLoading}
                onClick={handleDeposit}
              >
                {isLoading ? "depositing..." : "deposit"}
              </button>
            </div>
          )}
          {tab === "withdraw" && (
            <div className="py-6 border-t-2 border-[#732e9f]">
              <BlanceList />
              <Forms />
              <button
                className="px-5 bg-[#4e2080] hover:bg-[#3b1762] py-2 uppercase border duration-300 w-[180px] cursor-pointer disabled:cursor-not-allowed"
                disabled={isLoading}
                onClick={handleWidraw}
              >
                {isLoading ? "withdrawing..." : "withdraw"}
              </button>
            </div>
          )}
        </div>
      </ClickAwayComponent>
    </div>
  ) : (
    <></>
  );
};

export default FundModal;
