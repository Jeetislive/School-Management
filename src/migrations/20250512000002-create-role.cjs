module.exports ={
  up: async (queryInterface, Sequelize) => {
  await queryInterface.createTable("Role", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    schoolId: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    priority: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
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
  await queryInterface.dropTable("Role");
}}