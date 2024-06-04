import {
  _saveQuestion,
  _saveQuestionAnswer,
  _getUsers,
  _getQuestions,
} from '../_DATA'

const saveQuestionRejectMsg = 'Please provide optionOneText, optionTwoText, and author'
const saveAnswerRejectMsg = 'Please provide authedUser, qid, and answer'

describe('_saveQuestion', () => {
  it('should save the question and return formatted question', async () => {
    const question = {
      optionOneText: 'Option 1',
      optionTwoText: 'Option 2',
      author: 'foo',
    }

    const formattedQuestion = await _saveQuestion(question)

    expect(formattedQuestion.optionOne.text).toBe(question.optionOneText)
    expect(formattedQuestion.optionTwo.text).toBe(question.optionTwoText)
    expect(formattedQuestion.author).toBe(question.author)
  })

  it('should reject if missing optionOneText', async () => {
    const question = {
      optionTwoText: 'Option 2',
      author: 'foo',
    }

    await expect(_saveQuestion(question)).rejects.toEqual(
      saveQuestionRejectMsg
    )
  })

  it('should reject if missing optionTwoText', async () => {
    const question = {
      optionOneText: 'Option 1',
      author: 'foo',
    }

    await expect(_saveQuestion(question)).rejects.toEqual(
      saveQuestionRejectMsg
    )
  })

  it('should reject if missing author', async () => {
    const question = {
      optionOneText: 'Option 1',
      optionTwoText: 'Option 2',
    }

    await expect(_saveQuestion(question)).rejects.toEqual(
      saveQuestionRejectMsg
    )
  })
})

describe('_saveQuestionAnswer', () => {
  it('should save the question and answer to the user, and update userId to question votes', async () => {
    const answerInfo = {
      authedUser: 'sarahedo',
      qid: '8xf0y6ziyjabvozdd253nd',
      answer: 'optionTwo',
    }

    await _saveQuestionAnswer(answerInfo)

    const users = await _getUsers()
    const questions = await _getQuestions()

    expect(users[answerInfo.authedUser].answers[answerInfo.qid]).toBe(
      answerInfo.answer
    )
    expect(questions[answerInfo.qid][answerInfo.answer].votes).toContain(
      answerInfo.authedUser
    )
  })

  it('should reject if missing authedUser', async () => {
    const answerInfo = {}
    await expect(_saveQuestionAnswer(answerInfo)).rejects.toEqual(
      saveAnswerRejectMsg
    )
  })

  it('should reject if missing qid', async () => {
    const answerInfo = {
      authedUser: 'sarahedo',
      answer: 'optionTwo',
    }

    await expect(_saveQuestionAnswer(answerInfo)).rejects.toEqual(
      saveAnswerRejectMsg
    )
  })

  it('should reject if missing answer', async () => {
    const answerInfo = {
      authedUser: 'sarahedo',
      qid: '8xf0y6ziyjabvozdd253nd',
    }

    await expect(_saveQuestionAnswer(answerInfo)).rejects.toEqual(
      saveAnswerRejectMsg
    )
  })
})
