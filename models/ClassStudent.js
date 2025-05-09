export default(sequelize,DataTypes) => {
const ClassStudent = sequelize.define(
  "ClassStudent",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    classId: {
      type: DataTypes.UUID,
      allowNull: false,
      
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    studentId: {
      type: DataTypes.UUID,
      allowNull: false,
      
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    tableName: "ClassStudent",
    timestamps: true,
  }
);
return ClassStudent;
}
