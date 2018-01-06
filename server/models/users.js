const Users = (sequelize, DataTypes) => {
  const UserModel = sequelize.define('Users', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isAdmin: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {
    tableName: 'Users'
  });


  UserModel.associate = (models) => {
    UserModel.hasMany(models.Events, {
      foreignKey: 'createdBy',
      onDelete: 'CASCADE',
    });
    UserModel.hasMany(models.Centers, {
      foreignKey: 'createdBy',
      onDelete: 'SET NULL',
    });
  };

  return UserModel;
};
export default Users;
