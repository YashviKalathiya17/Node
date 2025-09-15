const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  showAddBookForm,
  addBook,
  showEditBookForm,
  updateBook,
  deleteBook
} = require("../controllers/bookController");

// Show all books
router.get("/books", getAllBooks);

// Add book
router.get("/books/add", showAddBookForm);
router.post("/books/add", addBook);

// Edit book
router.get("/books/edit/:id", showEditBookForm);
router.post("/books/edit/:id", updateBook);

// Delete book
router.get("/books/delete/:id", deleteBook);

module.exports = router;
