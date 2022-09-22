"use strict";

const { QueryInterface } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.removeColumn("Particulars", "extrovert");
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.addColumn("Particulars", "extrovert");
  },
};
