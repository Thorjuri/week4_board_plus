'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      likes: {
        type: Sequelize.INTEGER
      },
      // likeUser: {
      //   type: Sequelize.STRING,
      //   allowNull: true
      // },
      postId: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      postContent: {
        type: Sequelize.STRING
      },
      postName: {
        type: Sequelize.STRING
      },
      postDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  }
};