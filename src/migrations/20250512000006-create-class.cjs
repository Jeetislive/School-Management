module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Class", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    schoolId: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    departmentId: {
      type: Sequelize.UUID,
      allowNull: true,
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
    await queryInterface.dropTable("Class");
  },
};
