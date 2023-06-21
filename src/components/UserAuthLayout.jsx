import { Navigate, Outlet } from "react-router-dom";
import useUserAuthContext from "../hook/useUserAuthContext";

export default function UserAuthLayout() {
    const {user} = useUserAuthContext()
  return (
    <div>
        {!user ? <Outlet/> : <Navigate to='/home'/>}
    </div>
  )
}
