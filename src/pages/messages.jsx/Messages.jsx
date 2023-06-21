import { useEffect, useState } from 'react'
import useAdminAuthContext from '../../hook/useAdminAuthContext'
import { Loading3 } from '../../components/loading/loading'
import { BACKEND_URL } from '../../config/config'

export default function Messages() {
    const [deleteModal, setDeleteModal] = useState({show: false, id: null})
    const [error, setError] = useState(null)
    const [messages, setMessages] = useState()
    const {admin} = useAdminAuthContext()
    useEffect(() => {
        const getData = async ()=>{
            const response = await fetch(`${BACKEND_URL}/api/message`, {
                headers: {"authorization": `Bearer ${admin.token}`}
            })
            const json = await response.json()
        if(response.ok){
            setMessages(json)
        }
      }
      getData()
    }, [admin.token])

    async function deleteItem() {
        const response = await fetch(`${BACKEND_URL}/api/message/${deleteModal.id}`,{
            method: 'DELETE',
            headers: {"authorization": `Bearer ${admin.token}`}
        })
        const json = await response.json()
        if(response.ok){
            const newMessages = messages.filter(message=>message._id !== deleteModal.id)
            setMessages(newMessages)
        }else{
            setError(json.error)
        }
        setDeleteModal({show: false, id: null})
    }

  return (
    <div className='showDataPage'>
        <h1>Messages</h1>
        {error && <h2 style={{color: "red"}}>{error}</h2>}
        <table className="showDataTable">
            <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Message</th>
                <th>Actions</th>
            </tr>
            {
                !messages ? <Loading3/>:
                messages.map(message=>{
                    return (<tr key={message._id}>
                                <td>{message.name}</td>
                                <td>{message.contact}</td>
                                <td>{message.message}</td>
                                <td>
                                    <button className='btn updateBtn'>Update</button>
                                    <button
                                        onClick={()=>setDeleteModal({show: true, id: message._id})}
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
