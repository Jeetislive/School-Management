module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ClassStudent", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    classId: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    studentId: {
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
    await queryInterface.dropTable("ClassStudent");
  },
};
