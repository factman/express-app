"use strict";

import { Book } from "../models/Book.model";
import { AppError } from "../helpers/errorHandlers.js";

export class BookService {
  async getBooks() {
    try {
      const books = await Book.findAll({
        attributes: { exclude: "quantity" },
      });
      return books.map((book) => book.dataValues);
    } catch (err) {
      throw new AppError(500, "Something went wrong, try again.");
    }
  }

  /**
   * @param {string} id
   */
  async getBook(id) {
    try {
      const book = await Book.findOne({
        attributes: { exclude: "quantity" },
        where: { id },
      });
      if (!book) throw new AppError(404, "Book not found");

      return book.dataValues;
    } catch (err) {
      throw new AppError(500, "Something went wrong, try again.");
    }
  }
}
/**
 * @param {{ title: string; description: string; isbn: string; publishedYear: integer; genre: string;   }}
 */
