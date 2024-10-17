"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("education", [
      {
        employee_id: 1,
        name: "SMKN 7 Jakarta",
        level: "SMA",
        description: "Sekolah Menengah Atas",
        created_by: "admin",
        updated_by: "admin",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        employee_id: 2,
        name: "Universitas Negeri Jakarta",
        level: "Strata 1",
        description: "Sarjana",
        created_by: "admin",
        updated_by: "admin",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
