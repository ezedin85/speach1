import { useState } from 'react';
import './profile.css'
import useUserAuthContext from '../../hook/useUserAuthContext';
import { useNavigate, useNavigation, useOutletContext } from 'react-router-dom'
import { BACKEND_URL } from '../../config/config';

export default function Profile() {
    const navigation = useNavigation()
    const me = useOutletContext()
    const navigate = useNavigate()
    const [userData, setUserData] = useState({fullName: me.fullName, contact: me.contact, email: me.email})
    const {user} = useUserAuthContext()


    const handleChange = (e) =>{
        setUserData(prev=>{
            return {
                ...prev,
                [e.target.name] : e.target.value
            }
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const response = await fetch(`${BACKEND_URL}/api/user/me`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `bearer ${user.token}`
            },
            
            body: JSON.stringify({ fullName: userData.fullName, contact: userData.contact, email: userData.email })
        })
    
        const json = await response.json()
        if(response.ok){
            console.log(json);
            navigate(0)
        }else{
            console.log(json);
        }
    }

  return (
    <div className='profilePage'>
        <div className="container">
            {/* showing error if it exists */}
            {/* {error && <span className='errorMessage'> {error}</span>} */}

            <div className="left">
                <img src="assets/profile.png" alt="" />
            </div>

            <div className="right">
                <form onSubmit={e=>{handleSubmit(e)}} method='POST'>
                        <input
                            type="text"
                            name='fullName'
                            value={userData.fullName}
                            onChange={e=>handleChange(e)}
                        />
                        <input
                            type="tel"
                            name="contact"
                            value={userData.contact}
                            onChange={e=>handleChange(e)}
                        />
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={e=>handleChange(e)}
                        />

                    <input
                        disabled={navigation.state === 'submitting'}
                        type="submit"
                        value= {navigation.state === 'submitting'? 'Updating...' : "Update"}
                    />
                </form>
            </div>
        </div>
    </div>
  )
}
