import { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { handleSaveAnswer } from '../../actions/shared';

const PollDetail = (prop) => {
  const [answer, setAnswer] = useState('');
  const { question_id } = useParams();
  const user = prop.users[prop.authedUser.id];
  const question = prop.questions[question_id];
  const author = prop.users[question?.author];

  const answerSummary = useMemo(() => {
    if (question && answer) {
      const sameAnswerCount = question[answer].votes.length;
      const totalVotes =
        question.optionOne.votes.length + question.optionTwo.votes.length;
      const sameAnswerPercentage = Math.round(
        (sameAnswerCount / totalVotes) * 100
      );
      return (
        <div className="answer-summary">
          <p>
            {`${sameAnswerCount > 1 ? 'There are' : 'There is'} ${sameAnswerCount} (${sameAnswerPercentage}%) ${sameAnswerCount > 1 ? 'users prefer to' : 'user prefers to'} `}
            <span>{question[answer].text}</span>
          </p>
        </div>
      );
    }
  }, [answer, question]);

  useEffect(() => {
    const userAnswer = user.answers[question_id];
    if (userAnswer) {
      setAnswer(userAnswer);
    }
  }, [prop, question_id, user]);

  const handleSelectAnswer = (e) => {
    e.preventDefault();
    if (!answer) {
      prop.dispatch(handleSaveAnswer(user.id, question.id, e.target.value));
    }
  };

  return question ? (
    <div className="question-detail">
      <h1 className="poll-author-name">Poll by {author.name}</h1>
      <img
        src={author.avatarURL}
        alt="User Avatar"
        className="poll-author-avatar"
      />
      <div className="poll-question">
        <p>
          Would you rather <span>{question.optionOne.text}</span> or{' '}
          <span>{question.optionTwo.text}</span>?
        </p>
      </div>
      <div className="button-container">
        <button
          onClick={(e) => handleSelectAnswer(e)}
          className={`button ${answer === 'optionOne' ? 'selected' : ''}`}
          disabled={answer !== ''}
          value="optionOne"
        >
          {question.optionOne.text}
        </button>
        <button
          onClick={(e) => handleSelectAnswer(e)}
          className={`button ${answer === 'optionTwo' ? 'selected' : ''}`}
          disabled={answer !== ''}
          value="optionTwo"
        >
          {question.optionTwo.text}
        </button>
      </div>
      {answerSummary}
    </div>
  ) : (
    <Navigate to="/404" />
  );
};

export default connect((state) => ({
  authedUser: state.authedUser,
  questions: state.questions,
  users: state.users,
}))(PollDetail);
