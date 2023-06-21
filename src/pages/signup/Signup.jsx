import useUserAuthContext from '../../hook/useUserAuthContext'
import {signup} from '../../hook/utils'
import './signup.css'
import {Form, Link, useActionData, useNavigate, useNavigation} from 'react-router-dom'

export async function action({request}) {
    //taking the level from the searchparms from the URL
    const level = new URL(request.url).searchParams.get('level')

    const formData = await request.formData()

    const contact = formData.get("contact")
    const password = formData.get("password")
    const confirmPwd = formData.get("confirmPwd")
    const fullName = formData.get("fullName")
    const email = formData.get("email")
    const rememberMe = formData.get("rememberMe")
    
    const json = await signup(contact, password, confirmPwd, fullName, email, rememberMe, level)
    //if there is an error return it
    if(json.error){ 
        return json
    }
    // otherwise redirect them to the home page
    return { ok: true, json };
    
}

export default function Signup() {
    
    const navigation = useNavigation()
    const {setUser} = useUserAuthContext()
    const navigate = useNavigate()
    const actiondata = useActionData()
    let error = null, emptyFields=[]
    
    if(actiondata){
        if(actiondata.ok){ //if signup is successful, update the userAuthContext
            setUser(actiondata.json)
            localStorage.setItem('lemalef_user', JSON.stringify(actiondata.json))
            navigate('/home')
        }else{
            emptyFields = actiondata.emptyFields || []
            error = actiondata.error
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
                <img src="assets/signup.png" alt="" />
            </div>

            <div className="right">

                <Form method='POST'>

                    <h1>Sign up</h1>

                    <div className="inputBox"> 
                        <input type="text" name='fullName' style={{borderColor: emptyFields.includes('fullName')? 'red': 'black'}} required />
                        <span>Full Name</span>
                        <i className="fa-solid fa-user"></i>
                   </div>
                    
                    <div className="inputBox">
                        <input type="tel" name="contact" style={{borderColor: emptyFields.includes('contact')? 'red': 'black'}} required />
                        <span>Contact</span>
                        <i className="fa-solid fa-phone"></i>
                    </div>

                    <div className="inputBox">
                        <input type="password" name="password" style={{borderColor: emptyFields.includes('password')? 'red': 'black'}} required/>
                        <span>Password</span>
                        <i className="fa-solid fa-lock"></i>
                    </div>

                    <div className="inputBox">
                        <input type="password" name="confirmPwd" style={{borderColor: emptyFields.includes('confirmPwd')? 'red': 'black'}} required/>
                        <span>Repeat password</span>
                        <i className="fa-solid fa-lock"></i>
                    </div>

                    <div className="inputBox">
                        <input type="email" name="email" placeholder='Email' style={{borderColor: emptyFields.includes('email')? 'red': 'black'}} required/>
                        {/* <span>Email</span> */}
                        <i className="fa-solid fa-envelope"></i>
                    </div>

                    
                    <input style={{display: 'none'}} id="remMe" type="checkbox" name="rememberMe" />
                    <label style={{display: 'none'}} htmlFor='remMe'>remember me</label>

                    <input
                        disabled={navigation.state === 'submitting'}
                        type="submit"
                        value= {navigation.state === 'submitting'? 'Signing up...' : "Sign up"}
                    />
                </Form>
            </div>

            <span className='haveAnAccount'>Already have an account? <Link to="/login">log in here</Link></span>
        </div>
    </div>
  )
}
