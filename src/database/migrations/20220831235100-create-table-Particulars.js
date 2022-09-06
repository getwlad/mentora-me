"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable("Particulars", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      extrovert: {
        type: Sequelize.ENUM("1", "2", "3"),
        allowNull: false,
      },
      theory: {
        type: Sequelize.ENUM("1", "2", "3"),
        allowNull: false,
      },
      practice: {
        type: Sequelize.ENUM("1", "2", "3"),
        allowNull: false,
      },
      mentoring_in_group: {
        type: Sequelize.ENUM("1", "2", "3"),
        allowNull: false,
      },
      mentoring_individual: {
        type: Sequelize.ENUM("1", "2", "3"),
        allowNull: false,
      },
      libras: {
        type: Sequelize.ENUM("1", "2", "3"),
        allowNull: false,
      },
      minority_groups: {
        type: Sequelize.ENUM("1", "2", "3"),
        allowNull: false,
      },
      mentor_id: {
        type: Sequelize.UUID,
        references: { model: "mentor", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        defaultValue: null,
        allowNull: true,
        unique: true,
      },
      student_id: {
        type: Sequelize.UUID,
        references: { model: "student", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        defaultValue: null,
        allowNull: true,
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
    return await queryInterface.dropTable("Particulars");
  },
};
