/* eslint-disable react-refresh/only-export-components */
import Alien from "../assets/images/symbols/alien.png";
import Commet from "../assets/images/symbols/commet.png";
import Jetpack from "../assets/images/symbols/jetpack.png";
import Netbula from "../assets/images/symbols/netbula.png";
import Rocket from "../assets/images/symbols/rocket.png";
import Saturn from "../assets/images/symbols/saturn.png";

import NumImage1 from "../assets/images/symbols/1.png";
import NumImage2 from "../assets/images/symbols/2.png";
import NumImage3 from "../assets/images/symbols/3.png";
import NumImage4 from "../assets/images/symbols/4.png";
import NumImage5 from "../assets/images/symbols/5.png";
import NumImage6 from "../assets/images/symbols/6.png";
import NumImage7 from "../assets/images/symbols/7.png";
import NumImage8 from "../assets/images/symbols/8.png";
import NumImage9 from "../assets/images/symbols/9.png";

import ImageA from "../assets/images/symbols/a.png";
import ImageB from "../assets/images/symbols/b.png";
import ImageC from "../assets/images/symbols/c.png";
import ImageD from "../assets/images/symbols/d.png";
import ImageE from "../assets/images/symbols/e.png";
import ImageF from "../assets/images/symbols/f.png";
import ImageG from "../assets/images/symbols/g.png";
import ImageH from "../assets/images/symbols/h.png";
import ImageI from "../assets/images/symbols/i.png";
import Image from "next/image";

export interface SymbolItem {
  label: string;
  media: JSX.Element;
  weight: number;
  reward: number;
  id: number;
}

export const SYMBOLS: SymbolItem[] = [
  {
    label: "1",
    media: <Image src={NumImage1} className="w-full h-full" alt="" />,
    weight: 0,
    reward: 0,
    id: 7,
  },
  {
    label: "2",
    media: <Image src={NumImage2} className="w-full h-full" alt="" />,
    weight: 0,
    reward: 0,
    id: 8,
  },
  {
    label: "3",
    media: <Image src={NumImage3} className="w-full h-full" alt="" />,
    weight: 0,
    reward: 0,
    id: 9,
  },
  {
    label: "4",
    media: <Image src={NumImage4} className="w-full h-full" alt="" />,
    weight: 0,
    reward: 0,
    id: 10,
  },
  {
    label: "5",
    media: <Image src={NumImage5} className="w-full h-full" alt="" />,
    weight: 0,
    reward: 0,
    id: 11,
  },
  {
    label: "6",
    media: <Image src={NumImage6} className="w-full h-full" alt="" />,
    weight: 0,
    reward: 0,
    id: 12,
  },
  {
    label: "7",
    media: <Image src={NumImage7} className="w-full h-full" alt="" />,
    weight: 0,
    reward: 0,
    id: 14,
  },
  {
    label: "8",
    media: <Image src={NumImage8} className="w-full h-full" alt="" />,
    weight: 0,
    reward: 0,
    id: 15,
  },
  {
    label: "9",
    media: <Image src={NumImage9} className="w-full h-full" alt="" />,
    weight: 0,
    reward: 0,
    id: 16,
  },
  {
    label: "A",
    media: <Image src={ImageA} className="w-full h-full" alt="" />,
    weight: 0,
    reward: 0,
    id: 17,
  },
  {
    label: "B",
    media: <Image src={ImageB} className="w-full h-full" alt="" />,
    weight: 0,
    reward: 0,
    id: 18,
  },
  {
    label: "C",
    media: <Image src={ImageC} className="w-full h-full" alt="" />,
    weight: 0,
    reward: 0,
    id: 19,
  },
  {
    label: "D",
    media: <Image src={ImageD} className="w-full h-full" alt="" />,
    weight: 0,
    reward: 0,
    id: 20,
  },
  {
    label: "E",
    media: <Image src={ImageE} className="w-full h-full" alt="" />,
    weight: 0,
    reward: 0,
    id: 21,
  },
  {
    label: "F",
    media: <Image src={ImageF} className="w-full h-full" alt="" />,
    weight: 0,
    reward: 0,
    id: 22,
  },
  {
    label: "G",
    media: <Image src={ImageG} className="w-full h-full" alt="" />,
    weight: 0,
    reward: 0,
    id: 23,
  },
  {
    label: "H",
    media: <Image src={ImageH} className="w-full h-full" alt="" />,
    weight: 0,
    reward: 0,
    id: 24,
  },
  {
    label: "I",
    media: <Image src={ImageI} className="w-full h-full" alt="" />,
    weight: 0,
    reward: 0,
    id: 6,
  },
  ///////////////////////////////////

  {
    label: "Alien",
    media: <Image src={Alien} className="w-full h-full" alt="" />,
    weight: 1,
    reward: 1,
    id: 1,
  },
  {
    label: "Commet",
    media: <Image src={Commet} className="w-full h-full" alt="" />,
    weight: 1,
    reward: 1,
    id: 2,
  },
  {
    label: "Jetpack",
    media: <Image src={Jetpack} className="w-full h-full" alt="" />,
    weight: 2,
    reward: 1,
    id: 0,
  },
  {
    label: "Netbula",
    media: <Image src={Netbula} className="w-full h-full" alt="" />,
    weight: 1,
    reward: 1,
    id: 3,
  },
  {
    label: "Rocket",
    media: <Image src={Rocket} className="w-full h-full" alt="" />,
    weight: 1,
    reward: 1,
    id: 4,
  },
  {
    label: "Saturn",
    media: <Image src={Saturn} className="w-full h-full" alt="" />,
    weight: 1,
    reward: 1,
    id: 5,
  },
];
