import { DataTypes } from "sequelize";
import sequelize from "../utils/sequelize.js";
import { Class } from "./Class.js";
import { School } from "./School.js";
import { User } from "./User.js";

const Department = sequelize.define(
  "Department",
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
    schoolId: {
      type: DataTypes.UUID,
      allowNull: false,
      
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  { timestamps: true }
);

Department.associate = (models) => {
  Department.belongsTo(models.School, {
    foreignKey: "schoolId",
    as: "school",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Department.hasMany(models.Class, {
    foreignKey: "departmentId",
    as: "classes",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Department.hasMany(models.User, {
    foreignKey: "departmentId",
    as: "users",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export { Department };
