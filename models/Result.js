import { DataTypes } from "sequelize";
import sequelize from "../utils/sequelize.js";
import { User } from "./User.js";
import { Class } from "./Class.js";
import { School } from "./School.js";
import { Assignment } from "./Assignment.js";
import { ExamSchedule } from "./ExamSchedule.js";

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

  // Associations
  Result.associate = (models) => {
    Result.belongsTo(models.User, {
      foreignKey: "studentId",
      targetKey: "id",
      as: "student",
    });
    Result.belongsTo(models.User, {
      foreignKey: "teacherId",
      targetKey: "id",
      as: "teacher",
    });
    Result.belongsTo(models.Class, {
      foreignKey: "classId",
      targetKey: "id",
      as: "class",
    });
    Result.belongsTo(models.School, {
      foreignKey: "schoolId",
      targetKey: "id",
      as: "school",
    });
    Result.belongsTo(models.Assignment, {
      foreignKey: "assignmentId",
      targetKey: "id",
      as: "assignment",
    });
    Result.belongsTo(models.ExamSchedule, {
      foreignKey: "examScheduleId",
      targetKey: "id",
      as: "examSchedule",
    });
  };

export { Result };
