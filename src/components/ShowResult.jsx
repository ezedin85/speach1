import { Link } from "react-router-dom";

export default function ShowResult(props) {

    // const [searchParams] = useSearchParams()
    // const pack = searchParams.get('pack');
    // const level = searchParams.get('level');
    // const navigate = useNavigate();
  return (
    <div style={{display: props.hideResult? 'none': 'flex'}} className="showResult">
        <div className="result">
            {props.correct >= 20? <h2>Congra, you have passed the exam</h2> : <h2>Sorry, You didn't pass the exam.</h2>}
            <table>
                <tbody>
                    <tr>
                    <td>All Questions:</td>
                    <td>36</td>
                    </tr>
                    <tr>
                    <td>Correct answers:</td>
                    <td>{props.correct}</td>
                    </tr>
                    <tr>
                    <td>Wrong answers:</td>
                    <td>{36 - props.correct}</td>
                    </tr>
                    <tr>
                    <td>Result in percentage</td>
                    <td>{(props.correct/36)*100}%</td>
                    </tr>
                </tbody>
            </table>

            <div className="buttons">
                {/* <Link to={`/exam?level=${level}&pack=${pack >= 4? 0 : parseInt(pack)+1}`}>Next 36 Questions</Link>
                <Link to={`/exam?level=${level}&pack=${pack}`}>Take The exam Again</Link> */}
                <Link to="/home">Back to Dashboard</Link>
            </div>
        </div>
    </div>
  )
}
