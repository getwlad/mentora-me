"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.addColumn("user", "is_admin", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.removeColumn("user", "is_admin");
  },
};
