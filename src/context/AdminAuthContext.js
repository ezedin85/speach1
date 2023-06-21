import { useEffect } from "react";
import { createContext, useState } from "react";

export const AdminAuthContext = createContext()

export function AdminAuthContextProvider({children}) {
    const [admin, setAdmin] = useState(null)

    useEffect(() => {
        if(JSON.parse(localStorage.getItem('lemalef_admin'))){
            setAdmin(JSON.parse(localStorage.getItem('lemalef_admin')))
        }
    }, [])
    
  return (
    <AdminAuthContext.Provider value={{admin, setAdmin}}>
        {children}
    </AdminAuthContext.Provider>
  )
}
