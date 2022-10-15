'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // async up (queryInterface, Sequelize) {
  //   await queryInterface.addColumn("Posts", "likes", {
  //     type: Sequelize.INTEGER,
  // })
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Posts", "likeUser", {
      type: Sequelize.STRING,
  })
},

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
