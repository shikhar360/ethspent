import React from "react";
import { ethers } from "ethers";
import { Web3Provider, EtherscanProvider } from "@ethersproject/providers";

export default async function useEthSpents(walletAddress: string) {
  // const provider  = new EtherscanProvider("homestead" , process.env.NEXT_PUBLIC_APIKEY as string );
  // const now = Date.now();
  // const tenDaysAgo = now - 10 * 24 * 60 * 60 * 1000; // 10 days ago in milliseconds
  // const transactions = await provider.getHistory(walletAddress)
  // // console.log( process.env.NEXT_PUBLIC_APIKEY);
  // const lastTx = transactions.slice(-10);
  // console.log(lastTx);
  // const date = lastTx?.map((tx) => {
  //   if (!tx?.timestamp) return; // skip if no timestamp (e.g. contract creation
  //   const txTimestamp = tx?.timestamp * 1000; // convert to milliseconds
  //   const txDate = new Date(txTimestamp).toISOString().slice(0, 10); // extract YYYY-MM-DD
  //   return txDate;
  // })
   // console.log(date);
  // const valueSpent = lastTx?.map(async (tx) => {
  //   const gettingTx = await provider.getTransaction(tx.hash);
  //   return gettingTx.value.toString()
  // })
  // const valueSpent2 = await Promise.all(valueSpent);
  // console.log(valueSpent2);
  // const transactionDataByDay : any = {};
  // transactions?.forEach((tx ) => {
  //   if (!tx?.timestamp) return; // skip if no timestamp (e.g. contract creation
  //   const txTimestamp = tx?.timestamp * 1000; // convert to milliseconds
  //   const txDate = new Date(txTimestamp).toISOString().slice(0, 10); // extract YYYY-MM-DD
  //   console.log(tx);
  //   // const txValue = parseFloat(ethers.utils.formatEther(tx.value)); // convert from wei to ether
  //   // if (transactionDataByDay[txDate]) {
  //   //   transactionDataByDay[txDate] += txValue;
  //   // } else {
  //   //   transactionDataByDay[txDate] = txValue;
  //   // }
  // });
}
