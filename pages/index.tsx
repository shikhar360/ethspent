import useEthSpents from "./hooks/useEthSpents00";
import useEtherTxData from "./hooks/useEtherTxData";
import { useState, useEffect, useMemo } from "react";

export default function Home() {
  const [tx, setTx] = useState<any>();

  // useEtherTxData takes 2 arguments (wallet address : string , time period- optional : number )

  useEffect(() => {
    useEtherTxData("0xed2ab4948bA6A909a7751DEc4F34f303eB8c7236").then((data) =>
      setTx(data)
    );
  }, []);

  console.log(tx);
  return (
    <>
      <h1>hello bhailog</h1>
    </>
  );
}
