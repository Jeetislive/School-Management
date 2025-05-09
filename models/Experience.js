export default(sequelize,DataTypes) => {
const Experience = sequelize.define('Experience', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  organization_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  position: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATEONLY,
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
  tableName: 'Experience',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

return Experience;
};