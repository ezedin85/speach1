import { useEffect, useState } from 'react'
import useAdminAuthContext from '../../hook/useAdminAuthContext'
import { Loading3 } from '../../components/loading/loading'
import { useNavigate } from 'react-router-dom'
import { BACKEND_URL } from "../../config/config"


export default function Admins() {
    const [deleteModal, setDeleteModal] = useState({show: false, id: null})
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [admins, setAdmins] = useState()
    const {admin} = useAdminAuthContext()
    useEffect(() => {
        const getData = async ()=>{
          const response = await fetch(`${BACKEND_URL}/api/admin`,{
              headers: {"authorization": `Bearer ${admin.token}`}
          })
          const json = await response.json()
          if(response.ok){
            setAdmins(json)
          }
        }
        getData()
      }, [admin.token])

      async function deleteItem() {
        const response = await fetch(`${BACKEND_URL}/api/admin/${deleteModal.id}`,{
            method: 'DELETE',
            headers: {"authorization": `Bearer ${admin.token}`}
        })
        const json = await response.json()
        if(response.ok){
            const newAdmins = admins.filter(admin=>admin._id !== deleteModal.id)
            setAdmins(newAdmins)
        }else{
            setError(json.error)
        }
        setDeleteModal({show: false, id: null})
    }

  return (
    <div className='showDataPage'>
        <h1>Admins</h1>

        {error && <h3 style={{color: "red"}}>{error}</h3>}
        <table className="showDataTable">
            <tr>
                <th>Username</th>
                <th>Reg. Date</th>
                <th>Actions</th>
            </tr>
            {
                !admins ? <Loading3/>:
                admins.map(admin=>{
                    return (<tr key={admin._id}>
                                <td>{admin.username}</td>
                                <td>{admin.createdAt}</td>
                                <td>
                                    <button
                                        onClick={()=>{navigate(`/admin/adminS/${admin._id}`)}}
                                        className='btn updateBtn'>Update</button>
                                    <button 
                                        onClick={()=>setDeleteModal({show: true, id: admin._id})}
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
