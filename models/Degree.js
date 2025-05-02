import { DataTypes } from "sequelize";
import sequelize from "../utils/sequelize.js";
import { School } from "./School.js";

const Degree = sequelize.define("Degree", {
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
    
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
}, {
  tableName: sequelize.models.Degree,
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

Degree.associate = (models) => {
  Degree.belongsTo(models.School, {
    foreignKey: "schoolId",
    targetKey: "id",
    as: "school",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export { Degree };
