"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("employee_family", {
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
      identifier: {
        type: Sequelize.STRING,
      },
      job: {
        type: Sequelize.STRING,
      },
      place_of_birth: {
        type: Sequelize.STRING,
      },
      date_of_birth: {
        type: Sequelize.DATEONLY,
      },
      religion: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ["Islam", "Katolik", "Budha", "Protestan", "Hindu", "Konghucu"],
      },
      is_life: {
        type: Sequelize.BOOLEAN,
      },
      is_divorced: {
        type: Sequelize.BOOLEAN,
      },
      relation_status: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ["Suami", "Istri", "Anak", "Anak Sambung"],
      },
      created_by: {
        type: Sequelize.STRING,
      },
      updated_by: {
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
    await queryInterface.dropTable("employee_family");
  },
};
