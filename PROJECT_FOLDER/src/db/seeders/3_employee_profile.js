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
    await queryInterface.bulkInsert("employee_profile", [
      {
        employee_id: 1,
        place_of_birth: "Jakarta",
        date_of_birth: "1997-05-02",
        gender: "Laki-Laki",
        is_married: true,
        prof_pict: null,
        created_by: "admin",
        updated_by: "admin",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        employee_id: 2,
        place_of_birth: "Sukabumi",
        date_of_birth: "1996-05-02",
        gender: "Laki-Laki",
        is_married: false,
        prof_pict: null,
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
