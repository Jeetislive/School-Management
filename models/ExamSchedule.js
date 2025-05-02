import { DataTypes } from "sequelize";
import sequelize from "../utils/sequelize.js";
import { Class } from "./Class.js";
import { School } from "./School.js";
import { User } from "./User.js";
import { Subject } from "./Subject.js";

const ExamSchedule = sequelize.define(
  "ExamSchedule",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    classId: {
      type: DataTypes.UUID,
      allowNull: false,
      
      onDelete: "RESTRICT", // Prevent delete of class if associated exams exist
      onUpdate: "CASCADE", // Update the classId if the class is updated
    },
    schoolId: {
      type: DataTypes.UUID,
      allowNull: false,
      
      onDelete: "RESTRICT", // Prevent delete of school if associated exams exist
      onUpdate: "CASCADE", // Update the schoolId if the school is updated
    },
    invigilatorId: {
      type: DataTypes.UUID,
      allowNull: true,
      
      onDelete: "SET NULL", // Set to null if the invigilator is deleted
      onUpdate: "CASCADE", // Update the invigilatorId if the user is updated
    },
    subjectId: {
      type: DataTypes.UUID,
      allowNull: false,
      
      onDelete: "CASCADE", // Delete the exam schedule if the subject is deleted
      onUpdate: "CASCADE", // Update the subjectId if the subject is updated
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("Midterm", "Final", "Quiz", "Practical", "Other"),
      allowNull: false,
      defaultValue: "Other",
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        isAfter(value) {
          if (value <= this.startTime) {
            throw new Error("End time must be later than start time");
          }
        },
      },
    },
    roomNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

ExamSchedule.associate = (models) => {
  ExamSchedule.belongsTo(models.Class, {
    foreignKey: "classId",
    targetKey: "id",
    onDelete: "RESTRICT", // Prevent deletion if associated with an exam
  });
  ExamSchedule.belongsTo(models.School, {
    foreignKey: "schoolId",
    targetKey: "id",
    onDelete: "RESTRICT", // Prevent deletion if associated with an exam
  });
  ExamSchedule.belongsTo(models.User, {
    foreignKey: "invigilatorId",
    targetKey: "id",
    as: "invigilator",
    onDelete: "SET NULL", // Set to null if invigilator is deleted
  });
  ExamSchedule.belongsTo(models.Subject, {
    foreignKey: "subjectId",
    targetKey: "id",
    onDelete: "CASCADE", // Delete exam schedule if subject is deleted
  });
};

export { ExamSchedule };
