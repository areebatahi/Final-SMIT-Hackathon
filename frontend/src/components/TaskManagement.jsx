import React, { useState, useEffect } from 'react';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', status: 'To Do' });

  const statuses = ['To Do', 'In Progress', 'Done'];

  // Fetch all tasks on page load
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${apiUrl}/tasks`);
        if (!response.ok) {
          throw new Error('Error fetching tasks');
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  // Create a new task
  const createTask = async () => {
    try {
      const response = await fetch(`${apiUrl}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error('Error creating task');
      }

      const task = await response.json();
      setTasks([...tasks, task]);
      setNewTask({ title: '', status: 'To Do' });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error deleting task');
      }

      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Update Task Status (Move task between columns)
  const updateTaskStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`${apiUrl}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Error updating task status');
      }

      setTasks(tasks.map((task) =>
        task._id === id ? { ...task, status: newStatus } : task
      ));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  // Filter tasks based on their status
  const filterTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      {/* New Task Form */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Create New Task</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={createTask}
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statuses.map((status) => (
          <div key={status} className="bg-white shadow-lg rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-center mb-4 capitalize">{status}</h2>
            <div className="space-y-4">
              {filterTasksByStatus(status).map((task) => (
                <div key={task._id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-md flex flex-col space-y-4 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-gray-900">{task.title}</h3>
                  <p className="text-gray-600">{task.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    {/* Task Status Badge */}
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${status === 'To Do' ? 'bg-red-500' : status === 'In Progress' ? 'bg-yellow-500' : 'bg-green-500'} text-white`}>
                      {task.status}
                    </span>

                    {/* Status Update Dropdown */}
                    <select
                      value={task.status}
                      onChange={(e) => updateTaskStatus(task._id, e.target.value)}
                      className="p-2 border border-gray-300 rounded-md text-sm"
                    >
                      {statuses.map((statusOption) => (
                        <option key={statusOption} value={statusOption}>
                          {statusOption}
                        </option>
                      ))}
                    </select>

                    {/* Delete Button */}
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default TaskManagement;
