export default(sequelize,DataTypes) => {
const StudentAssignment = sequelize.define(
  "StudentAssignment",
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
    assignmentId: {
      type: DataTypes.UUID,
      allowNull: false,
      
    },
    hasSubmitted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    submittedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    submissionFileUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    submissionText: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    editRequested: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    editApproved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    editedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { timestamps: true }
);

return StudentAssignment;
};
