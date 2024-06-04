import { RECIEVE_DATA, SAVE_ANSWER, SAVE_QUESTION } from '../actions/shared'

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECIEVE_DATA:
      return action.questions
    case SAVE_ANSWER:
      return {
        ...state,
        [action.questionId]: {
          ...state[action.questionId],
          [action.answer]: {
            ...state[action.questionId][action.answer],
            votes: state[action.questionId][action.answer].votes.concat([
              action.userId,
            ]),
          },
        },
      }
    case SAVE_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      }
    default:
      return state
  }
}
