import { DataTypes } from "sequelize";
import sequelize from "../utils/sequelize.js";
import { Permission } from "./Permission.js";
import { School } from "./School.js";

const Module = sequelize.define(
  "Module",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [1, 100],
      },
    },
    schoolId: {
      type: DataTypes.UUID,
      allowNull: false,
      
      onDelete: "CASCADE", // When the associated school is deleted, delete the related modules
      onUpdate: "CASCADE", // If the school ID is updated, update it in the module
    },
  },
  { timestamps: true }
);

// Associations
Module.associate = (models) => {
  Module.hasMany(models.Permission, {
    foreignKey: "moduleId",
    sourceKey: "id",
    as: "permissions",
    onDelete: "CASCADE", // If a module is deleted, delete related permissions
    onUpdate: "CASCADE", // If module ID is updated, update it in the permissions
  });
};

export { Module };
