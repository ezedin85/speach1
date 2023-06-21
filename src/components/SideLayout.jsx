import { NavLink, Link } from 'react-router-dom'
import './styles/sidebar.css'
import { useEffect, useState } from 'react'
import { Outlet } from "react-router-dom";
import useUserAuthContext from '../hook/useUserAuthContext';
import useLogoutUser from '../hook/useLogoutUser'
import { BACKEND_URL } from '../config/config';


export default function SideLayout() {
    const logout = useLogoutUser()
    const [openSidebar, setOpenSidebar] = useState(true)
    const [me, setMe] = useState({})
    const {user} = useUserAuthContext()
    
    useEffect(() => {
        if(window.innerWidth < 830){
            setOpenSidebar(false)
        }

        const getMe = async ()=>{
            const response = await fetch(`${BACKEND_URL}api/user/me`,{
                headers: {'authorization' : `Bearer ${user.token}`}
            })
            const json = await response.json()
            setMe(json)
        }
        getMe()

    }, [user.token])
    

    return (
    <div className="sideLayoutPages">
        <section className= {openSidebar? 'sidebarComp' : 'closedSidebar sidebarComp'}>
            <div className="toggleContainer">
                <span className='toggleSidebar' onClick={()=>{setOpenSidebar(prev=>!prev)}}>
                    <i className={`fa-solid ${openSidebar? 'fa-angle-left' : 'fa-angle-right'}`}></i>
                </span>
            </div>
            
            <Link style={{display: openSidebar? 'flex' : 'none'}} to="/profile" className="me">
                <span>
                    <i className="fa-solid fa-user"></i>
                </span>
                    
                <div>
                    <h3>{me.fullName}</h3>
                    <span>{me.email}</span>
                </div>
            </Link>

            <div className= {openSidebar? 'links' : 'closedLinks links'}>
                <NavLink
                    className={({ isActive }) =>isActive ? "active" : ""}
                    exact to="/home"><i class="material-symbols-outlined">dashboard_customize</i> <span>Dashboard</span>
                </NavLink>
                <NavLink
                    className={({ isActive }) =>isActive ? "active" : ""}
                    to="/exams"><i class="material-symbols-outlined">quiz</i> <span>Exams</span>
                </NavLink>
                <NavLink
                    className={({ isActive }) =>isActive ? "active" : ""}
                    to="/trainings"><i class="material-symbols-outlined">model_training</i> <span>Training</span>
                </NavLink>
                <NavLink
                    className={({ isActive }) =>isActive ? "active" : ""}
                    to="/profile"><i class="material-symbols-outlined">account_circle</i> <span>Profile</span>
                </NavLink>
                <NavLink
                    className={({ isActive }) =>isActive ? "active" : ""}
                    to="/contact"><i class="material-symbols-outlined">contact_mail</i> <span>Message us</span>
                </NavLink>
                <NavLink
                    className={({ isActive }) =>isActive ? "active" : ""}
                    to=""><i class="material-symbols-outlined">developer_mode_tv</i> <span>ananas Digital</span>
                </NavLink>
                <p onClick={logout}><i class="material-symbols-outlined">logout</i> <span>Logout</span></p>
            </div>
        </section>
        <Outlet context={me}/>
    </div>
  )
}
