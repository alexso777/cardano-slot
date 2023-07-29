import { useContext, useState } from "react";
import { ModalContext } from "../context/ModalProvider";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import { backendGetNonce, backendVerifySignature } from "../backend";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = () => {
  const { wallet, connected } = useWallet();
  const [state, setState] = useState<number>(0);

  async function frontendStartLoginProcess() {
    if (connected) {
      setState(1);
      const userAddress = (await wallet.getRewardAddresses())[0];
      const res = await backendGetNonce(userAddress);
      await frontendSignMessage(res.nonce);
    }
  }

  async function frontendSignMessage(nonce: string) {
    try {
      const userAddress = (await wallet.getRewardAddresses())[0];
      const signature = await wallet.signData(userAddress, nonce);
      const res = await backendVerifySignature(nonce, userAddress, signature);
      if (res.result === true) {
        setState(2);
      } else {
        setState(3);
      }
    } catch (error) {
      setState(0);
    }
  }
  const { isFundModal, setIsFundModal } = useContext<any>(ModalContext);

  return (
    <div className="fixed top-0 left-0 z-20 w-full">
      <div className="container mx-auto max-w-[1200px]">
        <div className="flex justify-between py-6">
          <div className="hue-rotate">
            <img src={"/images/title.png"} className="h-[60px]" alt="" />
          </div>
          <div className="flex items-center gap-2">
            <button
              className="text-sm font-black rounded-lg bg-[#e753ba] hover:bg-[#17d0e8] h-12 w-[120px] uppercase duration-300"
              onClick={() => setIsFundModal(true)}
            >
              deposit
            </button>
            <div className="">
              {state == 0 && (
                <CardanoWallet
                  label="Sign In"
                  onConnected={() => frontendStartLoginProcess()}
                />
              )}
              {state == 1 && <div>Signing in...</div>}
              {state == 2 && (
                <div className="mr-wallet-button">Signed in successful</div>
              )}
              {state == 3 && (
                <div className="mr-wallet-button">Signed in failed</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
