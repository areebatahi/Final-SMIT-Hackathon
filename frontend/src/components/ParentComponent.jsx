import React, { useState } from 'react';
import AddTask from './AddTask'; // Make sure the path is correct

const ParentComponent = () => {
  const [tasks, setTasks] = useState([]);

  const handleTaskSubmit = (newTask) => {
    // Handle task submission (e.g., update tasks state)
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div>
      <AddTask onSubmit={handleTaskSubmit} /> {/* Pass the handleTaskSubmit function */}
      <div>
        <h2>Tasks</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>{task.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ParentComponent;
