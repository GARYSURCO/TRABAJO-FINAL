import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: DataTypes.TEXT,
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

export default Task;