import { Outlet } from 'react-router-dom';
import Header from '../Header';
import NavigationBar from '../NavigationBar';

const MainLayout = () => {
  return (
    <div className="main-layout">
      <NavigationBar />
      <div className="main-content">
        <Header />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
