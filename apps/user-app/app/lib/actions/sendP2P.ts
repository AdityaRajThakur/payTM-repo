'use server'
import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";


export async function transfer(amt: Number, to: string) {
  const session = await getServerSession(authOptions);
  const from = session?.user?.id;
  if (!from) {
    return {
      message: "not authenticated"
    }
  }

  const toUser = await db.user.findFirst({
    where: {
      number: to
    }
  });
  if (!toUser) {
    return {
      message: "User not found"
    }
  }
  await db.$transaction(async (txn) => {
    await txn.$queryRaw`select * from "Balance" where "userId"=${Number(from)} for update ; `
    const fromUser = await db.balance.findUnique({
      where: { userId: Number(from) },
    });
    if (!fromUser || fromUser.amount < Number(amt)) {
      throw new Error("Insufficient funds");
    }

    await txn.balance.update({
      where: { userId: Number(from) },
      data: {
        amount: { decrement: Number(amt) }
      }
    })

    await txn.balance.update({
      where: { userId: toUser.id },
      data: {
        amount: { increment: Number(amt) }
      }
    })
    await txn.p2ptransfer.create({
      data: {
        amount: Number(amt),
        toUserId: toUser.id,
        fromUserId: Number(from),
        timestamp: new Date(),

      }
    });
  })
  return {
    message: "transfered"
  }


}
