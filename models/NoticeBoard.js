import { DataTypes } from "sequelize";
import sequelize from "../utils/sequelize.js";
import { User } from "./User.js";
import { School } from "./School.js";
import { Department } from "./Department.js";
import { Class } from "./Class.js";

const NoticeBoard = sequelize.define(
  "NoticeBoard",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    notice: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
     
    },
    schoolId: {
      type: DataTypes.UUID,
      allowNull: false,
     
    },
    classId: {
      type: DataTypes.UUID,
      allowNull: true, // Optional field for class-specific notices
     
    },
    departmentId: {
      type: DataTypes.UUID,
      allowNull: true, // Optional field for department-specific notices
     
    },
    status: {
      type: DataTypes.ENUM("Draft", "Published", "Completed"),
      allowNull: false,
      defaultValue: "Draft",
    },
    publishedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn("NOW"), // Use sequelize function for consistency
    },
    file: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field for file attachments
      validate: {
        len: {
          args: [0, 500],
          msg: "File URL must be up to 500 characters",
        },
        is: {
          args: [/^(https?:\/\/)/],
          msg: "File must be a valid URL",
        },
      },
    },
  },
  { timestamps: true }
);

// Associations
NoticeBoard.associate = (models) => {
  NoticeBoard.belongsTo(models.User, {
    foreignKey: "userId",
    targetKey: "id",
    as: "user",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  NoticeBoard.belongsTo(models.School, {
    foreignKey: "schoolId",
    targetKey: "id",
    as: "school",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  NoticeBoard.belongsTo(models.Department, {
    foreignKey: "departmentId",
    targetKey: "id",
    as: "department",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  });

  NoticeBoard.belongsTo(models.Class, {
    foreignKey: "classId",
    targetKey: "id",
    as: "class",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  });
};

export { NoticeBoard };
