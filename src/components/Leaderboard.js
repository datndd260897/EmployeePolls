import { useMemo } from 'react'
import { connect } from 'react-redux'
import '../style/Leaderboard.css'

const Leaderboard = (prop) => {
  const users = prop.users

  const leaderboard = useMemo(() => {
    const rankedUsers = Object.values(users).reduce(
      (accumulator, currentValue) => {
        const rankedUser = {
          user: currentValue,
          answered: Object.keys(currentValue.answers).length,
          created: currentValue.questions?.length,
        }
        accumulator.push(rankedUser)
        return accumulator
      },
      []
    )
    return rankedUsers.sort(
      (a, b) => b.answered + b.created - (a.answered + a.created)
    )
  }, [users])

  return (
    <div className="leaderboard">
      <h1 className="title">Leaderboard</h1>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Answered</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((rankedUser) => (
            <tr key={rankedUser.user.id}>
              <td>{rankedUser.user.name}</td>
              <td>{rankedUser.answered}</td>
              <td>{rankedUser.created}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default connect((state) => ({
  users: state.users,
}))(Leaderboard)
