import { useEffect, useState } from 'react'
import './showData.css'
import useAdminAuthContext from '../../hook/useAdminAuthContext'
import { Loading3 } from '../../components/loading/loading'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { BACKEND_URL } from '../../config/config'

export default function Questions() {
    const [questions, setQuestions] = useState()
    const [error, setError] = useState(null)
    const [deleteModal, setDeleteModal] = useState({show: false, id: null})
    const {admin} = useAdminAuthContext()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const level = searchParams.get('level')
    let page = searchParams.get('page') || 1

    useEffect(() => {
      const getData = async ()=>{
        let query = level ? `${BACKEND_URL}api/question/all?level=${level}&page=${page}` : `${BACKEND_URL}api/question/all?page=${page}`
        const response = await fetch(query,{
            headers: {"authorization": `Bearer ${admin.token}`}
        })
        const json = await response.json()
        if(response.ok){
            setQuestions(json)
        }
      }
      getData()
    }, [admin.token, level, page])

    //sets the level search parameter
    const setLevel = level =>{
        setQuestions(null)
        if(!level)setSearchParams()
        else setSearchParams({level : level})
    }

    const changePage = side =>{
        setQuestions(null);
        setSearchParams(prev=>{
            return {
                // ...prev,
                level: prev.get('level') && '',
                page: side === "next"? parseInt(page)+1 : parseInt(page)-1
            }
        })
    }

    async function deleteItem() {
        const response = await fetch(`${BACKEND_URL}api/question/${deleteModal.id}`,{
            method: 'DELETE',
            headers: {"authorization": `Bearer ${admin.token}`}
        })
        const json = await response.json()
        if(response.ok){
            const newAdmins = questions.filter(question=>question._id !== deleteModal.id)
            setQuestions(newAdmins)
        }else{
            setError(json.error)
        }
        setDeleteModal({show: false, id: null})
    }
    
  return (
    <div className='showDataPage'>
        <h1>Questions</h1>
        <div className="options">
            <div>
                <button className='btn filterBtn' onClick={()=>setLevel(3)}>Level 3</button>
                <button className='btn filterBtn' onClick={()=>setLevel(4)}>Level 4</button>
                <button className='btn filterBtn' onClick={()=>setLevel()}>reset</button>
            </div>
            <div className="page">
                <button
                    disabled = {parseInt(page) <= 1}
                    onClick={()=>{changePage("prev")}}
                    className='btn pageBtn' >Prev</button>
                <button
                    onClick={()=>{changePage("next")}}
                    className='btn pageBtn' >Next</button>
            </div>
        </div>

        {error && <h3 style={{color: "red"}}>{error}</h3>}
        <table className="showDataTable">
            <tr>
                <th>Question</th>
                <th>Answer</th>
                <th>Option 1</th>
                <th>option 2</th>
                <th>option 3</th>
                <th>option 4</th>
                <th>Level</th>
                <th>Actions</th>
            </tr>
            {
                !questions ? <Loading3/>:
                questions.map(question=>{
                    return (<tr key={question._id}>
                                <td>{question.question}</td>
                                <td>{question.answer}</td>
                                <td>{question.opt1}</td>
                                <td>{question.opt2}</td>
                                <td>{question.opt3}</td>
                                <td>{question.opt4}</td>
                                <td>{question.level}</td>
                                <td>
                                    <button
                                        onClick={()=>{navigate(`/admin/questions/${question._id}`)}}
                                        className='btn updateBtn'>Update</button>
                                    <button
                                        onClick={()=>setDeleteModal({show: true, id: question._id})}
                                        className='btn deleteBtn'>Delete</button>
                                </td>
                            </tr>)
                })
            }
        </table>

        <div style={{display: deleteModal.show? 'block' : 'none'}} className="deleteModal">
            <div className="delPopup">
                <h3>Are you sure you want to delete this Admin?</h3>
                <div>
                    <button
                        onClick={()=>setDeleteModal({show: false, id: null})}
                        className="cancelBtn">Cancel</button>
                    <button
                        onClick={()=>deleteItem()}
                        className="trashBtn">Delete</button>
                </div>
            </div>
        </div>
    </div>
  )
}