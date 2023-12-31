/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState, useEffect, useContext } from "react";
import CoinValue from "./CoinValue";
import SlotCell from "./SlotCell";
import { SYMBOLS, SymbolItem } from "./Symbols";
import WinsChart from "./WinsChart";
import { generateRandomNumbers, sleep } from "../utils/util";
import WinPopup from "./WinPopup";
import { Howl } from "howler";
import { DELAY_TIME, DEMO_WALLET, SPIN_TIME } from "../config";
import { play } from "../utils/api";
import { GameContext, GameContextProps } from "../context/GameProvider";
import { BalanceType } from "../utils/types";
import NumberCounter from "./NumberCounter";
import TokenDropdown from "./TokenDropdown";
import Image from "next/image";

const SlotsContainer: React.FC = () => {
  const [positionY, setPositionY] = useState(0);
  const gameContext = useContext<GameContextProps | null>(GameContext);
  const [blur, setBlur] = useState(10);
  const [randomFlag, setRandomFlag] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [coinValue, setCoinValue] = useState(0.1);

  const [isStarted, setIsStarted] = useState(false);

  const [isWinsChart, setIsWinsChart] = useState(false);
  const [isWinModal, setIsWinModal] = useState(false);

  const [isSpinMoveEnd, setIsSpinMoveEnd] = useState(true);
  const [rewardSymbols, setRewardSymbols] = useState<SymbolItem[]>([]);

  const [spinResult, setSpinResult] = useState(generateRandomNumbers(15));

  const playSound = new Howl({
    src: "../assets/sounds/play-3.wav",
  });

  const cells = useMemo(() => {
    const list: SymbolItem[][] = [];
    Array.from({ length: 5 }, () => {
      const cellRow = SYMBOLS.concat(SYMBOLS).slice(); // Create a copy of SYMBOLS array
      // A function that randomly changes the order of cellRow items
      for (let i = cellRow.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cellRow[i], cellRow[j]] = [cellRow[j], cellRow[i]];
      }
      list.push(cellRow);
    });

    const resArray: SymbolItem[][] = [];
    const rewards: SymbolItem[] = [];

    for (let i = 0; i < 5; i++) {
      const item = spinResult.slice(i * 3, i * 3 + 3);
      const s: SymbolItem[] = [];
      for (let j = 0; j < 3; j++) {
        const d = SYMBOLS.find((symbol) => symbol.id === item[j]);
        if (item[j] === 0) {
          rewards.push(SYMBOLS.find((symbol) => symbol.id === 0) as SymbolItem);
        }
        if (d) {
          s.push(d);
        }
      }
      if (s.length === 3) {
        resArray[i] = [...list[i], ...s];
      }
      // if (item) list[i] = [...list[i], ...(item as SymbolItem[])];
    }

    setRewardSymbols(rewards);
    return resArray;
  }, [randomFlag, spinResult]);

  useEffect(() => {
    console.log("jetpackCount", rewardSymbols.length);

    const runWinEffect = async () => {
      if (isStarted && rewardSymbols.length > 0 && !isReset) {
        console.log("win modal show!");
        await sleep(SPIN_TIME);
        setIsSpinMoveEnd(true);
        playSound.stop();
        await sleep(DELAY_TIME);
        setIsSpinMoveEnd(true);
        setIsWinModal(true);
      }
    };
    runWinEffect();
  }, [rewardSymbols]);

  const onReset = () => {
    setIsSpinMoveEnd(true);
    playSound.stop();
    setIsReset(true);
    setPositionY(0);
    if (gameContext && gameContext.getBalance) gameContext.getBalance();
  };

  const spinEffect = async () => {
    await sleep(1);
    playSound.play();
    setIsSpinMoveEnd(false);
    setIsReset(false);
    setBlur(0);
    setRandomFlag(!randomFlag);
    setPositionY(7210);
    await sleep(8000);
    setIsSpinMoveEnd(true);
  };

  const handleSpin = async () => {
    console.log("spin!");
    setIsStarted(true);
    onReset();
    if (!gameContext) return;
    gameContext.getBalance();
    console.log(gameContext.token);
    const res = await play(
      DEMO_WALLET,
      gameContext.token,
      coinValue.toString()
    );
    if (res && res.length === 15) {
      console.log("api res", res);
      setSpinResult(res);
    }
    spinEffect();
  };

  return (
    <>
      <div className="fixed top-0 left-0 z-10 flex flex-col items-center justify-center w-full h-full backdrop-blur-md">
        <div className="flex flex-col items-center">
          {gameContext && gameContext.balance && (
            <BalaneBox balance={gameContext.balance} />
          )}
          <div className="">
            <div className="w-[800px] relative">
              <img
                src={"./images/border.png"}
                className="absolute max-w-[915px] w-[915px] h-[585px] -top-[62px] -left-[55px] z-20 hue-rotate"
                alt=""
              />

              <button
                className="absolute left-0 z-30 -top-10 zoom-in"
                onClick={() => setIsWinsChart(true)}
              >
                <img src={"/images/info.png"} className="w-8 h-8" alt="" />
              </button>
              <h5 className="absolute z-30 text-white -translate-x-1/2 left-1/2 -top-11">
                Win Win
              </h5>
              <TokenDropdown />
              <CoinValue
                title="Coin value"
                coinValue={coinValue}
                className="absolute right-[80px] w-[200px] z-30 -bottom-11"
                setCoinValue={setCoinValue}
              />
              <button
                title="Spin"
                className="grid w-[100px] h-[100px] mt-5 transition-all duration-300 bg-yellow-500 rounded-full place-content-center hover:bg-yellow-600 hover:scale-[1.1] hover:-rotate-45 disabled:cursor-not-allowed absolute left-1/2 z-30 -bottom-[60px] -translate-x-1/2"
                onClick={handleSpin}
                disabled={!isSpinMoveEnd}
              >
                <img src="/images/spin.png" alt="" />
              </button>
              <div className="flex gap-1 h-[460px] w-[800px] cell-border relative z-10">
                {/* <span className="border-span" />
            <span className="border-span" />
            <span className="border-span" />
            <span className="border-span" /> */}
                {cells.map((item, key) => (
                  <SlotCell
                    key={key}
                    targetIndex={8}
                    y={positionY}
                    delay={0.2 * (key + 1)}
                    blur={blur}
                    symbols={item}
                    isReset={isReset}
                    isSpinMoveEnd={isSpinMoveEnd}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <WinsChart isOpen={isWinsChart} onClose={() => setIsWinsChart(false)} />
      <WinPopup
        isOpen={isWinModal}
        onClose={() => setIsWinModal(false)}
        items={rewardSymbols}
        onReset={onReset}
      />
    </>
  );
};

export default SlotsContainer;

const BalaneBox = ({ balance }: { balance: BalanceType }) => {
  return (
    <div className="flex items-center px-10 mb-20 cell-border">
      <span className="border-span" />
      <span className="border-span" />
      <span className="border-span" />
      <span className="border-span" />
      <div className="font-black uppercase text-[#b5994d] hue-rotate mr-10">
        balance
      </div>
      <div className="flex items-center gap-4">
        <div className="font-black uppercase text-[#fff] flex items-center gap-4">
          <div className="text-sm text-center">ada:</div>
          <div className="text-xl text-right text-[yellow] w-[100px]">
            <NumberCounter
              originNum={balance.ada - 5 > 0 ? balance.ada - 5 : balance.ada}
              targetNum={balance.ada}
            />
            {/* {balance.ada.toLocaleString()} */}
          </div>
        </div>
        <div className="font-black uppercase text-[#fff] flex items-center gap-4">
          <div className="text-sm text-center">nebula:</div>
          <div className="text-xl text-right text-[yellow] w-[100px]">
            {/* {balance.nebula.toLocaleString()} */}
            <NumberCounter
              originNum={
                balance.nebula - 5 > 0 ? balance.nebula - 5 : balance.nebula
              }
              targetNum={balance.nebula}
            />
          </div>
        </div>
        <div className="font-black uppercase text-[#fff] flex items-center gap-4">
          <div className="text-sm text-center">dum:</div>
          <div className="text-xl text-right text-[yellow] w-[100px]">
            {/* {balance.dum.toLocaleString()} */}
            <NumberCounter
              originNum={balance.dum - 5 > 0 ? balance.dum - 5 : balance.dum}
              targetNum={balance.dum}
            />
          </div>
        </div>
        <div className="font-black uppercase text-[#fff] flex items-center gap-4">
          <div className="text-sm text-center">snek:</div>
          <div className="text-xl text-right text-[yellow] w-[100px]">
            {/* {balance.snek.toLocaleString()} */}
            <NumberCounter
              originNum={balance.snek - 5 > 0 ? balance.snek - 5 : balance.snek}
              targetNum={balance.snek}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
