"use strict";
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      categoryId: { type: DataTypes.INTEGER, allowNull: false },
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      start_date: { type: DataTypes.DATE, allowNull: false },
      end_date: { type: DataTypes.DATE, allowNull: false },
      location: { type: DataTypes.TEXT, allowNull: false },
      price: { type: DataTypes.INTEGER, allowNull: false },
      capacity: { type: DataTypes.INTEGER, allowNull: false },
      age_limit: { type: DataTypes.INTEGER, allowNull: false },
      image: { type: DataTypes.TEXT, allowNull: false },
    },
    {}
  );
  Event.associate = function (models) {
    Event.hasMany(models.Ticket, { foreignKey: "eventId" });
    Event.belongsTo(models.User, { foreignKey: "userId" });
    Event.belongsTo(models.Category, { foreignKey: "categoryId" });
    Event.hasMany(models.Bookmark, { foreignKey: "eventId" });
  };
  return Event;
};
