module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("RefreshToken", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    token: {
      type: Sequelize.STRING(350),
      allowNull: false,
      unique: true,
    },
    expiresAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });
},

  down: async (queryInterface) => {
    await queryInterface.dropTable("RefreshToken");
  },
};
