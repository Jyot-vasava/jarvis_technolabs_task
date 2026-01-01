import React, { use } from 'react'
import api from '../services/api';
import {useEffect, useState} from 'react'



function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title) return;
    await api.post("/tasks", {
      title,
    }); 
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
        await api.delete(`/tasks/${id}`);
    fetchTasks();
  };
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1
      className='text-2xl font-bold mb-4'
      >Task Manager</h1>

      <input
        type="text"
        className='border p-2  '
        placeholder="Add a new task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button
        className='border p-2 ml-2 bg-blue-500 text-white'
       onClick={addTask}> Add Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;