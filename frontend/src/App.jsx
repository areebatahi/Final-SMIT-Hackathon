import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import SignUp from './Pages/Signup';
import Logout from "./Pages/Logout";
import TaskManagement from './components/TaskManagement';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';

const App = () => {
  const location = useLocation();

  const handleStatusChange = (statusText) => {
    console.log("Status changed to:", statusText);
  };

  const isTaskPage = location.pathname === "/taskManagement";

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Navbar onStatusChange={handleStatusChange} />
      <div className={`${isTaskPage ? '' : 'flex flex-1 items-center justify-center px-4'}`}>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/taskManagement" element={<TaskManagement />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>

      <ToastContainer />
    </div>
  );
};

export default App;
