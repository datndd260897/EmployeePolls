import { Navigate, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'

const ProtectedRoute = (prop) => {
  let location = useLocation()
  return prop.authedUser.id ? (
    prop.children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  )
}

export default connect((state) => ({
  authedUser: state.authedUser,
}))(ProtectedRoute)
