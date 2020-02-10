'use strict';
module.exports = (sequelize, DataTypes) => {
  // const User = sequelize.define('User', {
  //   name: DataTypes.STRING,
  //   email: DataTypes.STRING,
  //   password: DataTypes.STRING
  // }, {});

  const { Model } = sequelize.Sequelize

  class User extends Model {}

  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, { sequelize, hooks: {

  }})

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};