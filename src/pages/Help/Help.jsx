import { useState } from 'react'
import { helpData } from './helpData'
import './help.css'

export default function Help() {

  const [show, setShow] = useState([false])
  const toggleAnswer=(index)=>{
    const newArray = show
    newArray[index] = !show[index]
    setShow([...newArray])
  }

  return (
    <div className='helpPage'>
        <div className="container">
          <h1>Frequently asked questions</h1>

        {
          helpData.map(data=>{
            return (
              <div key={data.id} className="questionContainer">
                <p onClick={()=>toggleAnswer(data.id)} className="question">
                  <span>{data.question}</span> 
                  <i className={`fa-solid ${show[data.id]? 'fa-minus' : 'fa-plus'}`}></i>
                </p>
                <p style={
                  show[data.id]? {maxHeight: '200px'}
                                :{maxHeight: '0'}

                  } className='answer'><span>{data.answer}</span></p>
              </div>
            )
          })
        }
        </div>
    </div>
  )
}
