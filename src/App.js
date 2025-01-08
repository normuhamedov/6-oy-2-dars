import './App.css';
import React, { useState } from 'react';

const App = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return savedTasks;
  });
  const [editIndex, setEditIndex] = useState(null);

  const saveToLocalStorage = (updatedTasks) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const addTask = () => {
    if (!task.trim()) return;

    let updatedTasks;
    if (editIndex !== null) {
      updatedTasks = tasks.map((t, i) => (i === editIndex ? task : t));
      setEditIndex(null);
    } else {
      updatedTasks = [...tasks, task];
    }

    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks);
    setTask('');
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks);
  };

  const editTask = (index) => {
    setTask(tasks[index]);
    setEditIndex(index);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-blue-500 mb-6">Todo</h1>
      <div className="flex mb-6 w-full max-w-md">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter....."
          className="flex-grow border rounded-l-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
        >
          {editIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>

      <ul className="w-full max-w-md bg-white rounded-md shadow-md divide-y divide-gray-200">
        {tasks.map((t, i) => (
          <li key={i} className="flex justify-between items-center px-4 py-2">
            <span className="text-gray-800">{t}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => editTask(i)}
                className="text-green-500 hover:text-green-700 border-[1px] rounded-lg border-[green] px-2"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(i)}
                className="text-red-500 hover:text-red-700 border-[1px] rounded-lg border-[red] px-2"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && (
        <p className="mt-4 text-gray-500">Please add text</p>
      )}
    </div>
  );
};

export default App;

