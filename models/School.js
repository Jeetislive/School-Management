// models/School.js
import { DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize.js';
import { User } from './User.js';
import { Role } from './Role.js';
import { Invite } from './Invite.js';
import { Class } from './Class.js';
import { Assignment } from './Assignment.js';
import { ClassSchedule } from './ClassShedule.js';  // Fixed typo
import { ExamSchedule } from './ExamSchedule.js';
import { Experience } from './Experience.js';
import { Result } from './Result.js';
import { Attendance } from './Attendance.js';
import { Complaint } from './Complaint.js';
import { NoticeBoard } from './NoticeBoard.js';
import { Subject } from './Subject.js';

const School = sequelize.define('School', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  contactEmail: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'School',
  timestamps: true,
  updatedAt: 'updatedAt',
  createdAt: 'createdAt',
});

// Associations
School.associate = (models) => {
  School.hasMany(models.User, {
    foreignKey: 'schoolId',
    as: 'users',
    references: {
      model: 'User', // Reference to the User model
      key: 'id',
    },
  });

  School.hasMany(models.Role, {
    foreignKey: 'schoolId',
    as: 'roles',
    references: {
      model: 'Role', // Reference to the Role model
      key: 'id',
    },
  });

  School.hasMany(models.Invite, {
    foreignKey: 'schoolId',
    as: 'invites',
    references: {
      model: 'Invite', // Reference to the Invite model
      key: 'id',
    },
  });

  School.hasMany(models.Class, {
    foreignKey: 'schoolId',
    as: 'classes',
    references: {
      model: 'Class', // Reference to the Class model
      key: 'id',
    },
  });

  School.hasMany(models.Assignment, {
    foreignKey: 'schoolId',
    as: 'assignments',
    references: {
      model: 'Assignment', // Reference to the Assignment model
      key: 'id',
    },
  });

  School.hasMany(models.ClassSchedule, {
    foreignKey: 'schoolId',
    as: 'classSchedules',
    references: {
      model: 'ClassSchedule', // Reference to the ClassSchedule model
      key: 'id',
    },
  });

  School.hasMany(models.ExamSchedule, {
    foreignKey: 'schoolId',
    as: 'examSchedules',
    references: {
      model: 'ExamSchedule', // Reference to the ExamSchedule model
      key: 'id',
    },
  });

  School.hasMany(models.Experience, {
    foreignKey: 'schoolId',
    as: 'experiences',
    references: {
      model: 'Experience', // Reference to the Experience model
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  School.hasMany(models.Result, {
    foreignKey: 'schoolId',
    as: 'results',
    references: {
      model: 'Result', // Reference to the Result model
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  School.hasMany(models.Attendance, {
    foreignKey: 'schoolId',
    as: 'attendances',
    references: {
      model: 'Attendance', // Reference to the Attendance model
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  School.hasMany(models.Complaint, {
    foreignKey: 'schoolId',
    as: 'complaints',
    references: {
      model: 'Complaint', // Reference to the Complaint model
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  School.hasMany(models.NoticeBoard, {
    foreignKey: 'schoolId',
    as: 'notices',
    references: {
      model: 'NoticeBoard', // Reference to the NoticeBoard model
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  School.hasMany(models.Subject, {
    foreignKey: 'schoolId',
    references: {
      model: 'Subject', // Reference to the Subject model
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};

export { School };
