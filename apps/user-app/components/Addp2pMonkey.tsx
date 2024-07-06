"use client"
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { transfer } from "../app/lib/actions/sendP2P";
import { OnRampTransactions } from "./onRampTransaction";
import { getOnRampTransactions } from "../../user-app/app/lib/actions/getOnRampTransactions";
import { Button } from "@repo/ui/button";
import { useState } from "react";
export const Addp2pMoney = () => {
  const [amt, setAmt] = useState(0);
  const [phn, setPhn] = useState("");
  return <Card title="Send" >
    <div className="w-full">
      <TextInput label={"Phone"} placeholder={"Phone Number"} onChange={(value) => {
        setPhn(value);
      }} />

      <TextInput label="Amount" placeholder="Amount" onChange={(value) => {
        setAmt(Number(value));
      }} />
    </div>
    <div className="mt-2 p-4 flex justify-center">
      <Button onClick={async () => {
        console.log("here");
        await transfer(amt * 100, phn);
      }}>
        <div>
          P2P Transfer
        </div>
      </Button>
    </div>
  </Card>
}
