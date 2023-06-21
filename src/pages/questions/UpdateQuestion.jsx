import { useEffect, useState } from 'react'
import './updateData.css'
import useAdminAuthContext from '../../hook/useAdminAuthContext'
import { useParams } from 'react-router-dom'
import { Loading3 } from '../../components/loading/loading'
import { BACKEND_URL } from '../../config/config'

export default function UpdateQuestion() {
    const {admin} = useAdminAuthContext()
    const [question, setQuestion] = useState()
    const {id} =useParams()
    useEffect(() => {
      const getData = async ()=>{
        const response = await fetch(`${BACKEND_URL}api/question/${id}`,{
            headers: {"authorization": `Bearer ${admin.token}`}
        })
        const json = await response.json()
        if(response.ok){
            setQuestion(json)
        }else{
            console.log(json.error);
        }
      }
      getData()
    }, [admin.token, id])
    
    const handleChange = async e =>{
        setQuestion(prev=>{
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }


  return (
    <div className='updateDataPage'>
        {
        !question ? <Loading3/>:
            <form method='POST' class="form">
                <p class="title">Update Question </p>
                <div class="flex">
                    <label>
                        <input
                            value={question.level}
                            onChange={e=>{handleChange(e)}}
                            name='level'
                            type="number"
                            class="input"
                            required
                        />
                        <span>Level</span>
                    </label>

                    <label>
                        <input
                            value={question.answer}
                            onChange={e=>{handleChange(e)}}
                            name='answer'
                            type="text"
                            class="input"
                            required
                        />
                        <span>Answer</span>
                    </label>
                </div>  
                    
                    
                <label>
                    <input
                        value={question.question}
                        onChange={e=>{handleChange(e)}}
                        name='question'
                        type="text"
                        class="input"
                        required
                    />
                    <span>Question</span>
                </label>

                <label>
                    <input
                        value={question.opt1}
                        onChange={e=>{handleChange(e)}}
                        name='opt1'
                        type="text"
                        class="input"
                        required
                    />
                    <span>Option 1</span>
                </label>

                <label>
                    <input
                        value={question.opt2}
                        onChange={e=>{handleChange(e)}}
                        name='opt2'
                        type="text"
                        class="input"
                        required
                    />
                    <span>Option 2</span>
                </label>

                <label>
                    <input
                        value={question.opt3}
                        onChange={e=>{handleChange(e)}}
                        name='opt3'
                        type="text"
                        class="input"
                        required
                    />
                    <span>Option 3</span>
                </label>

                <label>
                    <input
                        value={question.opt4}
                        onChange={e=>{handleChange(e)}}
                        name='opt4'
                        type="text"
                        class="input"
                        required
                    />
                    <span>Option 4</span>
                </label> 
                
                <button class="submit">Submit</button>
            </form>
        }
    </div>
  )
}

