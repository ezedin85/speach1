import { Link } from 'react-router-dom'
import './noMatch.css'

export default function NoMatch() {
  return (
    <div className='noMatchPage'>
        <h1>Page Not Found</h1>
        <Link to='/'>Go back to home page</Link>
    </div>
  )
}
