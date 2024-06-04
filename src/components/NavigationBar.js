import { Link } from 'react-router-dom'
import '../style/NavigationBar.css'

const NavigationBar = () => {
  return (
    <nav className="navigation-bar">
      <div className="nav-title">Employee Polls</div>
      <ul>
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <li>
          <Link to={'/leaderboard'}>Leaderboard</Link>
        </li>
        <li>
          <Link to={'/add'}>New question</Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavigationBar
