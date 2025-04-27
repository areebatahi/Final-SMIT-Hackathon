import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTrashAlt } from 'react-icons/fa'; // For task completion and delete icons
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const TodoPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Redirect to login if not authenticated
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/api/tasks`, {
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

  // Handle adding a new task
  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!newTask.trim()) {
      toast.error('Please enter a task!');
      return;
    }

    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${apiUrl}/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: newTask, completed: false }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setTasks([...tasks, data]); // Update the tasks list with the new task
        setNewTask('');
        toast.success('Task added!');
      } else {
        toast.error(data.message || 'Failed to add task');
      }
    } catch (error) {
      setLoading(false);
      toast.error('An error occurred while adding the task');
      console.error(error);
    }
  };

  // Handle task completion toggle
  const handleToggleCompletion = async (taskId) => {
    const token = localStorage.getItem('token');
    try {
      const task = tasks.find(t => t.id === taskId);
      const response = await fetch(`${apiUrl}/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          completed: !task.completed,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setTasks(tasks.map(t =>
          t.id === taskId ? { ...t, completed: data.completed } : t
        ));
        toast.success('Task updated!');
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
        setTasks(tasks.filter(task => task.id !== taskId)); // Remove the task from the list
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
      <h1 className="text-3xl font-bold text-gray-800 mb-6">To-Do List</h1>
      {/* Task List */}
      <div className="w-full max-w-lg space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex justify-between items-center p-4 bg-white rounded-lg shadow-md ${
              task.completed ? 'bg-green-100' : 'bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleToggleCompletion(task.id)}
                className={`text-2xl ${task.completed ? 'text-green-600' : 'text-gray-400'}`}
              >
                <FaCheckCircle />
              </button>
              <span
                className={`text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}
              >
                {task.text}
              </span>
            </div>
            <button
              onClick={() => handleDeleteTask(task.id)}
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

export default TodoPage;
