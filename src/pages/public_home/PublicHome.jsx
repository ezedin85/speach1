import { Link } from 'react-router-dom'
import './publicHome.css'
import ContactForm from '../../components/form/ContactForm'
import Footer from '../../components/footer/Footer'
import PublicPageSection from '../../components/publicPageSection/PublicPageSection'

export default function PublicHome() {
  return (
    <div className="PublicHomePage">      
        <div className="main_view">
            <div className="container">
                <div className="left_main">
                    <h1> <span>Lemalef</span> Exams</h1>
                    {/* <p id="promo">ወደ ምዘና ከመሄድዎ በፊት በእጅዎ ባለው ሞባይል ፣ ታብሌት ወይም ኮምፒውተር በመጠቀም የሲኦሲ (COC) ጥያቄዎችን ደጋግመው ይሞክሩ</p> */}
                    <p id="promo">
                    The first digital platform founded by <Link to="">ananas Digital</Link> to offer trainings and exams that will help you pass the Certificate of Competency (coc) exam.
                    </p>
                    <div className="landingLinks">
                        <Link to="/packages">Register now</Link>
                        <Link to="/login">Log in</Link>
                    </div>
                </div>

                <div className="right_main">
                    <img src="assets/home.png" alt=""/>
                </div>    
            </div>
        </div>
        <PublicPageSection/>
        <ContactForm/>
        <Footer/>
    </div>
  )
}