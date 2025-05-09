export default(sequelize,DataTypes) => {
const Invite = sequelize.define(
  "Invite",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    senderId: {
      type: DataTypes.UUID,
      allowNull: false,
      
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    receiverId: {
      type: DataTypes.UUID,
      allowNull: true,
      
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
    schoolId: {
      type: DataTypes.UUID,
      allowNull: false,
      
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
      
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    status: {
      type: DataTypes.ENUM("pending", "accepted", "rejected", "expired"),
      allowNull: false,
      defaultValue: "pending",
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    },
    resendCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  { timestamps: true }
);
return Invite;
};
