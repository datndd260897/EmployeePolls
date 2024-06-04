import { RECIEVE_DATA, SAVE_ANSWER, SAVE_QUESTION } from '../actions/shared';

export default function users(state = {}, action) {
  switch (action.type) {
    case RECIEVE_DATA:
      return action.users;
    case SAVE_ANSWER:
      return {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          answers: {
            ...state[action.userId].answers,
            [action.questionId]: action.answer,
          },
        },
      };
    case SAVE_QUESTION:
      return {
        ...state,
        [action.question.author]: {
          ...state[action.question.author],
          questions: [
            ...state[action.question.author].questions,
            action.question.id,
          ],
        },
      };
    default:
      return state;
  }
}
