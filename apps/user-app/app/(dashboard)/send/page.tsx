import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import db from "@repo/db/client";
import { OnRampTransactions } from "../../../components/onRampTransaction";
import { Addp2pMoney } from "../../../components/Addp2pMonkey";
import { getOnRampTransactions } from "../../lib/actions/getOnRampTransactions";

export default async function() {
  const transactions = await getOnRampTransactions();
  console.log(transactions);
  return <div className="w-full ">
    <div className="flex h-[95vh] justify-center flex-col">
      <div className="grid grid-cols-2 gap-4">
        <Addp2pMoney />
        <div>
          <OnRampTransactions transactions={transactions} />
        </div>
      </div>
    </div>
  </div>
}
