export default(sequelize,DataTypes) => {
const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  firstName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  tempPassword: {
    type: DataTypes.STRING(256),
    allowNull: true,
  },
  schoolId: {
    type: DataTypes.UUID,
    allowNull: true,
    
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  specialization: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  rollNumber: {
    type: DataTypes.STRING(5),
    allowNull: true,
  },
  roleId: {
    type: DataTypes.UUID,
    allowNull: false,
    
  },
  parentEmail: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  isTempPassword: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  system_defined: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  departmentId: {
    type: DataTypes.UUID,
    allowNull: true,
    
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: {
        args: [0, 500],
        msg: "Profile picture URL must be up to 500 characters",
      },
    },
  },
  gender: {
    type: DataTypes.ENUM("male", "female", "other"),
    allowNull: true,
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
}, {
  tableName: 'User',
  timestamps: true,
  updatedAt: 'updatedAt',
  createdAt: 'createdAt',
});
return User;
};