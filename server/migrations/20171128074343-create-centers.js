module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Centers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    facilities: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      alloWNull: true,
      defaultValue: [],
    },
    image: {
      type: Sequelize.STRING,
      alloWNull: true,
    },
    states: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'States',
        key: 'id',
        as: 'states',
      }
    },
    createdBy: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'createdBy',
      }
    },
    updatedBy: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'updatedBy',
      }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },

  }),
  down: queryInterface => queryInterface.dropTable('Centers')
};
