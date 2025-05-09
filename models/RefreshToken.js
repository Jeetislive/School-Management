export default(sequelize,DataTypes) => {
const RefreshToken = sequelize.define('RefreshToken', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true, // Ensure that the token is unique
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'RefreshToken',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  });

return RefreshToken;
};
