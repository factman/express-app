"use strict";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn("Users", "bio");
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.addColumn("Users", "bio", {
      type: Sequelize.DataTypes.TEXT,
      allowNull: true,
    });
  },
};
