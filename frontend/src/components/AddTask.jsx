import React, { useState } from 'react';
import { toast } from 'react-toastify';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const AddTask = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState('To Do');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !assignedTo) {
      toast.error('Please fill all fields');
      return;
    }

    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${apiUrl}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, assignedTo, status }),
      });

      const data = await response.json();

      if (response.ok) {
        setTitle('');
        setDescription('');
        setAssignedTo('');
        setStatus('To Do');
        toast.success('Task created successfully!');
        onSubmit(data);
      } else {
        toast.error(data.message || 'Failed to create task');
      }
    } catch (error) {
      toast.error('An error occurred while creating the task');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-md">
      <h2 className="text-xl font-bold mb-4">Add New Task</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          className="w-full border rounded px-3 py-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Assign To</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-800 text-white px-4 py-2 rounded font-semibold hover:bg-blue-900"
        disabled={loading}
      >
        {loading ? 'Creating Task...' : 'Create Task'}
      </button>
    </form>
  );
};

export default AddTask;
