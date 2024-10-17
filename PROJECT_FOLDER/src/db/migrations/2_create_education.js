"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("education", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      employee_id: {
        allowNull: false,
        references: {
          model: "employee",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        type: Sequelize.BIGINT,
      },
      name: {
        type: Sequelize.STRING,
      },
      level: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: [
          "TK",
          "SD",
          "SMP",
          "SMA",
          "Strata 1",
          "Strata 2",
          "Doktor",
          "Profesor",
        ],
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      created_by: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      updated_by: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("education");
  },
};
