import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleRecieveData } from '../actions/shared';
import UserLogin from './UserLogin';
import MainLayout from './MainLayout';
import AuthRoute from './AuthRoute';
import Dashboard from './Dashboard';
import ErrorPage from './ErrorPage';
import PollDetail from './PollDetail';
import Rankings from './Rankings';
import CreatePoll from './CreatePoll';

const MainApp = ({ dispatch }) => {
  useEffect(() => {
    dispatch(handleRecieveData());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="*" element={<ErrorPage />} />
        <Route
          index
          element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          }
        />
        <Route
          path="/questions/:question_id"
          element={
            <AuthRoute>
              <PollDetail />
            </AuthRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <AuthRoute>
              <Rankings />
            </AuthRoute>
          }
        />
        <Route
          path="/add"
          element={
            <AuthRoute>
              <CreatePoll />
            </AuthRoute>
          }
        />
      </Route>
      <Route path="/login" element={<UserLogin />} />
    </Routes>
  );
};

export default connect(() => ({}))(MainApp);
