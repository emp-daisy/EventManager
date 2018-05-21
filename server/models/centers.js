const createCenterObject = DataTypes => (
  {
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    facilities: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      alloWNull: true,
      defaultValue: []
    },
    image: {
      type: DataTypes.STRING,
      alloWNull: true
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

const Centers = (sequelize, DataTypes) => {
  const CenterModel = sequelize.define('Centers', createCenterObject(DataTypes), { tableName: 'Centers' });

  CenterModel.associate = (models) => {
    CenterModel.hasMany(models.Events, {
      foreignKey: 'location',
      as: 'events',
      onDelete: 'CASCADE'
    });
    CenterModel.belongsTo(models.States, { foreignKey: 'state' });
    CenterModel.belongsTo(models.Users, { foreignKey: 'createdBy' });
    CenterModel.belongsTo(models.Users, { foreignKey: 'updatedBy' });
  };

  return CenterModel;
};
export default Centers;
