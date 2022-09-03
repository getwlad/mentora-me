"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable("Interest_Area", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      mentoring_area: {
        type: Sequelize.ENUM(
          "PROGRAMAÇÃO",
          "BANCO DE DADOS",
          "DESGINER UX",
          "SEGURANÇA DA INFORMACÃO",
          "QUALIDADE DE SOFTWARE"
        ),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable("Interest_Area");
  },
};
