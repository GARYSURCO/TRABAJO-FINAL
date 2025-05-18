import Task from '../models/Task.js';

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id } });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const createTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    // Debes enviar el userId explícitamente al crear la tarea
    const task = await Task.create({ title, description, userId: req.user.id });
    res.status(201).json(task);
  } catch (error) {
    console.error(error); // Para ver el error real en consola
    res.status(500).json({ msg: 'Server error' });
  }
};


export const updateTask = async (req, res) => {
  const { title, description, completed } = req.body;

  try {
    const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.completed = completed ?? task.completed;
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const result = await Task.destroy({ where: { id: req.params.id, userId: req.user.id } });
    if (!result) return res.status(404).json({ msg: 'Task not found' });

    res.json({ msg: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};