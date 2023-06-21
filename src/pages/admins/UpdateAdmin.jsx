import { useEffect, useState } from 'react'
import useAdminAuthContext from '../../hook/useAdminAuthContext'
import { useParams } from 'react-router-dom'
import { Loading3 } from '../../components/loading/loading'
import { BACKEND_URL } from "../../config/config"


export default function UpdateAdmin() {
    const {admin} = useAdminAuthContext()
    const [manager, setManager] = useState()
    const {id} = useParams()
    useEffect(() => {
      const getData = async ()=>{
        const response = await fetch(`${BACKEND_URL}/api/admin/${id}`,{
            headers: {"authorization": `Bearer ${admin.token}`}
        })
        const json = await response.json()
        if(response.ok){
            setManager(json)
        }else{
            console.log(json.error);
        }
      }
      getData()
    }, [admin.token, id])
    
    const handleChange = async e =>{
        setManager(prev=>{
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }


  return (
    <div className='updateDataPage'>
        {
        !manager ? <Loading3/>:
            <form method='POST' class="form">
                <p class="title">Update manager </p>
                    
                <label>
                        <input
                            value={manager.username}
                            onChange={e=>{handleChange(e)}}
                            name='username'
                            type="text"
                            class="input"
                            required
                        />
                        <span>Username</span>
                    </label>
                <label>
                    <input
                        onChange={e=>{handleChange(e)}}
                        name='password'
                        type="password"
                        class="input"
                        required
                    />
                    <span>Prev. Password</span>
                </label>

                <label>
                    <input
                        onChange={e=>{handleChange(e)}}
                        name='newPwd'
                        type="password"
                        class="input"
                        required
                    />
                    <span>New Password</span>
                </label>

                <label>
                    <input
                        onChange={e=>{handleChange(e)}}
                        name='confirmPwd'
                        type="password"
                        class="input"
                        required
                    />
                    <span>Repeat Password</span>
                </label>
                
                <button class="submit">Submit</button>
            </form>
        }
    </div>
  )
}

