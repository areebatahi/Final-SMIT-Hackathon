import React, { useState, useEffect } from 'react';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', status: 'To Do' });

  const statuses = ['To Do', 'In Progress', 'Done'];

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${apiUrl}/tasks`);
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const createTask = async () => {
    try {
      const response = await fetch(`${apiUrl}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });

      const task = await response.json();
      setTasks([...tasks, task]);
      setNewTask({ title: '', status: 'To Do' });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${apiUrl}/tasks/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const updateTaskStatus = async (id, newStatus) => {
    try {
      await fetch(`${apiUrl}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      setTasks(tasks.map(task =>
        task._id === id ? { ...task, status: newStatus } : task
      ));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const filterTasksByStatus = (status) => tasks.filter(task => task.status === status);

  const badgeColor = {
    'To Do': 'bg-red-500',
    'In Progress': 'bg-yellow-500',
    'Done': 'bg-green-500',
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-100 via-slate-200 to-slate-100 flex flex-col">
      {/* Navbar */}
      <nav className="bg-indigo-600 text-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Task Manager</h1>
          <span className="text-sm">Stay organized 💼</span>
        </div>
      </nav>

      <main className="flex-1 container mx-auto p-6">
        {/* Task Creation */}
        <div className="max-w-3xl mx-auto mb-10 bg-white p-6 rounded-xl shadow-xl">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Create New Task</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="flex-1 p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <button
              onClick={createTask}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Add Task
            </button>
          </div>
        </div>

        {/* Task Board */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {statuses.map((status) => (
            <div key={status} className="bg-white p-5 rounded-2xl shadow-xl border border-gray-100">
              <h3 className="text-xl font-bold text-center mb-4 text-slate-700">{status}</h3>
              <div className="space-y-4">
                {filterTasksByStatus(status).map((task) => (
                  <div
                    key={task._id}
                    className="p-5 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300"
                  >
                    <h4 className="text-lg font-semibold text-slate-800 mb-2">{task.title}</h4>

                    <div className="flex justify-between items-center flex-wrap gap-2">
                      {/* Badge */}
                      <span className={`text-xs px-3 py-1 rounded-full font-semibold text-white ${badgeColor[task.status]}`}>
                        {task.status}
                      </span>

                      {/* Styled Select */}
                      <select
                        value={task.status}
                        onChange={(e) => updateTaskStatus(task._id, e.target.value)}
                        className="text-sm px-3 py-2 rounded-md bg-white border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none"
                      >
                        {statuses.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>

                      {/* Delete Button */}
                      <button
                        onClick={() => deleteTask(task._id)}
                        className="bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700 text-sm"
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
      </main>
    </div>
  );
};

export default TaskManagement;
