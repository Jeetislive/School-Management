export default(sequelize,DataTypes) => {
const Department = sequelize.define(
  "Department",
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
    schoolId: {
      type: DataTypes.UUID,
      allowNull: false,
      
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  { timestamps: true }
);

return Department;
}
