import { DataTypes } from "sequelize";
import sequelize from "../utils/sequelize.js";
import { Class } from "./Class.js";
import { User } from "./User.js";
import { School } from "./School.js";
import { Subject } from "./Subject.js";
import { Attendance } from "./Attendance.js";

const ClassSchedule = sequelize.define("ClassSchedule", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  classId: {
    type: DataTypes.UUID,
    allowNull: false,
    
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  teacherId: {
    type: DataTypes.UUID,
    allowNull: false,
    
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  schoolId: {
    type: DataTypes.UUID,
    allowNull: false,
    
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  subjectId: {
    type: DataTypes.UUID,
    allowNull: false,
    
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false,
    validate: {
      isAfterStartTime(value) {
        if (this.startTime && value <= this.startTime) {
          throw new Error("End time must be later than start time");
        }
      },
    },
  },
}, {
  tableName: "ClassSchedule",
  timestamps: true,
  createdAt: "createdAt",
  updatedAt: "updatedAt",
});

ClassSchedule.associate = (models) => {
  ClassSchedule.belongsTo(models.Class, {
    foreignKey: "classId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  ClassSchedule.belongsTo(models.User, {
    foreignKey: "teacherId",
    as: "teacher",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  ClassSchedule.belongsTo(models.School, {
    foreignKey: "schoolId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  ClassSchedule.belongsTo(models.Subject, {
    foreignKey: "subjectId",
    as: "subject",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  ClassSchedule.hasMany(models.Attendance, {
    foreignKey: "classScheduleId",
    as: "attendances",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export { ClassSchedule };
