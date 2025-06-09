import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const TaskManagement = () => {
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

  const badgeColor = {
    "To Do": "bg-red-500 text-white",
    "In Progress": "bg-blue-500 text-white",
    Done: "bg-green-500 text-white",
  };

  const columnBorderColor = {
    "To Do": "border-red-500",
    "In Progress": "border-blue-500",
    Done: "border-green-600",
  };

  const headingColor = {
    "To Do": "text-red-600",
    "In Progress": "text-blue-600",
    Done: "text-green-700",
  };

  const filterTasks = (status) =>
    tasks.filter((task) => task.status === status);

  return (
    <div className="min-h-screen bg-beige-100 flex flex-col">
      {/* Header */}
      <header className="bg-indigo-900 text-white px-6 py-5 flex justify-between items-center rounded-b-2xl shadow">
        <h1 className="text-3xl font-extrabold tracking-wide">TASK MANAGER</h1>

        <div className="flex items-center gap-4">
          <span className="text-sm hidden sm:inline">Stay organized 📁</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-2 rounded-full transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Create Task */}
      <div className="container mx-auto px-4 mt-6">
        <div className="bg-white rounded-xl shadow-md p-4 flex flex-col sm:flex-row items-stretch gap-3">
          <input
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={createTask}
            className="bg-indigo-700 text-white px-5 py-2 rounded-lg hover:bg-indigo-800 text-sm"
          >
            + Add Task
          </button>
        </div>
      </div>

      {/* Task Columns */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {statuses.map((status) => (
            <div
              key={status}
              className={`rounded-2xl p-4 shadow-md border-2 ${columnBorderColor[status]}`}
            >
              <h3
                className={`text-lg font-bold text-center mb-4 ${headingColor[status]}`}
              >
                {status}
              </h3>

              <div className="space-y-4">
                {filterTasks(status).map((task) => (
                  <div
                    key={task._id}
                    className="bg-slate-50 border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-3"
                  >
                    <h4 className="text-sm font-semibold text-slate-800">
                      {task.title}
                    </h4>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-semibold ${
                          badgeColor[task.status]
                        }`}
                      >
                        {task.status}
                      </span>

                      <select
                        value={task.status}
                        onChange={(e) =>
                          updateTaskStatus(task._id, e.target.value)
                        }
                        className="text-xs px-3 py-1 rounded-full border border-gray-200 bg-white text-gray-800 hover:border-indigo-500 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
                      >
                        {statuses.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={() => deleteTask(task._id)}
                        className="text-xs text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md"
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
