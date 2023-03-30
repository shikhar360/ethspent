import {useEtherTxData} from "./hooks/useEtherTxData";
import { useState, useEffect, useMemo, ChangeEvent } from "react";
import Image from "next/image";
import { EtherscanProvider } from "@ethersproject/providers";

import TxDetails from "@/components/TxDetails";
import { ethers } from "ethers";
export default function Home() {
  const [tx, setTx] = useState<any>();
  const [inputs, setInputs] = useState<{ address: string; days: string }>({
    address: "",
    days: "",
  });
  const [bal, setBal] = useState<number>(0);
  const provider = new EtherscanProvider(
    "homestead",
    process.env.NEXT_PUBLIC_APIKEY as string
  );

  // useEtherTxData takes 2 arguments (wallet address : string , time period- optional : number )

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInputs((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function sendData({
    address,
    days,
  }: {
    address: string;
    days: string;
  }) {
    console.log(address, days);
    const balance = await provider.getBalance(address);
    const format = ethers.formatEther(balance.toString());
    setBal(+format);
    const txDatas = await useEtherTxData(address, +days);
    setTx(txDatas);
  }
  return (
    <div className="w-full min-h-screen flex flex-col items-start justify-start pt-10 px-8 font-mono pb-24 ">
      <p className="text-purple-700 text-mdxl font-semibold   pb-2">
        Welcome to ,
      </p>
      <p className="text-3xl tracking-wide  font-bold text-stone-700">
        EthSpends Analytics
      </p>
      <div className="flex items-center justify-center gap-8 mt-8 mb-4">
        <Image
          src="/img/cred.png"
          width={250}
          height={100}
          alt="credit"
          className="mt-6"
        />
        <div>
          <span className="text-sm">Your Balance is </span>
          <p className="txt-bold  text-7xl pt-3 text-purple-500">
            {bal ? bal.toFixed(6) + " ETH" : "$00.xxxxx"}
          </p>
        </div>
      </div>
      <p className="text-xs ">
        {" "}
        Example : 0xed2ab4948bA6A909a7751DEc4F34f303eB8c7236
      </p>
      <div className="w-full mt-6 mb-4 flex items-center justify-center gap-4">
        <input
          type="text"
          placeholder="Enter Wallet Address 💰 "
          className="border-2 px-2 py-1 w-full text-2xl rounded-md"
          name="address"
          onChange={handleInput}
        />
        <input
          type="number"
          placeholder="No. of Days 🗓️"
          className="rounded-md px-2 py-1.5 border-2 w-52  "
          name="days"
          onChange={handleInput}
          min={1}
          max={30}
        />

        <p
          onClick={() => sendData(inputs)}
          className="text-xl font-bold tracking-wider border-2 border-dashed py-1 px-2 rounded-md w-52 cursor-pointer hover:shadow-purple-200 hover:shadow-lg"
        >
          {" "}
          Search 🔎
        </p>
      </div>
      <div className="w-full flex flex-col-reverse">
        {tx?.map((val: any , idx : number) => {
          return (
            <div key={idx} className="w-full flex flex-col">
              <TxDetails tx={val} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
