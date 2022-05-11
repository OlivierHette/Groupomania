'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Post.hasMany(models.Comment, { foreignKey: 'postId' })
      models.Post.belongsTo(models.User)
      //   , {
      //   // foreignKey: 'idUsers'
      //   // foreignKey: {
      //   //   name: 'userId',
      //   //   allowNull: false
      //   // }
      //   // foreignKey: {
      //   //   allowNull: false
      //   // }
      // })
    }
  }
  Post.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};

/**
 * 
 */