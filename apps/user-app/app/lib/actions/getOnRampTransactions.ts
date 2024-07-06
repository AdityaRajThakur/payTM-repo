"use server"
import { getServerSession } from "next-auth";
import db from "@repo/db/client";
import { authOptions } from "../auth";
export async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  console.log(session?.user?.id);
  const transactions = await db.p2ptransfer.findMany({
    where: {
      toUserId: Number(session?.user?.id)
    }
  });
  return transactions.map((t) => ({
    time: t.timestamp,
    amount: t.amount,
    toUser: t.toUserId
  }))
}


