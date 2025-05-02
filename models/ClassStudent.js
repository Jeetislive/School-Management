import { DataTypes } from "sequelize";
import { Class } from "./Class.js";
import { User } from "./User.js";
import sequelize from "../utils/sequelize.js";

const ClassStudent = sequelize.define(
  "ClassStudent",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    classId: {
      type: DataTypes.UUID,
      allowNull: false,
      
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    studentId: {
      type: DataTypes.UUID,
      allowNull: false,
      
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    tableName: "ClassStudent",
    timestamps: true,
  }
);

ClassStudent.associate = (models) => {
  ClassStudent.belongsTo(models.Class, {
    foreignKey: "classId",
    as: "class",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  ClassStudent.belongsTo(models.User, {
    foreignKey: "studentId",
    as: "student",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export { ClassStudent };
