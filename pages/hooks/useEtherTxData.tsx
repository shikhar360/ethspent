import React, { useEffect } from "react";
import {
  EtherscanProvider,
  Web3Provider,
  AlchemyProvider,
} from "@ethersproject/providers";

import { ethers } from "ethers";

export default async function useEtherTxData(
  walletAddress: string,
  numberOfDays: number = 30
) {
  try {
    // const provider = new EtherscanProvider(
    //   "homestead",
    //   process.env.NEXT_PUBLIC_APIKEY as string
    // );

    //!........................................................

    const daysAgo = numberOfDays;
    const timestamp = Math.floor(Date.now() / 1000 - daysAgo * 24 * 60 * 60);

    // Getting the closest block of the last provided days
    const block = await fetch(
      `https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=before&apikey=${process.env.NEXT_PUBLIC_APIKEY}`
    );

    const blockJson = await block.json();
    // console.log(blockJson);

    // Passing the block.result in the ap to ge the data

    const response = await fetch(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=${blockJson.result}&endblock=99999999&sort=asc&apikey=${process.env.NEXT_PUBLIC_APIKEY}`
    );
    // &start=${startTimestamp}&end=${endTimestamp}
    const json = await response.json();
    console.log(json);

    // now we have to create a map
    const txByDate = groupping(json, walletAddress);
    // const arObj = Array.from(txByDate, ([date, txs]) => ({ date, txs }));
    const arObj = Array.from(txByDate, ([date, val]) => ({ date, val}));
    // console.log(txByDate);
    // console.log(arObj);
    return arObj;
    //!........................................................
  } catch (error) {
    console.log(error);
  }
}

function groupping(json: any, walletAddress: string) {
  const mappedData = new Map();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let gasArr: number[] = [];


  json.result.forEach((val: any) => {
    // return const utcDate = new Date(val.timeStamp * 1000).toUTCString();
    // console.log(val);
    const utcDate = new Date(val.timeStamp * 1000).toUTCString();
    const parsedDate = new Date(Date.parse(utcDate)).getDate();
    const parsedMonth = new Date(Date.parse(utcDate)).getMonth();
    const actualDate = months[parsedMonth] + " " + parsedDate;

    const txValue =
      val.from.toLowerCase() === walletAddress.toLowerCase()
        ? +ethers.formatEther(val.value) * -1
        : +ethers.formatEther(val.value);

      // gasArr.push(+val.gasUsed);
    const gasValue = +ethers.formatEther((val.gasUsed * val.gasPrice)+"")

    if (mappedData.has(actualDate)) {
      mappedData.get(actualDate).txs.push(txValue);
      mappedData.get(actualDate).gasVal.push(gasValue);
    } else {
      mappedData.set(actualDate, { txs : [txValue] , gasVal : [gasValue]});
      // mappedData.set(actualDate, [gasValue]);
    }
  });

  return mappedData;
}


