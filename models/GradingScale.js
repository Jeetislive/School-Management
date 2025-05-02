import { DataTypes } from "sequelize";
import sequelize from "../utils/sequelize.js";
import { School } from "./School.js";

const GradingScale = sequelize.define(
  "GradingScale",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    schoolId: {
      type: DataTypes.UUID,
      allowNull: false,
      
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    scale: {
      type: DataTypes.JSON,
      allowNull: false, // e.g., { "A": [90, 100], "B": [80, 89] }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  { timestamps: true }
);

// Associations
GradingScale.associate = (models) => {
  GradingScale.belongsTo(models.School, {
    foreignKey: "schoolId",
    targetKey: "id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export { GradingScale };
