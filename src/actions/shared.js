import { _getQuestions, _getUsers, _saveQuestionAnswer, _saveQuestion } from "../_DATA"

export const RECIEVE_DATA = "RECIEVE_DATA"
export const SAVE_ANSWER = "SAVE_ANSWER"
export const SAVE_QUESTION = "SAVE_QUESTIONS"

function receiveData(questions, users) {
    return {
        type: RECIEVE_DATA,
        questions,
        users,
    }
}

function saveAnswer(authedUser, qid, answer) {
    return {
        type: SAVE_ANSWER,
        userId: authedUser,
        questionId: qid,
        answer: answer,
    }
}

function saveQuestion(question) {
    return {
        type: SAVE_QUESTION,
        question
    }
}

export function handleRecieveData() {
    return (dispatch) => {
        Promise.all([_getQuestions(), _getUsers()]).then(
            ([questions, users]) => {
                dispatch(receiveData(questions, users))
            }
        )
    }
}

export function handleSaveAnswer(authedUser, qid, answer) {
    return (dispatch) => {
        _saveQuestionAnswer({authedUser, qid, answer}).then(() => dispatch(saveAnswer(authedUser, qid, answer)))
    }
}

export function handleSaveQuestion(question) {
    return (dispatch) => {
        _saveQuestion(question)
        .then((formattedQuestion) => dispatch(saveQuestion(formattedQuestion)))
    }
}