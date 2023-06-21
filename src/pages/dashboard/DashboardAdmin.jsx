import './dashboard.css'
import { Link } from "react-router-dom";


export default function Home() {

  return (
    <div className="dashboardPage">
      <h1>Welcome back</h1>

      <div className="update">
        <div className='left'>
          <h2>We make coc exams easier</h2>
          <p>Lemalef coc is the first digital platform founded by ananas Digital to offer Level 3
             and Level 4 accounting TVET course questions. it's time to prepare for your next coc exam now.
             isn't it?</p>
          <Link className='examLink' to="/exams">Exams</Link>
          <Link to="/trainings">Trainings</Link>
        </div>

        <div className="right">
          <img src="assets/contactus.svg" alt="" />
        </div>
      </div>

      <div className="activity">
        <h3>Activity</h3>
          <div className="container">
            <span className='box'>
              <i className="fa-regular fa-rectangle-list"></i>
              <div>
                <p>Level</p>
                <h3>3</h3>
              </div>
            </span>

            <span className='box'>
              <i className="fa-regular fa-rectangle-list"></i>
              <div>
                <p>Taken Trainings</p>
                <h3>3</h3>
              </div>
            </span>

            <span className='box'>
              <i className="fa-regular fa-rectangle-list"></i>
              <div>
                <p>Taken Exams</p>
                <h3>2</h3>
              </div>
            </span>

            {/* <span className='box'>
              <i className="fa-regular fa-rectangle-list"></i>
              <div>
                <p>Regstration Date</p>
                <h3>12/32/12</h3>
              </div>
            </span> */}
          </div>
        
      </div>
    </div>
  )
}