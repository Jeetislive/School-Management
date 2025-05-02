import { DataTypes } from "sequelize";
import sequelize from "../utils/sequelize.js";
import { School } from "./School.js";
import { ClassSchedule } from "./ClassShedule.js";
import { ExamSchedule } from "./ExamSchedule.js";
import { Assignment } from "./Assignment.js";

const Subject = sequelize.define(
  "Subject",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    schoolId: {
      type: DataTypes.UUID,
      allowNull: false,
      
    },
  },
  { timestamps: true }
);

// Associations
Subject.associate = (models) => {
  Subject.belongsTo(models.School, {
    foreignKey: "schoolId",
    targetKey: "id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  
  Subject.hasMany(models.ClassSchedule, {
    foreignKey: "subjectId",
    sourceKey: "id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  Subject.hasMany(models.ExamSchedule, {
    foreignKey: "subjectId",
    sourceKey: "id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  Subject.hasMany(models.Assignment, {
    foreignKey: "subjectId",
    sourceKey: "id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export { Subject };
