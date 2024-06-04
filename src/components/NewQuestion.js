import { useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { handleSaveQuestion } from '../actions/shared'
import '../style/NewQuestion.css'

function NewQuestion(prop) {
  const [option1, setOption1] = useState('')
  const [option2, setOption2] = useState('')
  const navigate = useNavigate()
  const user = prop.authedUser

  const handleSubmit = (e) => {
    e.preventDefault()
    if (option1 && option2) {
      const question = {
        optionOneText: option1,
        optionTwoText: option2,
        author: user.id,
      }
      prop.dispatch(handleSaveQuestion(question))
      navigate('/')
    }
  }

  return (
    <div className="new-poll">
      <h1>Would you rather</h1>
      <p>Create your own poll</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="option1">Option 1:</label>
          <input
            type="text"
            id="option1"
            value={option1}
            onChange={(e) => setOption1(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="option2">Option 2:</label>
          <input
            type="text"
            id="option2"
            value={option2}
            onChange={(e) => setOption2(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="new-question-submit"
          disabled={!option1 || !option2}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default connect((state) => ({
  authedUser: state.authedUser,
}))(NewQuestion)
