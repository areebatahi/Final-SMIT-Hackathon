import React, { useState } from 'react';
import AddTaskForm from './AddTask';
import Sidebar from './Slidebar';

const Home = () => {
  const [selectedStatus, setSelectedStatus] = useState('To Do');
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([
    { title: 'Task A', assignedTo: 'User1', status: 'To Do' },
    { title: 'Task B', assignedTo: 'User2', status: 'In Progress' },
    { title: 'Task C', assignedTo: 'User3', status: 'Done' },
  ]);

  const filteredTasks = tasks.filter(task => task.status === selectedStatus);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
    setShowForm(false);
  };

  const handleStatusClick = (status) => {
    setSelectedStatus(status);
    setShowForm(false); // close form when switching status
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 p-6 overflow-auto ml-64"> {/* ml-64 for spacing sidebar */}
        {showForm && (
          <div className="mb-6">
            <AddTaskForm onSubmit={handleAddTask} />
          </div>
        )}

        <h2 className="text-2xl font-bold mb-6">{selectedStatus}</h2>
        <div className="space-y-4">
          {filteredTasks.map((task, index) => (
            <div key={index} className="bg-white border rounded p-4 shadow-sm">
              <p className="font-semibold">{task.title}</p>
              <p className="text-sm text-gray-600">Assigned: {task.assignedTo}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
