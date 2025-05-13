export default(sequelize,DataTypes) => {
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

return NoticeBoard;
};
