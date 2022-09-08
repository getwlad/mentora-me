"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.addColumn("Mentor", "interest_area_id", {
      type: Sequelize.UUID,
      references: { model: "InterestArea", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.removeColumn("Mentor", "interest_area_id");
  },
};
