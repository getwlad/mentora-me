"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.removeColumn("Particulars", "extrovert");
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.addColumn("Particulars", "extrovert", {
      type: Sequelize.ENUM("1", "2", "3"),
      allowNull: false,
    });
  },
};
