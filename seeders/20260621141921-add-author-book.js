"use strict";
import { config } from "dotenv";

config();

const bookId = process.env.SEED_BOOK_ID;
const userId = process.env.SEED_USER_ID;

/** @type {import('sequelize-cli').Migration} */
export default {
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
    await queryInterface.bulkInsert("Books", [
      {
        id: bookId,
        title: "Things Fall Apart",
        description: "The Center Cannot Hold",
        isbn: "0123456789",
        publishedYear: "2000",
        genre: "Fiction",
        pageCount: "600",
        price: "20000",
        quantity: 10,
        author: "Chinua Achebe",
        category: "Novel",
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: userId,
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
    await queryInterface.bulkDelete("Books", { id: bookId }, {});
  },
};
