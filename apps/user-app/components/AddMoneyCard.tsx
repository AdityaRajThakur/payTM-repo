'use client'

import { Card } from "@repo/ui/card"
import { Select } from "@repo/ui/select"
import { TextInput } from "@repo/ui/textinput"
import { Button } from "@repo/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createOnrampTransaction } from "../app/lib/actions/createOnrampTransactions"
const SUPPORTED_BANKS = [{
  name: "HDFC Bank",
  redirectUrl: "https://netbanking.hdfcbank.com"
}, {
  name: "Axis Bank",
  redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
  const [bank, setBank] = useState(SUPPORTED_BANKS[0]?.name || "");
  const [amount, setAmout] = useState(0);
  const router = useRouter();
  return <Card title="Add Money">
    <div className="w-full">
      <TextInput label={"Amount"} placeholder={"Amount"} onChange={(val) => {
        setAmout(Number(val));
      }} />
      <div className="py-4 text-left">
        Bank
      </div>
      <Select onSelect={(value) => {
        setRedirectUrl(SUPPORTED_BANKS.find(x => x.name == value)?.redirectUrl || "");
        setBank(SUPPORTED_BANKS.find(x => x.name == value)?.name || "");
      }} options={SUPPORTED_BANKS.map(x => ({
        key: x.name,
        value: x.name
      }))} />
      <div className="flex justify-center pt-4">
        <Button onClick={async () => {
          console.log(redirectUrl)
          await createOnrampTransaction(bank, amount);
          router.push(redirectUrl || "")
        }}>
          Add Money
        </Button>
      </div>
    </div>
  </Card>
}
