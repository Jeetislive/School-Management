export default(sequelize,DataTypes) => {
  const Assignment = sequelize.define(
    "Assignment",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      dueDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      teacherId: {
        type: DataTypes.UUID,
        allowNull: false,
        
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      classId: {
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
      subjectId: {
        type: DataTypes.UUID,
        allowNull: false,
        
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      fileURL: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("draft", "published"),
        allowNull: false,
        defaultValue: "draft",
      },
      maxPoints: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 100,
      },
    },
    {
      tableName: "Assignment",
      timestamps: true,
      updatedAt: "updatedAt",
      createdAt: "createdAt",
    }
  );
  return Assignment;
}



