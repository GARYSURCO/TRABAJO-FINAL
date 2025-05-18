import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import axios from 'axios';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [filterStatus, setFilterStatus] = useState('todas');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [user.token]);

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:5000/api/tasks', {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setTasks(res.data);
  };

  const handleSubmit = async () => {
    if (!title || !description) return;

    if (editingTask) {
      const res = await axios.put(
        `http://localhost:5000/api/tasks/${editingTask.id}`,
        { title, description, completed: editingTask.completed },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setTasks(tasks.map((t) => (t.id === editingTask.id ? res.data : t)));
      setEditingTask(null);
    } else {
      const res = await axios.post(
        'http://localhost:5000/api/tasks',
        { title, description },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setTasks([...tasks, res.data]);
    }

    setTitle('');
    setDescription('');
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setEditingTask(task);
  };

  const handleToggleCompleted = async (task) => {
    const updated = { ...task, completed: !task.completed };
    const res = await axios.put(
      `http://localhost:5000/api/tasks/${task.id}`,
      updated,
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    setTasks(tasks.map((t) => (t.id === task.id ? res.data : t)));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === 'todas') return true;
    if (filterStatus === 'pendiente') return !task.completed;
    if (filterStatus === 'terminada') return task.completed;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-4 sm:mb-0">Hola, {user.name}</h1>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full shadow"
          >
            Cerrar sesión
          </button>
        </div>

        <div className="bg-blue-50 rounded-xl p-6 shadow mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            {editingTask ? 'Editar tarea' : 'Agregar nueva tarea'}
          </h2>
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-blue-300 rounded-lg p-3 mb-3"
          />
          <textarea
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-blue-300 rounded-lg p-3 mb-3"
          />
          {editingTask && (
            <select
              value={editingTask.completed ? 'terminada' : 'pendiente'}
              onChange={(e) =>
                setEditingTask({
                  ...editingTask,
                  completed: e.target.value === 'terminada',
                })
              }
              className="w-full border border-blue-300 rounded-lg p-3 mb-3"
            >
              <option value="pendiente">Pendiente</option>
              <option value="terminada">Terminada</option>
            </select>
          )}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full"
            >
              {editingTask ? 'Actualizar' : 'Agregar'}
            </button>
            {editingTask && (
              <button
                onClick={() => {
                  setEditingTask(null);
                  setTitle('');
                  setDescription('');
                }}
                className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-full"
              >
                Cancelar
              </button>
            )}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-lg text-blue-800 font-semibold mb-2">
            Filtrar por estado:
          </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full border border-blue-300 rounded-lg p-3"
          >
            <option value="todas">Todas</option>
            <option value="pendiente">Pendiente</option>
            <option value="terminada">Terminada</option>
          </select>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className={`p-6 rounded-2xl shadow-xl border-l-8 ${
                task.completed
                  ? 'bg-green-100 border-green-500'
                  : 'bg-yellow-100 border-yellow-400'
              }`}
            >
              <h3 className="text-2xl font-bold mb-2">{task.title}</h3>
              <p className="mb-3">{task.description}</p>
              <p className="text-sm italic mb-4">
                Estado: {task.completed ? '✅ Terminada' : '⏳ Pendiente'}
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleEdit(task)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white py-2 rounded-full"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => task.completed && handleDelete(task.id)}
                  disabled={!task.completed}
                  className={`py-2 rounded-full ${
                    task.completed
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  title={!task.completed ? 'Solo puedes eliminar tareas terminadas' : 'Eliminar tarea'}
                >
                  🗑️ Eliminar
                </button>
                <button
                  onClick={() => handleToggleCompleted(task)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-full"
                >
                  {task.completed ? '🔁 Marcar como pendiente' : '✅ Marcar como terminada'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;
