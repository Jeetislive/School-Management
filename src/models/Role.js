export default(sequelize,DataTypes) => {
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
    timestamps: true,
  });

// Associations
return Role;
};
