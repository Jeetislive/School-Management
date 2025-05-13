export default(sequelize,DataTypes) => {

const Class = sequelize.define('Class', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(155),
    allowNull: false,
  },
  schoolId: {
    type: DataTypes.UUID,
    allowNull: false,
    
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  departmentId: {
    type: DataTypes.UUID,
    allowNull: true,
    
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  }
}, {
  tableName: 'Class',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});
return Class;
};

