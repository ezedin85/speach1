import { BACKEND_URL } from "../config/config"

export async function signup(contact, password, confirmPwd, fullName, email, rememberMe, level) {
    const response = await fetch(`${BACKEND_URL}api/user/signup`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({contact, password, confirmPwd, fullName, email, level})
    })
    const json = await response.json()
    return json
}

export const login = async(contact, password, rememberMe)=>{
    const response = await fetch(`${BACKEND_URL}api/user/login`,
    {
        method: "POST",
        body: JSON.stringify({contact, password}),
        headers: {"Content-Type": "application/json"}
    })
    const json = await response.json()
    return json
}

export const adminLogin = async(username, password, rememberMe)=>{
    const response = await fetch(`${BACKEND_URL}api/admin/login`,
    {
        method: "POST",
        body: JSON.stringify({username, password}),
        headers: {"Content-Type": "application/json"}
    })
    const json = await response.json()
    console.log(json);
    return json
}