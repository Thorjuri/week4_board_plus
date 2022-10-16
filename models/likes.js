'use strict';
const {
  Model
} = require('sequelize');
<<<<<<< HEAD
// const db = require('.');
=======
>>>>>>> 6f0726616573dad4c0b731b9cc390bd278830e04
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Likes.init({
    postId: DataTypes.INTEGER,
    nickname: DataTypes.STRING,
    like: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Likes',
  });
  return Likes;
};