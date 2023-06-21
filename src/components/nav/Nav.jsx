import {useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './nav.css'


export default function Nav() {
  //show links when device width is below 960px
  const [showLinks, setShowLinks] = useState(false)

  useEffect(() => {
    document.body.style.overflow = showLinks ? 'hidden': 'visible'
  }, [showLinks])
  

  return (
    <div style={showLinks? {position: "fixed"} : {}} className='navPage' >
        <div className="container">
            <NavLink className='logo' onClick={()=>{setShowLinks(false)}} to='/' >
              <img src="assets/logo.png" alt="" />
              <span>Lemalef Exams</span>
            </NavLink>
            <div style={showLinks? {transition: ".4s"} : {}} className={showLinks? 'showLinks navLinks': 'navLinks'}>
              
                <NavLink onClick={()=>{setShowLinks(false)}}
                  className={({ isActive }) =>isActive ? "active" : ""}
                  to='/packages' >Packages</NavLink>
                <NavLink onClick={()=>{setShowLinks(false)}}
                  className={({ isActive }) =>isActive ? "active" : ""}
                  to='/login' >Login</NavLink>
                <NavLink onClick={()=>{setShowLinks(false)}}
                  className={({ isActive }) =>isActive ? "active" : ""}
                  to='/help' >Help</NavLink>
                <NavLink onClick={()=>{setShowLinks(false)}}
                  className={({ isActive }) =>isActive ? "active" : ""}
                  to='/contact' >Contact us</NavLink>

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
