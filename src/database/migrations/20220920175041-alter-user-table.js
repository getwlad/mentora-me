"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.addColumn("user", "isAdmin", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropColumn("user", "isAdmin");
  },
};
