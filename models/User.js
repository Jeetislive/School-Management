import { DataTypes } from "sequelize";
import sequelize from "../utils/sequelize.js";
import { Department } from "./Department.js";
import { Role } from "./Role.js";
import { School } from "./School.js";
import { Assignment } from "./Assignment.js";
import { Class } from "./Class.js";
import { Invite } from "./Invite.js";
import { RefreshToken } from "./RefreshToken.js";
import { ClassSchedule } from "./ClassShedule.js";
import { Permission } from "./Permission.js";
import { Experience } from "./Experience.js";
import { Degree } from "./Degree.js";
import { Result } from "./Result.js";
import { Attendance } from "./Attendance.js";
import { Complaint } from "./Complaint.js";
import { NoticeBoard } from "./NoticeBoard.js";

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  firstName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  tempPassword: {
    type: DataTypes.STRING(256),
    allowNull: true,
  },
  schoolId: {
    type: DataTypes.UUID,
    allowNull: true,
    
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  specialization: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  rollNumber: {
    type: DataTypes.STRING(5),
    allowNull: true,
  },
  roleId: {
    type: DataTypes.UUID,
    allowNull: false,
    
  },
  parentEmail: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  isTempPassword: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  system_defined: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  departmentId: {
    type: DataTypes.UUID,
    allowNull: true,
    
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: {
        args: [0, 500],
        msg: "Profile picture URL must be up to 500 characters",
      },
    },
  },
  gender: {
    type: DataTypes.ENUM("male", "female", "other"),
    allowNull: true,
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
}, {
  tableName: 'User',
  timestamps: true,
  updatedAt: 'updatedAt',
  createdAt: 'createdAt',
});

// Associations
User.associations = (models) => {
  User.belongsTo(Department, {
    foreignKey: 'departmentId',
    as: 'department',
    targetKey: 'id',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  });

  User.belongsTo(Role, {
    foreignKey: 'roleId',
    as: 'role',
    targetKey: 'id',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  });

  User.belongsTo(School, {
    foreignKey: 'schoolId',
    as: 'school',
    targetKey: 'id',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  });

  User.belongsToMany(Assignment, {
    through: "StudentAssignment",
    foreignKey: "studentId",
    otherKey: "assignmentId",
    as: "studentAssignments",
  });

  User.hasMany(Invite, {
    foreignKey: 'senderId',
    as: 'sentInvites',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  User.hasMany(Invite, {
    foreignKey: 'receiverId',
    as: 'receivedInvites',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  User.hasMany(RefreshToken, {
    foreignKey: 'userId',
    as: 'refreshTokens',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  User.hasMany(Assignment, {
    foreignKey: 'teacherId',
    as: 'TeacherAssignments',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  User.hasMany(ClassSchedule, {
    foreignKey: 'teacherId',
    as: 'schedules',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  User.hasMany(Permission, {
    foreignKey: 'userId',
    as: 'permissions',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  User.hasMany(Permission, {
    foreignKey: 'setterId',
    as: 'permissionsSetByMe',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  User.hasMany(Experience, {
    foreignKey: 'userId',
    as: 'experiences',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  User.hasMany(Degree, {
    foreignKey: 'userId',
    as: 'degrees',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  User.hasMany(Result, {
    foreignKey: 'studentId',
    as: 'results',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  User.hasMany(Result, {
    foreignKey: 'teacherId',
    as: 'teacherResults',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  User.hasMany(Attendance, {
    foreignKey: 'studentId',
    as: 'attendances',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  User.hasMany(Attendance, {
    foreignKey: 'teacherId',
    as: 'teacherAttendances',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  User.hasMany(Complaint, {
    foreignKey: 'userId',
    as: 'complaints',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  User.hasMany(NoticeBoard, {
    foreignKey: 'userId',
    as: 'notices',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};

export { User };
