import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaCheckCircle, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const InProgressPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/tasks?status=in-progress`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setTasks(data);
        } else {
          toast.error('Failed to fetch tasks');
        }
      } catch (error) {
        toast.error('An error occurred while fetching tasks');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [navigate]);

  const handleToggleCompletion = async (taskId) => {
    const token = localStorage.getItem('token');
    try {
      const task = tasks.find(t => t._id === taskId);
      const response = await fetch(`${apiUrl}/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: task.status === 'In Progress' ? 'Completed' : 'In Progress',
        }),
      });

      const updatedTask = await response.json();
      if (response.ok) {
        setTasks(tasks.map(t => t._id === taskId ? updatedTask : t));
        toast.success('Task status updated');
      } else {
        toast.error(updatedTask.message || 'Failed to update task');
      }
    } catch (error) {
      toast.error('An error occurred while updating task');
      console.error(error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${apiUrl}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setTasks(tasks.filter(task => task._id !== taskId));
        toast.success('Task deleted');
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to delete task');
      }
    } catch (error) {
      toast.error('An error occurred while deleting task');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">In-Progress Tasks</h1>
      <div className="w-full max-w-lg space-y-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className={`flex justify-between items-center p-4 bg-white rounded-lg shadow-md ${task.status === 'Completed' ? 'bg-green-100' : 'bg-gray-100'}`}
          >
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleToggleCompletion(task._id)}
                className={`text-2xl ${task.status === 'Completed' ? 'text-green-600' : 'text-gray-400'}`}
              >
                <FaCheckCircle />
              </button>
              <span className={`text-lg ${task.status === 'Completed' ? 'line-through text-gray-500' : ''}`}>
                {task.title}
              </span>
            </div>
            <button
              onClick={() => handleDeleteTask(task._id)}
              className="text-red-600 hover:text-red-800"
            >
              <FaTrashAlt />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InProgressPage;
