import React from 'react'
import { useState } from 'react';
export default function TxDetails({tx} : any) {
  // console.log(tx.date);
  const [toggle  , setToggle] = useState<boolean>(false)
//  console.log(toggle);
   const totalGAS = tx.val.gasVal.reduce( (acc : number , num : number)=> acc+ num , 0 )
   const totalETH = tx.val.txs.reduce( (acc : number , num : number)=> acc+ num , 0 )
  //  console.log(totalETH);
  return (
    <>
    <div className={`w-full flex   p-2 my-1 border rounded-md   item-center justify-around transition-all duration-150 ${totalETH > 0 ? " hover:bg-lime-100" : "hover:bg-rose-100"}`}>
       <p>{tx.date}</p>
       <div className='text-xs flex gap-10'>

       <span> Gas Spent : <b className='text-lime-500' >{totalGAS.toFixed(6)} </b> ETH</span>
       <span> ETH Spent : <b className={totalETH > 0 ? "text-lime-500" : "text-rose-400"}>{totalETH.toFixed(6)}</b> ETH</span>
       </div>

       <p onClick={()=> setToggle(prev => !prev)} className='text-xs underline font-semibold py-1 px-2 cursor-pointer transition-all duration-200 rounded-md '>
        { !toggle ? "Show Details" : "Close Details"}
       </p>
    </div>
    {toggle &&  tx.val.txs.map((val : number , idx : number) => <div className={`  w-full py-1 px-3 mt-1 border ${val > 0 ? "hover:bg-lime-100 " : "hover:bg-rose-100" } rounded-md flex items-center justify-between text-xs transition-all duration-200 ease-linear`}>
     <p >{val > 0 ? "Recieved  ✅ " : "Sent  💢"}</p>
     <p>{tx.val.gasVal[idx].toFixed(8)}</p>
     <p>{val.toFixed(6)}</p>
    </div>)}
    </>
  )
}
