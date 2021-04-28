"use strict";
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      type: { type: DataTypes.STRING(50), allowNull: false },
      // eventId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {}
  );
  Category.associate = function (models) {
    // Category.hasMany(models.Event, { foreignKey: "eventId" });
    Category.hasMany(models.Event, { foreignKey: "categoryId" });
  };
  return Category;
};
