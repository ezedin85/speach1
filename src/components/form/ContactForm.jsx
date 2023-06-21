import { BACKEND_URL } from '../../config/config'
import './contactForm.css'
import { Link, Form, useActionData, useNavigation } from 'react-router-dom'

export const action = async ({request})=>{
    const formData = await request.formData()
    const name = formData.get('name')
    const contact = formData.get('contact')
    const message = formData.get('message')
    const response = await fetch(`${BACKEND_URL}api/message`,{
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name, contact, message})
    })
    // const json = await response.json()
    if(response.ok){
        return `Thank you for your message`
    }else{
        return "couldn't send your message"
    }
}

export default function ContactForm() {

    const actionMessage = useActionData()
    const navigation = useNavigation()


  return (
    <div className= 'contactForm'>
        <h2 className='title'>How can we help?</h2>
        <div className="container">
            <div className="left">
                <Form method='POST'>
                    <label htmlFor="f_name">Your name :</label>
                    <input 
                        name="name"
                        type="text" id="f_name" />
                     <label htmlFor="f_e_p">Your Email or Phone number :</label>
                    <input
                        type="text" 
                        name="contact"
                    id="f_e_p" />

                    <label htmlFor="f_message">Your Message:</label>
                    <textarea name="message" id="f_message" cols="30" rows="5">
                    </textarea>

                    <button disabled={navigation.state === 'submitting'} className='submitBtn'>
                        <div className="svg-wrapper-1">
                            <div className="svg-wrapper">
                            <svg height="24" width="24" viewBox="0 0 24 24" >
                                <path d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
                            </svg>
                            </div>
                        </div>
                        <span>Send</span>
                    </button>
                    {actionMessage && <h3>{actionMessage}</h3>}

                </Form>
            </div>

            <div className="center">
                <img src="assets/contactus.svg" alt="" />
            </div>

            <div className="right">
                <h2>Join us</h2>
                <Link to="https://t.me/lemalef_group">t.me/lemalef_group</Link>
                <Link to="https://t.me/lemalef">t.me/lemalef</Link>  
            </div>
        </div>
    </div>
  )
}