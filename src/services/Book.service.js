"use strict";

import { Book } from "../models/Book.model.js";
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

  /**
   * @param {{ title: string; description: string; isbn: string; publishedYear: number; genre: string; pageCount: number; price: number; quantity: number; author: string; category: string }} bookParam
   */
  async createBook(bookParam) {
    try {
      const book = await User.create({ ...bookParam });
      return book.dataValues;
    } catch (err) {
      throw new AppError(400, "Invalid book parameters");
    }
  }

  /**
   * @param {string} id
   * @param {{ title?: string; description?: string; isbn?: string; publishedYear?: number; genre?: string; pageCount?: number; price?: number; quantity?: number; author?: string; category?: string; }} bookParam
   */
  async updatedBook(id, bookParam) {
    try {
      const book = await Book.findOne({ where: { id } });
      if (!book) throw new AppError(404, "Book not found");

      const updatedBook = await book.update({ ...bookParam });
      return updatedBook;
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new AppError(400, "Invalid book parameters");
    }
  }

  /**
   * @param {string} id
   */
  async deleteBook(id) {
    try {
      const book = await Book.findOne({ where: { id } });
      if (!book) throw new AppError(404, "Book not found");

      book.destroy();
      return "Book deleted successfully";
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new AppError(500, "Something went wrong, try again.");
    }
  }
}