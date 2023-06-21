import { Navigate, Outlet } from "react-router-dom"
import useAdminAuthContext from "../hook/useAdminAuthContext"

export default function AdminAuthLayout() {
    const {admin} = useAdminAuthContext()
  return (
    <div>
        {!admin? <Outlet/> : <Navigate to='/admin'/>}
    </div>
  )
}
