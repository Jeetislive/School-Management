export default(sequelize,DataTypes) => {
const Subject = sequelize.define(
  "Subject",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    schoolId: {
      type: DataTypes.UUID,
      allowNull: false,
      
    },
  },
  { timestamps: true }
);

return Subject;
};
