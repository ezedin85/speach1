import { useEffect, useState } from 'react'
import useAdminAuthContext from '../../hook/useAdminAuthContext'
import { Loading3 } from '../../components/loading/loading'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { BACKEND_URL } from '../../config/config'

export default function Students() {
    const [deleteModal, setDeleteModal] = useState({show: false, id: null})
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [students, setStudents] = useState()
    const {admin} = useAdminAuthContext()
    const [searchParams, setSearchParams] = useSearchParams()
    let page = searchParams.get('page') || 1
    useEffect(() => {
        const getData = async ()=>{
            const response = await fetch(`${BACKEND_URL}api/user?page=${page}`, {
                headers: {"authorization": `Bearer ${admin.token}`}
            })
            const json = await response.json()
        if(response.ok){
            setStudents(json)
        }
      }
      getData()
    }, [admin.token, page])

    const changePage = side =>{
        setStudents(null);
        setSearchParams({page: side === "next"? parseInt(page)+1 : parseInt(page)-1})
    }

    async function deleteItem() {
        const response = await fetch(`${BACKEND_URL}/api/user/${deleteModal.id}`,{
            method: 'DELETE',
            headers: {"authorization": `Bearer ${admin.token}`}
        })
        const json = await response.json()
        if(response.ok){
            const newStudents = students.filter(student=>student._id !== deleteModal.id)
            setStudents(newStudents)
        }else{
            setError(json.error)
        }
        setDeleteModal({show: false, id: null})
    }
    
  return (
    <div className='showDataPage'>
        <h1>Students</h1>
        <div className="options">
            <div>
                <button className='btn filterBtn' >Level 3</button>
                <button className='btn filterBtn' >Level 4</button>
                <button className='btn filterBtn' >reset</button>
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
                <th>Full Name</th>
                <th>Contact</th>
                <th>Level</th>
                <th>Reg. Date</th>
                <th>Email</th>
                <th>Taken Exams</th>
                <th>Taken Trainings</th>
                <th>Actions</th>
            </tr>
            {
                !students ? <Loading3/>:
                students.map(student=>{
                    return (<tr key={student._id}>
                                <td>{student.fullName}</td>
                                <td>{student.contact}</td>
                                <td>{student.level}</td>
                                <td>{student.createdAt}</td>
                                <td>{student.email}</td>
                                <td>{student.taken_exams}</td>
                                <td>{student.taken_trainings}</td>
                                <td>
                                    <button
                                        onClick={()=>{navigate(`/admin/students/${student._id}`)}}
                                        className='btn updateBtn'>Update</button>
                                    <button
                                        onClick={()=>setDeleteModal({show: true, id: student._id})}
                                        className='btn deleteBtn'>Delete</button>
                                </td>
                            </tr>)
                })
            }
        </table>

        <div style={{display: deleteModal.show? 'block' : 'none'}} className="deleteModal">
            <div className="delPopup">
                <h3>Are you sure you want to delete this Message?</h3>
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
