import {useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import useLogoutAdmin from '../../hook/useLogoutAdmin'


export default function Nav() {
  //show links when device width is below 960px
  const [showLinks, setShowLinks] = useState(false)
  const logout = useLogoutAdmin()

  useEffect(() => {
    document.body.style.overflow = showLinks ? 'hidden': 'visible'
  }, [showLinks])

  return (
    <div style={showLinks? {position: "fixed"} : {}} className='navPage' >
        <div className="container">
            <NavLink className='logo' onClick={()=>{setShowLinks(false)}} to='/admin' >
              <img src="assets/logo.png" alt="" />
              <span>Lemalef Exams</span>
            </NavLink>
            <div style={showLinks? {transition: ".4s"} : {}} className={showLinks? 'showLinks navLinks': 'navLinks'}>
              
                <NavLink onClick={()=>{setShowLinks(false)}} to='/admin' >Dashboard</NavLink>
                <NavLink onClick={()=>{setShowLinks(false)}} to='/login' >Login</NavLink>
                <NavLink onClick={()=>{setShowLinks(false)}} to='/help' >Help</NavLink>
                <NavLink onClick={()=>{setShowLinks(false)}} to='/contact' >Contact us</NavLink>
                <span onClick={logout}>Logout</span>

            </div>
            <div onClick={()=>{setShowLinks(prev=>(!prev))}} className={showLinks? 'closeBar menuBar': 'menuBar'}>
              <span className="line1"></span>
              <span className="line2"></span>
              <span className="line3"></span>
            </div>
        </div>
    </div>
  )
}
