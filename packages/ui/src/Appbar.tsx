import { Button } from "./button"


interface AppbarProps {
  user?: any,
  onSignin: any,
  onSignout: any

}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  return <div className="flex justify-between border-b p-2">
    <div className="text-lg flex flex-col justify-center">
      PayTM
    </div>
    <div className="flex flex-col justify-center pt-2">
      <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
    </div>
  </div>
}
