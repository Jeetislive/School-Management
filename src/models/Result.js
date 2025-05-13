export default(sequelize,DataTypes) => {
const Result = sequelize.define(
    "Result",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      studentId: {
        type: DataTypes.UUID,
        allowNull: false,
        
      },
      classId: {
        type: DataTypes.UUID,
        allowNull: false,
        
      },
      teacherId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: sequelize.models.User,  // References the User model for teachers
          key: "id",    // Reference the id field of the User model
        },
      },
      schoolId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: sequelize.models.School, // References the School model
          key: "id",     // Reference the id field of the School model
        },
      },
      assignmentId: {
        type: DataTypes.UUID,
        allowNull: true,
        
      },
      examScheduleId: {
        type: DataTypes.UUID,
        allowNull: true,
        
      },
      file: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [1, 500],
            msg: "File path or URL must be between 1 and 500 characters",
          },
          is: {
            args: [/^(https?:\/\/|\/)/],
            msg: "File must be a valid URL or file path",
          },
        },
      },
      grade: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      maxPoints: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      obtainedPoints: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    },
    { timestamps: true }
  );
return Result;
};