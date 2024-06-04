import { Link } from 'react-router-dom'
import '../style/NotFoundPage.css'

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link to={'/'}>Go back to the homepage</Link>
    </div>
  )
}

export default NotFoundPage
