import { createContext, useEffect, useState } from "react";

export const UserAuthContext = createContext()


export const UserAuthContextProvider = ({children})=>{
    const [user, setUser] = useState(null)
    
    useEffect(() => {
      if(JSON.parse(localStorage.getItem('lemalef_user'))){
          setUser(JSON.parse(localStorage.getItem('lemalef_user')))
      }
    }, [])
    
    return (
        <UserAuthContext.Provider value={{user, setUser}}>
            {children}
        </UserAuthContext.Provider>
    )
}