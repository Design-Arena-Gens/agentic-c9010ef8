import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = () => {
    if (inputValue.trim()) {
      setTasks([...tasks, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <>
      <Head>
        <title>Task Manager App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container">
        <div className="app-wrapper">
          <h1>📝 Task Manager</h1>
          <p className="subtitle">آپ کے کاموں کا منتظم</p>

          <div className="input-group">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="نیا کام شامل کریں..."
              className="task-input"
            />
            <button onClick={addTask} className="add-btn">Add Task</button>
          </div>

          <div className="filter-buttons">
            <button
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              All ({tasks.length})
            </button>
            <button
              className={filter === 'active' ? 'active' : ''}
              onClick={() => setFilter('active')}
            >
              Active ({tasks.filter(t => !t.completed).length})
            </button>
            <button
              className={filter === 'completed' ? 'active' : ''}
              onClick={() => setFilter('completed')}
            >
              Completed ({tasks.filter(t => t.completed).length})
            </button>
          </div>

          <ul className="task-list">
            {filteredTasks.length === 0 ? (
              <li className="empty-state">کوئی کام نہیں ہے</li>
            ) : (
              filteredTasks.map(task => (
                <li key={task.id} className="task-item">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="checkbox"
                  />
                  <span className={task.completed ? 'completed' : ''}>
                    {task.text}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="delete-btn"
                  >
                    ×
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>

        <style jsx>{`
          .container {
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          }

          .app-wrapper {
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            max-width: 600px;
            width: 100%;
          }

          h1 {
            text-align: center;
            color: #333;
            margin: 0 0 10px 0;
            font-size: 2.5rem;
          }

          .subtitle {
            text-align: center;
            color: #666;
            margin: 0 0 30px 0;
            font-size: 1rem;
          }

          .input-group {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
          }

          .task-input {
            flex: 1;
            padding: 15px;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            font-size: 1rem;
            transition: border-color 0.3s;
          }

          .task-input:focus {
            outline: none;
            border-color: #667eea;
          }

          .add-btn {
            padding: 15px 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s;
          }

          .add-btn:hover {
            transform: translateY(-2px);
          }

          .filter-buttons {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
          }

          .filter-buttons button {
            flex: 1;
            padding: 10px;
            border: 2px solid #e0e0e0;
            background: white;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 0.9rem;
          }

          .filter-buttons button.active {
            background: #667eea;
            color: white;
            border-color: #667eea;
          }

          .task-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .task-item {
            display: flex;
            align-items: center;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 10px;
            margin-bottom: 10px;
            transition: all 0.3s;
          }

          .task-item:hover {
            background: #e9ecef;
            transform: translateX(5px);
          }

          .checkbox {
            width: 20px;
            height: 20px;
            margin-right: 15px;
            cursor: pointer;
          }

          .task-item span {
            flex: 1;
            font-size: 1rem;
            color: #333;
          }

          .task-item span.completed {
            text-decoration: line-through;
            color: #999;
          }

          .delete-btn {
            width: 30px;
            height: 30px;
            border: none;
            background: #ff6b6b;
            color: white;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
            line-height: 1;
          }

          .delete-btn:hover {
            background: #ff5252;
            transform: rotate(90deg);
          }

          .empty-state {
            text-align: center;
            padding: 40px;
            color: #999;
            font-size: 1.1rem;
          }

          @media (max-width: 640px) {
            .app-wrapper {
              padding: 20px;
            }

            h1 {
              font-size: 2rem;
            }

            .input-group {
              flex-direction: column;
            }

            .filter-buttons {
              flex-direction: column;
            }
          }
        `}</style>
      </div>
    </>
  );
}
