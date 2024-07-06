"use client"
import { useSession, signIn, signOut } from "next-auth/react";
import { Appbar } from "@repo/ui/Appbar";
import { useRouter } from "next/navigation";

export const AppbarClient = () => {
  const session = useSession();
  const router = useRouter();
  return <div>
    <Appbar onSignin={signIn} onSignout={async () => {
      await signOut()
      router.push("/api/auth/signin")

    }} user={session.data?.user} />
  </div>
}
