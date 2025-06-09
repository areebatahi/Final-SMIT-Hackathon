import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const TaskManagement = () => {
  const navigate = useNavigate();
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
    "In Progress": "border-yellow-500",
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
          <button
            onClick={() => {
              dispatch(logout());
              navigate("/");
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 text-sm rounded-full transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Add Task Section */}
      <div className="bg-white rounded-xl shadow p-6 mb-8 max-w-8xl mx-auto">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="flex-1">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Create New Task
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Task Title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="flex-grow px-4 py-3 border border-gray-300 rounded-lg text-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1f3b5c] transition"
              />
              <button
                onClick={createTask}
                className="bg-[#1f3b5c] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#16334a] transition cursor-pointer"
              >
                + Add Task
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Task Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6">
        {statuses.map((status) => (
          <div
            key={status}
            className={`bg-white border-t-4 ${colorMap[status]} rounded-xl shadow-lg p-5 transition-all duration-200`}
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
                    {/* Status display */}
                    <div
                      className={`text-sm font-medium px-3 py-1 rounded-full inline-block w-fit ${
                        task.status === "To Do"
                          ? "bg-blue-100 text-blue-700"
                          : task.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {task.status}
                    </div>

                    {/* Action dropdown only if not Done */}
                    {task.status !== "Done" && (
                      <select
                        value=""
                        onChange={(e) =>
                          updateTaskStatus(task._id, e.target.value)
                        }
                        className="w-full text-sm border border-gray-300 rounded-md px-2 py-1"
                      >
                        <option value="" disabled>
                          Action
                        </option>
                        {task.status === "To Do" && (
                          <option value="In Progress">In Progress</option>
                        )}
                        {task.status === "In Progress" && (
                          <option value="Done">Done</option>
                        )}
                      </select>
                    )}

                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">
                        ID: {task._id.slice(-4)}
                      </span>
                      <button
                        onClick={() => deleteTask(task._id)}
                        className="text-xs px-3 py-1 bg-red-500 text-white rounded-md cursor-pointer"
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
