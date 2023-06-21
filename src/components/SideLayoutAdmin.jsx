import { NavLink, Link, Navigate } from 'react-router-dom'
import { Outlet } from "react-router-dom";
import useLogoutAdmin from '../hook/useLogoutAdmin'
import useAdminAuthContext from '../hook/useAdminAuthContext';
import { useState } from 'react';
import NavAdmin from '../components/nav/NavAdmin'


export default function SideLayout() {
    const logout = useLogoutAdmin()
    const [openSidebar, setOpenSidebar] = useState(true)
    const {admin} = useAdminAuthContext()
    
    return (
    <div>
    {/* redirect to login page if not logged in */}
        {!admin ? <Navigate to="/admin/login"/> :
        
        <div>
            <NavAdmin/>
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
                            <h3>{admin?.username}</h3>
                        </div>
                    </Link>

                    <div className= {openSidebar? 'links' : 'closedLinks links'}>
                        <NavLink
                            className={({ isActive }) =>isActive ? "active" : ""}
                            to="/admin"><i className="fa-regular fa-rectangle-list"></i> <span>Dashboard</span>
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>isActive ? "active" : ""}
                            to="/admin/students"><i className="fa-solid fa-file-contract"></i> <span>Students</span>
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>isActive ? "active" : ""}
                            to="/admin/questions"><i className="fa-solid fa-file-signature"></i> <span>Questions</span>
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>isActive ? "active" : ""}
                            to="/admin/admins"><i className="fa-solid fa-user"></i> <span>Admins</span>
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>isActive ? "active" : ""}
                            to="/admin/messages"><i className="fa-solid fa-address-card"></i> <span>Messages</span>
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>isActive ? "active" : ""}
                            to="https://t.me/ananasDigital"><i className="fa-regular fa-folder-open"></i> <span>ananas Digital</span>
                        </NavLink>
                        
                        <p onClick={logout}><i className="fa-solid fa-person-through-window"></i> <span>Logout</span></p>
                    </div>
                </section>
                <Outlet/>
            </div>
        </div>
    }
    </div>
  )
}
