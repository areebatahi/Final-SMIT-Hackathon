
import React from 'react';
import { Routes, Route, useLocation  } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import SignUp from './Pages/Signup';
import Logout from "./Pages/Logout" 
import Profile from "./Pages/Profile"
import Update from './Pages/Update';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home';
import Sidebar from './components/Slidebar';
import TodoPage from './Pages/TodoPage';
import InProgressPage from './Pages/InProgressPage';
import DonePage from './Pages/DonePage';
import AddTask from './components/AddTask';


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
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update" element={<Update />} />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/inprogress" element={<InProgressPage />} />
        <Route path="/done" element={<DonePage />} />
        <Route path="/addtask" element={<AddTask />} />
    </Routes>
    </div>
    </div>
    </>
  );
};

export default App;