import { Link, useOutletContext } from "react-router-dom";
import { Loading3 } from "../../components/loading/loading";

export default function Trainings() {
    const me = useOutletContext()
  return (
    <div className='examsPage trainingsPage'>
        {me.level === undefined ? <Loading3/> :
            <div className="container">
                <div className="box">
                    <h1>Package 1</h1>
                    <h3>ከጥያቄ ቁጥር 1-36</h3>
                    <Link to={`/training?level=${me.level}&pack=0`}>Take The Training</Link>
                </div>
                <div className="box">
                    <h1>Package 2</h1>
                    <h3>ከጥያቄ ቁጥር 37-72</h3>
                    <Link to={`/training?level=${me.level}&pack=1`}>Take The Training</Link>
                </div>
                <div className="box">
                    <h1>Package <span>3</span></h1>
                    <h3>ከጥያቄ ቁጥር 73-108</h3>
                    <Link to={`/training?level=${me.level}&pack=2`}>Take The Training</Link>
                </div>
                <div className="box">
                    <h1>Package 4</h1>
                    <h3>ከጥያቄ ቁጥር 109-145</h3>
                    <Link to={`/training?level=${me.level}&pack=3`}>Take The Training</Link>
                </div>
                <div className="box">
                    <h1>Package 5</h1>
                    <h3>ከጥያቄ ቁጥር 146-</h3>
                    <Link to={`/training?level=${me.level}&pack=4`}>Take The Training</Link>
                </div>
            </div>
        }
    </div>
  )
}
