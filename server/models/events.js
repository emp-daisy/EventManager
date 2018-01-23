const Events = (sequelize, DataTypes) => {
  const EventModel = sequelize.define('Events', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'Events'
  });

  EventModel.associate = (models) => {
    EventModel.belongsTo(models.Centers, {
      foreignKey: 'location',
      onDelete: 'CASCADE',
    });
    EventModel.belongsTo(models.Users, {
      foreignKey: 'createdBy',
      onDelete: 'CASCADE',
    });
  };

  return EventModel;
};
export default Events;
