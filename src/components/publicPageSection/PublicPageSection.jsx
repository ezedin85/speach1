import { useEffect, useState } from 'react'
import './publicPageSection.css'
import { BACKEND_URL } from '../../config/config'

export default function PublicPageSection() {

    const [publicData, setPublicData] = useState({})

    useEffect(() => {
      const getData = async ()=>{
        const response = await fetch(`${BACKEND_URL}api/user/publicInfo`)
        const json = await response.json()
        setPublicData(json)
      }
      getData()
    }, [])
    

  return (
    <div className='PublicPageSectionComp'>
        <div className="boxes">
            <div className="container">
                <div className="box">
                    {publicData.allStudents && <h1>{publicData.allStudents - publicData.allStudents % 10}+</h1>}
                    <h2>Students</h2>
                </div>
                <div className="box">
                    {publicData.total_exams && <h1>{publicData.total_exams - publicData.total_exams % 10}+</h1>}
                    <h2>Taken exams</h2>
                </div>
                <div className="box">
                    {publicData.total_trainings && <h1>{publicData.total_trainings - publicData.total_trainings % 10}+</h1>}
                    <h2>Taken trainings</h2>
                </div>
                {/* <div className="box">
                    {publicData.level3Students && <h1>{publicData.level3Students - publicData.level3Students % 10}+</h1>}
                    <h2>level 3 Students</h2>
                </div>
                <div className="box">
                    {publicData.level4Students && <h1>{publicData.level4Students - publicData.level4Students % 10}+</h1>}
                    <h2>level 4 Students</h2>
                </div> */}
            </div>
        </div>

        <div className="whoWeAre">
            <div className="container">
                <div className="left">
                    <img className='logo' src="assets/ananas.png" alt="" />
                </div>
                <div className="right">
                    <h3 style={{color: "grey"}} >Who we are</h3>
                    {/* <h2>We make coc exams easier and we prepare you for your next coc exam date.</h2> */}
                    {/* <p> Lemalef coc is the first digital platform founded by Hananas Digital to offer Level 3 and
                        Level 4 accounting TVET course questions. Since coc examinations are a very common assessment
                        and evaluation tool in colleges, our training and exam strategies can help you to be prepared
                        for  your next exam.
                    </p> */}
                    <h2>We make client-centric web solution services in a proactive manner.</h2>
                    <p>
                    ananas Digital is a web and system development company in Ethiopia. Our mission is to maintain the 
                    high quality of service to our clients and customers by pursuing business through innovation and
                    advanced technology.
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}
