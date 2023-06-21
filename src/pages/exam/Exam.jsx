import { useSearchParams } from 'react-router-dom';
import './exam.css'
import { useRef, useState } from 'react';
import useUserAuthContext from '../../hook/useUserAuthContext';
import ShowResult from '../../components/ShowResult';
import { useEffect } from 'react';
import Loading2 from '../../components/loading/loading';
import { BACKEND_URL } from "../../config/config"

// export const loader = async ({request})=>{
//   const search = new URL(request.url).searchParams
//   const level = search.get('level');
//   const pack = search.get('pack');
//   const response = await fetch (`${BACKEND_URL}api/question?pack=${pack}&level=${level}`)
//   const json = await response.json()
//   return json
// }

export default function Exam() {

  const opt1 = useRef('opt1')
  const opt2 = useRef('opt2')
  const opt3 = useRef('opt3')
  const opt4 = useRef('opt4')

  const {user} = useUserAuthContext()
  const [searchParams] = useSearchParams()
  const pack = searchParams.get('pack');
  const level = searchParams.get('level');

  const [questions, setQuestions] = useState(null)
  const [userAnswers, setUserAnswers] = useState([])
  
  const [correct, setCorrect] = useState(0)
  const [questionNo, setQuestionNo] = useState(0)
  const [error, setError] = useState(null)

  const [submitted, setSubmitted] = useState(false)
  const [hideResult, setHideResult] = useState(true)

  const handleAnswer = (e)=>{
    const array = [...userAnswers];
    array[questionNo] = e.target.value
    setUserAnswers(array)
  }

  const nextQuestion=()=>{
    // opt1.current.checked = opt2.current.checked = opt3.current.checked = opt4.current.checked = false
    setQuestionNo(prev=>{
      if(prev===35) return 35
      return prev+1
    })
  }

  const prevQuestion=()=>{
    setQuestionNo(prev=>{
      if(prev===0) return 1
      return prev-1
    })
  }

  async function handleResult() {
    //to disable the confirm button after clicked once
    setSubmitted(true)

    //getting answers
    const response = await fetch(`${BACKEND_URL}api/question/answer?pack=${pack}&level=${level}`,{
      headers: {'authorization': `bearer ${user.token}`}
    })
    const json = await response.json()

    //setting answers to the answers state
    const array = []
    json.forEach(item => {
      array.push(item.answer);
    })
    
    //matching user's answer with the correct answers
    array.forEach((ans, index)=>{
      if(userAnswers[index] === ans){
        setCorrect(prev=>prev+1)
      }
    })

    const response2 = await fetch(`${BACKEND_URL}/api/user/updateexam`,{
      method: 'PATCH',
      headers: {"Content-Type": "application/json",
                "authorization": `Bearer ${user.token}`},
    })
    const json2 = await response2.json()
    console.log(json2);


    setHideResult(false)
  }

  //creating an array of length 36 for filler
  const fillers = Array.from("QWERTYUIOPSDFGHJKLLZXCVBNMqwertyuopa")

  useEffect(() => {
    const getData = async ()=>{
        const response = await fetch (`${BACKEND_URL}api/question?pack=${pack}&level=${level}`,{
            headers: {'authorization': `bearer ${user.token}`}
        })
        const loadedQuestions = await response.json()
        if(response.ok){
            setQuestions(loadedQuestions)
        }
        if(!response.ok){
            setError(loadedQuestions.error)
        }
    }
    getData()
  }, [level, pack, user])

  return (
    <div className="examPage">      
      <div style={{display: hideResult? 'block': 'none'}} className="container">

        <div className="timer">
          <p>{questionNo + 1}/36</p>
          <p>00:59:51</p>
        </div>

        <div className="mode">
          <div>
            <h1>Level {level} - Exam Mode</h1>
            <p>Question</p>
          </div>
          <p>{user.fullName}</p>
        </div>

        {/* showing error if it exists */}
        {error && <h1>{error}</h1>}
        {!questions ? <Loading2/> :
          <div className="question">
            <p className="ques">{questionNo + 1}, {questions[questionNo].question}</p>
            <ul className="options">
              <li>a. <input type="radio" name="option" id="opt1" checked={(userAnswers[questionNo] === 'a')} ref={opt1} value="a" onChange={(e)=>handleAnswer(e)}/><label htmlFor="opt1">{questions[questionNo].opt1}</label></li>
              <li>b. <input type="radio" name="option" id="opt2" checked={(userAnswers[questionNo] === 'b')} ref={opt2} value="b" onChange={(e)=>handleAnswer(e)}/><label htmlFor="opt2">{questions[questionNo].opt2}</label></li>
              <li>c. <input type="radio" name="option" id="opt3" checked={(userAnswers[questionNo] === 'c')} ref={opt3} value="c" onChange={(e)=>handleAnswer(e)}/><label htmlFor="opt3">{questions[questionNo].opt3}</label></li>
              <li>d. <input type="radio" name="option" id="opt4" checked={(userAnswers[questionNo] === 'd')} ref={opt4} value="d" onChange={(e)=>handleAnswer(e)}/><label htmlFor="opt4">{questions[questionNo].opt4}</label></li>
            </ul>
          </div>
        }

        <div className="questionActions">
          <button onClick={()=>{prevQuestion()}}><i className="fa-solid fa-circle-chevron-left"></i> Previous</button>
          <button disabled={submitted} onClick={()=>{handleResult()}}>Confirm()</button>
          <button onClick={()=>{nextQuestion()}}>next <i className="fa-solid fa-circle-chevron-right"></i></button>
        </div>
      </div>

      <div style={{display: hideResult? 'block': 'none'}} className="filler">
            <p>Fillers</p>

            {
              fillers.map((value,index)=>{
                return (
                  <div key={index}>
                    <button className="button1"><i className="fa-solid fa-chevron-right"></i></button>
                    <button className="button2" >+</button>
                    <button className="button2">+</button>
                    <button className="button3">{index+1}.0</button>
                </div>
                )
              })
            }

        </div>

      {/* calling show result component */}
      <ShowResult correct={correct} hideResult={hideResult}/>
    </div>
  )
}
