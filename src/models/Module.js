export default(sequelize,DataTypes) => {
const Module = sequelize.define(
  "Module",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [1, 100],
      },
    },
    schoolId: {
      type: DataTypes.UUID,
      allowNull: false,
      
      onDelete: "CASCADE", // When the associated school is deleted, delete the related modules
      onUpdate: "CASCADE", // If the school ID is updated, update it in the module
    },
  },
  { timestamps: true }
);

return Module;
};
