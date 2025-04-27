import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import SignUp from './Pages/Signup';
import Logout from "./Pages/Logout";
import TaskManagement from './components/TaskManagement';
import Sidebar from './components/Slidebar';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const location = useLocation();

  const handleStatusChange = (statusText) => {
    console.log("Status changed to:", statusText);
  };

  return (
    <div className="flex">
      <Sidebar onStatusChange={handleStatusChange} />
      <div className="flex-1 ml-64 min-h-screen bg-gray-50 p-4">
        {/* Move ToastContainer here if you want it inside the main content */}
        <ToastContainer />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/taskManagement" element={<TaskManagement />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
