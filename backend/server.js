import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/task.js';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(express.json());
// Habilita CORS con configuración básica
app.use(cors({
  origin: 'http://localhost:5173', // permite tu frontend
  credentials: true
}));
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;

try {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log('Database connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
} catch (error) {
  console.error('Unable to connect to the database:', error);
}