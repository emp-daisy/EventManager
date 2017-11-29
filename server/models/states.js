const States = (sequelize, DataTypes) => {
  const StatesModel = sequelize.define('States', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  }, {
    tableName: 'States'
  });


  StatesModel.associate = (models) => {
    StatesModel.hasMany(models.Centers, {
      foreignKey: 'states',
    });
  };

  return StatesModel;
};
export default States;
