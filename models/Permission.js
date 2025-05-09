export default(sequelize,DataTypes) => {
const Permission = sequelize.define(
  "Permission",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      
    },
    setterId: {
      type: DataTypes.UUID,
      allowNull: false,
      
    },
    moduleId: {
      type: DataTypes.UUID,
      allowNull: false,
      
    },
    targetId: {
      type: DataTypes.UUID,
      allowNull: false,
      // If the targetId can be related to different entities (e.g., classId, schoolId),
      // you may need to add logic for dynamic references or custom constraints.
    },
    action: {
      type: DataTypes.ENUM("read", "write", "delete", "manage-all"),
      allowNull: false,
    },
    scope: {
      type: DataTypes.ENUM("specific", "all"),
      allowNull: false,
      defaultValue: "specific",
    },
  },
  { timestamps: true }
);

return Permission;
};