import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { logout } from "../store/authSlice"

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const TaskManagement = () => {
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", status: "To Do" });

  const statuses = ["To Do", "In Progress", "Done"];

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${apiUrl}/tasks`);
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        toast.error("Failed to fetch tasks. Please try again.");
      }
    };

    fetchTasks();
  }, []);

  const createTask = async () => {
    if (!newTask.title.trim()) {
      toast.warn("Task title cannot be empty.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      const task = await response.json();
      setTasks([...tasks, task]);
      setNewTask({ title: "", status: "To Do" });
      toast.success("Task created!");
    } catch (error) {
      toast.error("Error creating task.");
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${apiUrl}/tasks/${id}`, { method: "DELETE" });
      setTasks(tasks.filter((task) => task._id !== id));
      toast.success("Task deleted.");
    } catch (error) {
      toast.error("Error deleting task.");
    }
  };

  const updateTaskStatus = async (id, newStatus) => {
    try {
      await fetch(`${apiUrl}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      setTasks(
        tasks.map((task) =>
          task._id === id ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      toast.error("Error updating status.");
    }
  };

  const colorMap = {
    "To Do": "border-blue-700",
    "In Progress": "border-red-500",
    Done: "border-green-600",
  };

  const filterTasks = (status) =>
    tasks.filter((task) => task.status === status);

  return (
    <div className="min-h-screen bg-[#f7ecd9] p-6">
      {/* Header */}
      <header className="bg-[#1f3b5c] rounded-xl p-6 text-white flex justify-between items-center mb-6 shadow-md">
        <h1 className="text-3xl font-extrabold">TASK MANAGER</h1>

        <div className="flex items-center gap-4">
          <span className="text-sm hidden sm:inline">Stay organized 💼</span>
          <button
            onClick={()=>dispatch(logout())}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 text-sm rounded-full transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Add Task Section */}
      <div className="bg-white rounded-xl shadow p-6 mb-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <div className="flex-1">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Create New Task
          </label>
          <input
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100"
          />
        </div>
        <button
          onClick={createTask}
          className="bg-[#1f3b5c] text-white px-6 py-2 rounded-lg text-sm font-semibold"
        >
          + Add Task
        </button>
      </div>

      {/* Task Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statuses.map((status) => (
          <div
            key={status}
            className={`bg-white border-2 ${colorMap[status]} rounded-xl shadow p-4`}
          >
            <h3 className="text-xl font-bold text-center mb-4 text-gray-800">
              {status}
            </h3>
            <div className="space-y-4">
              {filterTasks(status).map((task) => (
                <div
                  key={task._id}
                  className="bg-[#fdfdfd] rounded-lg p-4 shadow-sm border border-gray-200"
                >
                  <h4 className="text-md font-semibold text-gray-800 mb-2">
                    {task.title}
                  </h4>

                  <div className="space-y-2">
                    <select
                      value={task.status}
                      onChange={(e) =>
                        updateTaskStatus(task._id, e.target.value)
                      }
                      className="w-full text-sm border border-gray-300 rounded-md px-2 py-1"
                    >
                      {statuses.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    <div className="flex justify-between">
                      <button className="text-xs px-3 py-1 bg-gray-200 rounded-md">
                        Action
                      </button>
                      <button
                        onClick={() => deleteTask(task._id)}
                        className="text-xs px-3 py-1 bg-red-500 text-white rounded-md"
                      >
                        Delete
                      </button>
                    </div>
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
