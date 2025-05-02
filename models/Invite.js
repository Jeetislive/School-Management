import { DataTypes } from "sequelize";
import sequelize from "../utils/sequelize.js";
import { School } from "./School.js";
import { User } from "./User.js";
import { Role } from "./Role.js";

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

// Associations
Invite.associate = (models) => {
  Invite.belongsTo(models.School, { foreignKey: "schoolId", targetKey: "id" });
  Invite.belongsTo(models.User, { foreignKey: "senderId", targetKey: "id" });
  Invite.belongsTo(models.User, { foreignKey: "receiverId", targetKey: "id" });
  Invite.belongsTo(models.Role, { foreignKey: "roleId", targetKey: "id" });
};

export { Invite };
