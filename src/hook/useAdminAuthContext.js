import { useContext } from "react";
import { AdminAuthContext } from '../context/AdminAuthContext'

export default function useAdminAuthContext() {
    const context = useContext(AdminAuthContext)
    if(!context){
        throw Error("useAdminAuthContext must be used in AdminAuthContext.provider")
    }
    return context
}
