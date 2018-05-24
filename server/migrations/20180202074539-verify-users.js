module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Users', 'verify', Sequelize.STRING),

  down: queryInterface => queryInterface.removeColumn('Users', 'verify')
};
