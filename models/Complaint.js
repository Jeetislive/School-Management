import { DataTypes } from "sequelize";
import sequelize from "../utils/sequelize.js";
import { User } from "./User.js";
import { School } from "./School.js";

const Complaint = sequelize.define('Complaint', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  subject: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  schoolId: {
    type: DataTypes.UUID,
    allowNull: false,
    
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
}, {
  tableName: 'Complaint',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

Complaint.associate = (models) => {
  Complaint.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Complaint.belongsTo(models.School, {
    foreignKey: 'schoolId',
    as: 'school',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};

export { Complaint };
