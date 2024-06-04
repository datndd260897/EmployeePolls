import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleRecieveData } from '../actions/shared'
import Login from './Login'
import BasicLayout from './BasicLayout'
import ProtectedRoute from './ProtectedRoute'
import HomePage from './HomePage'
import NotFoundPage from './NotFoundPage'
import QuestionDetail from './QuestionDetail'
import Leaderboard from './Leaderboard'
import NewQuestion from './NewQuestion'

const App = (prop) => {
  useEffect(() => {
    prop.dispatch(handleRecieveData())
  }, [prop])

  return (
    <Routes>
      <Route path="/" element={<BasicLayout />}>
        <Route path="*" element={<NotFoundPage />} />
        <Route
          index
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/questions/:question_id"
          element={
            <ProtectedRoute>
              <QuestionDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <NewQuestion />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default connect(() => ({}))(App)
