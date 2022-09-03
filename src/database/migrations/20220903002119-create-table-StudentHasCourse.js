"use strict";

const {
  default: StudentHasCourse,
} = require("../../app/models/StudentHasCourseModel");

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable("studentHasCourse", {
      studentId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        references: {
          model: {
            schema: "schema",
            tableName: "StudentModel",
          },
          key: "id",
        },
        allowNull: false,
      },

      mentorshipId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        references: {
          model: {
            schema: "schema",
            tableName: "MentorshipModel",
          },
          key: "id",
        },
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable("studentHasCourse");
  },
};
