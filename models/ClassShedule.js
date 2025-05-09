export default(sequelize,DataTypes) => {

const ClassSchedule = sequelize.define("ClassSchedule", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  classId: {
    type: DataTypes.UUID,
    allowNull: false,
    
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  teacherId: {
    type: DataTypes.UUID,
    allowNull: false,
    
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  schoolId: {
    type: DataTypes.UUID,
    allowNull: false,
    
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  subjectId: {
    type: DataTypes.UUID,
    allowNull: false,
    
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false,
    validate: {
      isAfterStartTime(value) {
        if (this.startTime && value <= this.startTime) {
          throw new Error("End time must be later than start time");
        }
      },
    },
  },
}, {
  tableName: "ClassSchedule",
  timestamps: true,
  createdAt: "createdAt",
  updatedAt: "updatedAt",
});
return ClassSchedule;
};
