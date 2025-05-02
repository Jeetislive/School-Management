import { DataTypes } from "sequelize";
import sequelize from "../utils/sequelize.js";
import { User } from "./User.js";
import { School } from "./School.js";
import { Department } from "./Department.js";
import { Assignment } from "./Assignment.js";
import { ClassSchedule } from "./ClassShedule.js";
import { ExamSchedule } from "./ExamSchedule.js";
import { Result } from "./Result.js";
import { Event } from "./Event.js";

const Class = sequelize.define('Class', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(155),
    allowNull: false,
  },
  schoolId: {
    type: DataTypes.UUID,
    allowNull: false,
    
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  departmentId: {
    type: DataTypes.UUID,
    allowNull: true,
    
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  }
}, {
  tableName: 'Class',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

Class.associate = (models) => {
  Class.belongsTo(models.School, {
    foreignKey: 'schoolId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  Class.belongsTo(models.Department, {
    foreignKey: 'departmentId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  Class.hasMany(models.Assignment, { 
    foreignKey: 'classId',
    as: 'assignments'
  });
  Class.hasMany(models.ClassSchedule, {
    foreignKey: 'classId',
    as: 'classSchedules',
  });
  Class.hasMany(models.ExamSchedule, {
    foreignKey: 'classId',
    as: 'examSchedules',
  });
  Class.hasMany(models.Event, {
    foreignKey: 'classId',
    as: 'events',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  Class.hasMany(models.Result, {
    foreignKey: 'classId',
    as: 'results',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};

export { Class };
