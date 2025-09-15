const Book = require("../models/Book");

// Show all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.render("books", { books });
  } catch (err) {
    console.error(err);
    res.send("Error fetching books");
  }
};

// Show add form
exports.showAddBookForm = (req, res) => {
  res.render("addBook");
};

// Add new book
exports.addBook = async (req, res) => {
  try {
    const { title, author, price, category, stock, image } = req.body;
    const book = new Book({ title, author, price, category, stock, image });
    await book.save();
    res.redirect("/books");
  } catch (err) {
    console.error(err);
    res.send("Error adding book");
  }
};

// Show edit form
exports.showEditBookForm = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.send("Book not found!");
    res.render("editBook", { book });
  } catch (err) {
    console.error(err);
    res.send("Error loading edit page");
  }
};

// Update book
exports.updateBook = async (req, res) => {
  try {
    const { title, author, price, category, stock, image } = req.body;
    await Book.findByIdAndUpdate(req.params.id, {
      title, author, price, category, stock, image
    });
    res.redirect("/books");
  } catch (err) {
    console.error(err);
    res.send("Error updating book");
  }
};

// Delete book
exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect("/books");
  } catch (err) {
    console.error(err);
    res.send("Error deleting book");
  }
};
