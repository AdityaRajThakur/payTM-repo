"use server"
import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";



export const createOnrampTransaction = async (bank: string, amount: number) => {
  const session = await getServerSession(authOptions);
  if (!session?.user || !session?.user?.id) {
    return {
      message: "Unauthenticated request"
    }
  }

  const tkn = (Math.random() * 1000).toString();
  try {
    const user = await db.onRampTransaction.create({
      data: {
        provider: bank,
        status: "Processing",
        token: tkn,
        amount: amount * 100,
        startTime: new Date(),
        userId: Number(session?.user?.id),
      }
    })
    return {
      message: "Done",
    }
  } catch (error) {
    return {
      message: "Failed"
    }
  }
}
