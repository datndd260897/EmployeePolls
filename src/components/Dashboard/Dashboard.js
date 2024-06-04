import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ToggleSwitch from '../ToggleSwitch';
import Question from '../Question';

const Dashboard = (prop) => {
  const [toggleAnswered, setToggleAnswered] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const user = prop.users[prop.authedUser.id];

  useEffect(() => {
    const answeredQuestions = [];
    const unAnsweredQuestions = [];
    const questions = prop.questions;
    const answeredQuestionId = Object.keys(user.answers);

    for (const [key, value] of Object.entries(questions)) {
      if (answeredQuestionId.includes(key)) {
        answeredQuestions.push(value);
      } else {
        unAnsweredQuestions.push(value);
      }
    }
    setQuestionList(
      (toggleAnswered ? answeredQuestions : unAnsweredQuestions).sort(
        (a, b) => b.timestamp - a.timestamp
      )
    );
  }, [prop, toggleAnswered, user]);

  return (
    <div className="content-container">
      <div className="toggle-switch-container">
        <ToggleSwitch
          toggleAnswered={toggleAnswered}
          setToggleAnswered={setToggleAnswered}
        />
      </div>
      <div className="list-container">
        <ul>
          {questionList.map((question) => (
            <li key={question.id}>
              <Question
                user={prop.users[question.author]}
                question={question}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default connect((state) => ({
  authedUser: state.authedUser,
  questions: state.questions,
  users: state.users,
}))(Dashboard);
