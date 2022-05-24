'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.User.hasMany(models.Post , { foreignKey: 'userId' })
      models.User.hasMany(models.Comment, { foreignKey: 'userId' })
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isAdmin:{
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};