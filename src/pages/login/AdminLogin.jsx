import {Form, useActionData, useNavigate, useNavigation} from 'react-router-dom'
import { adminLogin } from '../../hook/utils'
import useAdminAuthContext from '../../hook/useAdminAuthContext'


export const action = async({request})=>{
  const formData = await request.formData()
  const username = formData.get('username')
  const password = formData.get('password')
  const json = await adminLogin(username, password)
  if(json.error){
    return json.error
  }
  return {ok: true, json }
}

export default function AdminLogin() {

  const navigation = useNavigation()
  const actionData = useActionData()
  const {setAdmin} = useAdminAuthContext()
  const navigate = useNavigate()
  let error 
  if(actionData){
    if(actionData.ok){
        setAdmin(actionData.json)
        localStorage.setItem('lemalef_admin', JSON.stringify(actionData.json))
        navigate('/admin')
    }else{
      error = actionData
    }
  }

  return (
    <div className='signupAndLoginPage'>

        <div onClick={()=>{navigate('/')}} className='goBack'>
            <img src="assets/logo.png" alt="" />
            <span>Lemalef Exams</span>
        </div>

        <div className="container">
            {/* showing error if it exists */}
            {error && <span className='errorMessage'> {error}</span>}

            <div className="left">
                <img src="assets/login2.png" alt="" />
            </div>

            <div className="right">
                <Form method='POST'>

                    <h1>log in</h1>
                    <h2 style={{color: 'gray'}}>Welcome back</h2>

                    <div className="inputBox">
                        <input type="text" name="username" required />
                        <span>username</span>
                        <i className="fa-solid fa-phone"></i>
                    </div>

                    <div className="inputBox">
                        <input type="password" name="password" required/>
                        <span>Password</span>
                        <i className="fa-solid fa-lock"></i>
                    </div>

                    <input style={{display: 'none'}} id="remMe" type="checkbox" name="rememberMe" />
                    <label style={{display: 'none'}} htmlFor='remMe'>remember me</label>

                    <input
                      disabled={navigation.state === 'submitting'}
                      type="submit"
                      value= {navigation.state === 'submitting'? 'logging in...' : "log in"}
                    />
                </Form>
            </div>
        </div>
    </div>
  )
}
