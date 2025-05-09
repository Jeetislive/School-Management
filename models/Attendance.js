export default(sequelize,DataTypes) => {
const Attendance = sequelize.define('Attendance', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  studentId: {
    type: DataTypes.UUID,
    allowNull: false,
    
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  teacherId: {
    type: DataTypes.UUID,
    allowNull: false,
    
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  classScheduleId: {
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
}, {
  tableName: 'Attendance',
  timestamps: true,
});
return Attendance;
};
