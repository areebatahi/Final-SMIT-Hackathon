import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaCheckCircle, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const InProgressPage = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // To store error messages
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            setLoading(true);
            setError(null); // Clear any previous errors
            try {
                const response = await fetch(`${apiUrl}/tasks?status=in-progress`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch tasks: ${response.statusText}`);
                }

                const data = await response.json();
                if (data && Array.isArray(data)) {
                    // Ensuring only tasks with 'In Progress' status are set in state
                    const inProgressTasks = data.filter(task => task.status === 'In Progress');
                    setTasks(inProgressTasks);
                } else {
                    toast.error('No tasks found');
                }
            } catch (error) {
                setError(error.message); // Set the error message in the state
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
            const updatedStatus = task.status === 'In Progress' ? 'Completed' : 'In Progress';
            const response = await fetch(`${apiUrl}/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    status: updatedStatus,
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to update task: ${response.statusText}`);
            }

            const updatedTask = await response.json();
            setTasks(tasks.map(t => t._id === taskId ? updatedTask : t));
            toast.success('Task status updated');
        } catch (error) {
            setError(error.message); // Set error state for update operation
            toast.error(`An error occurred: ${error.message}`);
            console.error(error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        const token = localStorage.getItem('token');
        try {
            // Check if the task exists in the current state before making the delete request
            const taskExists = tasks.some(task => task._id === taskId);
            if (!taskExists) {
                setError('Task does not exist in the list or may have already been deleted.');
                toast.error('Task does not exist or may have already been deleted');
                return;
            }
    
            const response = await fetch(`${apiUrl}/tasks/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Task not found');
                } else {
                    throw new Error(`Failed to delete task: ${response.statusText}`);
                }
            }
    
            // Remove the task from the local state once deleted
            setTasks(tasks.filter(task => task._id !== taskId));
            toast.success('Task deleted');
        } catch (error) {
            setError(error.message); // Set error state for delete operation
            toast.error(`An error occurred: ${error.message}`);
            console.error(error);
        }
    };
    
    return (
        <div className="flex flex-col items-center min-h-screen p-6 bg-gray-50">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">In-Progress Tasks</h1>
            {error && <div className="text-red-600 mb-4">{error}</div>} {/* Display error if exists */}
            <div className="w-full max-w-lg space-y-4">
                {tasks.map((task) => (
                    <div
                        key={task._id} // Use _id if backend uses it
                        className={`flex justify-between items-center p-4 bg-white rounded-lg shadow-md ${task.completed ? 'bg-green-100' : 'bg-gray-100'
                            }`}
                    >
                        <div className="flex flex-col items-start space-y-1">
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handleToggleCompletion(task._id)} // Use _id if backend uses it
                                    className={`text-2xl ${task.completed ? 'text-green-600' : 'text-gray-400'}`}
                                >
                                    <FaCheckCircle />
                                </button>
                                <span
                                    className={`text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}
                                >
                                    Title : {task.title}
                                </span>
                            </div>
                            <span className="text-sm text-gray-600">Description : {task.description}</span>
                            <span className="text-xs text-gray-400">Status : {task.status}</span>
                        </div>
                        <button
                            onClick={() => handleDeleteTask(task._id)} // Use _id if backend uses it
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
