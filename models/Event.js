import { DataTypes } from "sequelize";
import sequelize from "../utils/sequelize.js";
import { Class } from "./Class.js";
import { School } from "./School.js";

const Event = sequelize.define(
  "Event",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    classId: {
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
  },
  {
    tableName: sequelize.models.Event,
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

Event.associate = () => {
  Event.belongsTo(models.Class, {
    foreignKey: "classId",
    as: "class",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  Event.belongsTo(models.School, {
    foreignKey: "schoolId",
    as: "school",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export { Event };
