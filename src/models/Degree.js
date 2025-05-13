export default(sequelize,DataTypes) => {
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

return Degree;
}
