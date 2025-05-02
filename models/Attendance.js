import { DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize.js';
import { User } from './User.js';
import { ClassSchedule } from './ClassShedule.js';
import { School } from './School.js';

const Attendance = sequelize.define('Attendance', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  studentId: {
    type: DataTypes.UUID,
    allowNull: false,
    
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  teacherId: {
    type: DataTypes.UUID,
    allowNull: false,
    
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  classScheduleId: {
    type: DataTypes.UUID,
    allowNull: false,
    
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  schoolId: {
    type: DataTypes.UUID,
    allowNull: false,
    
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
}, {
  tableName: 'Attendance',
  timestamps: true,
});

// Associations
Attendance.associate = (models) => {
  Attendance.belongsTo(models.User, {
    foreignKey: 'studentId',
    targetKey: 'id',
    as: 'student',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Attendance.belongsTo(models.User, {
    foreignKey: 'teacherId',
    targetKey: 'id',
    as: 'teacher',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Attendance.belongsTo(models.ClassSchedule, {
    foreignKey: 'classScheduleId',
    as: 'classSchedule',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Attendance.belongsTo(models.School, {
    foreignKey: 'schoolId',
    as: 'school',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};

export { Attendance };
