import useUserAuthContext from "./useUserAuthContext";

export default function useLogoutUser() {
  const {setUser} = useUserAuthContext()
  const logout = ()=>{
      setUser(null)
      localStorage.removeItem('lemalef_user')
  }

  return logout
}
