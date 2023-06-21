import './packages.css'
import {Link} from 'react-router-dom'

export default function Packages() {
  return (
    <div className="packagesPage">
        <h1 className='title'>Accounting coc exam question packages</h1>
            <div className="container">
                <div className="pack">
                    <h1>Level 3</h1>
                    <div className="detail">
                        <div><i className="fa-solid fa-check"></i>Unlimited choose training<p className="amh">ያልተገደበ የምርጫ ጥያቄ ልምምድ </p></div>
                        <div><i className="fa-solid fa-check"></i>Unlimited choose exam<p className="amh">ያልተገደበ የምርጫ ጥያቄ ፈተና</p></div>
                        <div><i className="fa-solid fa-check"></i>Instant Answer checking<p className="amh">ፈጣን የመልስ ማረጋገጫ</p></div>
                        <a className="plan_detail" href="https://t.me/lemalef_admin">Full detail/ሙሉ መረጃ</a>
                        <Link className="reg" to="/signup?level=3"><i className="fa-regular fa-address-card"></i> Register</Link>                        
                    </div>
                    <div className="forHover"></div>
                </div>


                <div className="pack">
                    <h1>Level 4</h1>
                    <div className="detail">
                        <div><i className="fa-solid fa-check"></i>Unlimited Choose training<p className="amh">ያልተገደበ የምርጫ ጥያቄ ልምምድ </p></div>
                        <div><i className="fa-solid fa-check"></i>Unlimited Choose Exam<p className="amh">ያልተገደበ የምርጫ ጥያቄ ፈተና</p></div>
                        <div><i className="fa-solid fa-check"></i>Instant Answer checking<p className="amh">ፈጣን የመልስ ማረጋገጫ</p></div>
                        <a className="plan_detail" href="https://t.me/lemalef_admin">Full detail/ሙሉ መረጃ</a>
                        <Link className="reg" to="/signup?level=4"><i className="fa-regular fa-address-card"></i> Register</Link>
                    </div>
                    <div className="forHover"></div>
                </div>

            </div>
        </div>
  )
}
