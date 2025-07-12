import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import './TaskPage.css'; // CSS in the same folder

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { token, logout, user } = useAuth();
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const res = await API.get('/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setIsLoading(false);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      await API.post('/tasks',
        { title: newTask, completed: false },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewTask('');
      await fetchTasks();
    } catch (err) {
      setError('Failed to create task');
    }
  };

  const toggleTask = async (taskId, currentStatus) => {
    try {
      await API.put(`/tasks/${taskId}`,
        { completed: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchTasks();
    } catch (err) {
      console.error(err);
      setError('Failed to update task');
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await API.delete(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchTasks();
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  useEffect(() => {
    if (!token) navigate('/login');
    else fetchTasks();
  }, [token]);

  return (
    <div className="task-container">
      <header className="task-header">
        <div className="user-info">
          <h2>Welcome, {user?.username}</h2>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <main className="task-main">
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={createTask} className="task-form">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="What needs to be done?"
            className="task-input"
          />
          <button type="submit" className="add-btn" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Task'}
          </button>
        </form>

        {isLoading && !tasks.length ? (
          <div className="loading-spinner"></div>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task._id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <div className="task-content">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task._id, task.completed)}
                    className="task-checkbox"
                  />
                  <span className="task-title">{task.title}</span>
                </div>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="delete-btn"
                  aria-label="Delete task"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}

        {!isLoading && !tasks.length && (
          <div className="empty-state">
            <p>No tasks yet. Add one above!</p>
          </div>
        )}
      </main>
    </div>
  );
}
