module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Module", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    schoolId: {
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
  }, {
    indexes: [{ fields: ["name"] }],
  });
},

  down: async (queryInterface) => {
    await queryInterface.dropTable("Module");
  },
};
