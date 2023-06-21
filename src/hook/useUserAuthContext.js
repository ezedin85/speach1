import { useContext } from "react";
import { UserAuthContext } from "../context/UserAuthContext";

export default function useUserAuthContext() {
    const context = useContext(UserAuthContext)
    if(!context){
        throw Error("useUserAuthContext must be used in userAuthContext.provider")
    }
    return context
}
