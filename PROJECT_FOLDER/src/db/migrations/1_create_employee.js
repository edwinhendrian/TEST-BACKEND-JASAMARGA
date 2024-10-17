"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("employee", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      nik: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
      },
      start_date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      end_date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
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
    await queryInterface.dropTable("employee");
  },
};
