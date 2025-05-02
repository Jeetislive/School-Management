import { DataTypes } from "sequelize";
import { User } from "./User.js";
import { Class } from "./Class.js";
import { StudentAssignment } from "./StudentAssignment.js";
import sequelize from "../utils/sequelize.js";

const Assignment = sequelize.define(
  "Assignment",
  {
    id: {
      type: DataTypes.STRING(36),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    teacherId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    classId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    schoolId: {
      type: DataTypes.STRING(36),
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
    fileURL: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("draft", "published"),
      allowNull: false,
      defaultValue: "draft",
    },
    maxPoints: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 100,
    },
  },
  {
    tableName: "Assignment",
    timestamps: true,
    updatedAt: "updatedAt",
    createdAt: "createdAt",
  }
);

Assignment.associate = (models) => {
  Assignment.belongsTo(models.User, {
    foreignKey: "teacherId",
    as: "teacher",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Assignment.belongsTo(models.Class, {
    foreignKey: "classId",
    as: "class",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Assignment.belongsTo(models.School, {
    foreignKey: "schoolId",
    as: "school",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Assignment.belongsTo(models.Subject, {
    foreignKey: "subjectId",
    as: "subject",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Assignment.hasMany(models.StudentAssignment, {
    foreignKey: "assignmentId",
    as: "studentAssignments",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export { Assignment };
