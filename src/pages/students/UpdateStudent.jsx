import { useEffect, useState } from 'react'
import useAdminAuthContext from '../../hook/useAdminAuthContext'
import { useParams } from 'react-router-dom'
import { Loading3 } from '../../components/loading/loading'
import { BACKEND_URL } from '../../config/config'


export default function UpdateStudent() {
    const {admin} = useAdminAuthContext()
    const [student, setStudent] = useState()
    const {id} = useParams()
    useEffect(() => {
      const getData = async ()=>{
        const response = await fetch(`${BACKEND_URL}/api/user/${id}`,{
            headers: {"authorization": `Bearer ${admin.token}`}
        })
        const json = await response.json()
        if(response.ok){
            setStudent(json)
        }else{
            console.log(json.error);
        }
      }
      getData()
    }, [admin.token, id])
    
    const handleChange = async e =>{
        setStudent(prev=>{
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }


  return (
    <div className='updateDataPage'>
        {
        !student ? <Loading3/>:
            <form method='POST' class="form">
                <p class="title">Update Student </p>
                <div class="flex">
                    <label>
                        <input
                            value={student.fullName}
                            onChange={e=>{handleChange(e)}}
                            name='fullName'
                            type="text"
                            class="input"
                            required
                        />
                        <span>Full Name</span>
                    </label>

                    <label>
                        <input
                            value={student.contact}
                            onChange={e=>{handleChange(e)}}
                            name='contact'
                            type="tel"
                            class="input"
                            required
                        />
                        <span>Contact</span>
                    </label>
                </div>  
                    
                <label>
                        <input
                            value={student.level}
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
                        value={student.email}
                        onChange={e=>{handleChange(e)}}
                        name='email'
                        type="email"
                        class="input"
                        required
                    />
                    <span>Email</span>
                </label>

                <label>
                    <input
                        value={student.taken_exams}
                        onChange={e=>{handleChange(e)}}
                        name='taken_exams'
                        type="number"
                        class="input"
                        required
                    />
                    <span>Taken Exams</span>
                </label>

                <label>
                    <input
                        value={student.taken_trainings}
                        onChange={e=>{handleChange(e)}}
                        name='taken_trainings'
                        type="number"
                        class="input"
                        required
                    />
                    <span>Taken Trainings</span>
                </label>
                
                <button class="submit">Submit</button>
            </form>
        }
    </div>
  )
}

