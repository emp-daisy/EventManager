module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'verify', Sequelize.STRING);
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Users', 'verify');
  }
};
