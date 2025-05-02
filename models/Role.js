// models/Role.js
import { DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize.js';
import { User } from './User.js';
import { School } from './School.js';

const Role = sequelize.define('Role', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    schoolId: {
      type: DataTypes.UUID,
      allowNull: true,
      
    },
  }, {
    tableName: 'Role',
    timestamps: false,
  });

// Associations
Role.associate = (models) => {
    Role.hasMany(models.User, {
      foreignKey: 'roleId',
      sourceKey: 'id',
      as: 'users',
    });
    Role.belongsTo(models.School, {
      foreignKey: 'schoolId',
      as: 'school',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
};

export { Role };
