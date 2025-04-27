import React from 'react';
import { Routes, Route, useLocation  } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import SignUp from './Pages/Signup';
import Logout from "./Pages/Logout";
import TaskManagement from './components/TaskManagement';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/Slidebar';


const App = () => {
  const location = useLocation();
  return (
    <>
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64 min-h-screen bg-gray-50 p-4">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
    
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/taskManagement" element={<TaskManagement />} />
        <Route path="/logout" element={<Logout />} />
    </Routes>
    </div>
    </div>
    </>
  );
};

export default App;