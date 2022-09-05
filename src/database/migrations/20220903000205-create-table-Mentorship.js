"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable("mentorship", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      name: {
        type: Sequelize.STRING,
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
      mentor_id: {
        type: Sequelize.UUID,
        references: { model: "mentor", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
        unique: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable("mentorship");
  },
};
