import { Navigate, Outlet } from "react-router-dom";
import useUserAuthContext from "../hook/useUserAuthContext";
import NavUsers from "./navUsers/NavUsers";

export default function UserLayout() {
  const {user} = useUserAuthContext()
  return (
    // added the 1px padding top to prevent margin collapse
    <div style={{paddingTop: '1px'}}>
        <NavUsers/>
        {user ? <Outlet/> : <Navigate to='/signup'/>}
    </div>
  )
}