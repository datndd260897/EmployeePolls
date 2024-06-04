import { Link } from 'react-router-dom'
import '../style/Question.css'

const Question = ({ user, question }) => {
  return (
    <Link to={`/questions/${question.id}`} className="question-link">
      <div className="question">
        <img src={user.avatarURL} alt="User Avatar" className="avatar" />
        <div className="text-container">
          <div className="line1">
            <p>
              Would you rather <span>{question.optionOne.text}</span> or{' '}
              <span>{question.optionTwo.text}</span>?
            </p>
          </div>
          <div className="line2">
            <p>
              <span className="author-name">{user.name}</span>
              <span>
                {` created on ${new Date(question.timestamp).toUTCString()}`}
              </span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Question
