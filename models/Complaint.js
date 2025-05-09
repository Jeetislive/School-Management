export default(sequelize,DataTypes) => {

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

return Complaint;
};
