'use strict';
module.exports = (sequelize, DataTypes) => {
  // const Comic = sequelize.define('Comic', {
  //   title: DataTypes.STRING,
  //   author: DataTypes.STRING,
  //   imageUrl: DataTypes.STRING
  // }, {});

  const { Model } = sequelize.Sequelize
  
  class Comic extends Model {}

  Comic.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, { sequelize })
  
  Comic.associate = function(models) {
    // associations can be defined here
  };
  return Comic;
};