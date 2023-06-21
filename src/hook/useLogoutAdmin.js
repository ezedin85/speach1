import useAdminAuthContext from './useAdminAuthContext'

export default function useLogoutAdmin() {
    const {setAdmin} = useAdminAuthContext()
    function logout() {
        setAdmin(null)
        localStorage.removeItem('lemalef_admin')
    }
  return logout
}
