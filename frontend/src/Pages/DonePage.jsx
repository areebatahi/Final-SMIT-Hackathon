import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaUndo, FaTrashAlt } from 'react-icons/fa'; // Icons for undoing completion and deleting
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const DonePage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch tasks when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Redirect to login if not authenticated
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/tasks?status=completed`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        } else {
          toast.error('Failed to fetch tasks');
        }
      } catch (error) {
        toast.error('An error occurred while fetching tasks');
        console.error(error);
      }
    };

    fetchTasks();
  }, [navigate]);

  // Handle task status update (mark as In Progress)
  const handleToggleInProgress = async (taskId) => {
    const token = localStorage.getItem('token');
    try {
      const task = tasks.find(t => t.id === taskId);
      const response = await fetch(`${apiUrl}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          completed: false,
          status: 'In Progress', // Change status to In Progress
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setTasks(tasks.map(t =>
          t.id === taskId ? { ...t, completed: data.completed, status: data.status } : t
        ));
        toast.success('Task moved to In Progress');
      } else {
        toast.error(data.message || 'Failed to update task');
      }
    } catch (error) {
      toast.error('An error occurred while updating task');
      console.error(error);
    }
  };

  // Handle task deletion
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
        setTasks(tasks.filter(task => task.id !== taskId)); // Remove task from list
        toast.success('Task deleted!');
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
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Completed Tasks</h1>

      {/* Done Tasks List */}
      <div className="w-full max-w-lg space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex justify-between items-center p-4 bg-white rounded-lg shadow-md ${
              task.completed ? 'bg-green-100' : 'bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg line-through text-gray-500">{task.text}</span>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => handleToggleInProgress(task.id)}
                className="text-blue-600 hover:text-blue-800"
              >
                <FaUndo /> {/* Undo Completion */}
              </button>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="text-red-600 hover:text-red-800"
              >
                <FaTrashAlt /> {/* Delete Task */}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonePage;
