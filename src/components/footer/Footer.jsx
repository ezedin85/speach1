import './footer.css'
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footerComp">
        <div className="container">
            <div>
                <Link to="/"><img className='logo' src="assets/logo.png" alt="" /></Link>
                <Link to="">Lemalef COC Exams</Link>
            </div>

            <div>
                <h3>Quick Links</h3>
                <Link to="/help"> - Help</Link>
                <Link to="/packages"> - Lemalef Packages</Link>
                <Link to="/signup"> - Signup</Link>
                <Link to="/login"> - Login</Link>
            </div>

            <div>
                <h3>Contact</h3>
                <Link to="https://t.me/lemalef_group">- Telegram Group</Link>
                <Link to="https://t.me/lemalef">- Telegram Channel</Link>
                <Link to="https://t.me/lemalef_admin">- Telegram Admin</Link>
            </div>
            
            <div>
                <h3>About Lemlef</h3>
                <p>Lemalef is an online platform founded by <Link to="">ananas Digital</Link> to offer trainings and exams for COC exam examinees .</p>
            </div>
        </div>

        <div className="info">
            © 1444 Copyright. All right reserved. <Link to="">ananas Digital.</Link>
        </div>
    </div>
  )
}
