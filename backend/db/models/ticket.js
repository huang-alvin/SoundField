"use strict";
module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define(
    "Ticket",
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      eventId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {}
  );
  Ticket.associate = function (models) {
    Ticket.belongsTo(models.User, { foreignKey: "userId" });
    Ticket.belongsTo(models.Event, { foreignKey: "eventId" });
  };
  return Ticket;
};
