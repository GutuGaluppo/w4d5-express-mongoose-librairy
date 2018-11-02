const express = require('express');
const Book = require('../models/book')

const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/about', (req, res, next) => {
  res.render('about');
});

router.get('/books', (req, res, next) => {
  // Get all the books from the db
  Book.find()
    .then(booksFromDb => {
      // booksFromDb is the array of documents representing the books
      res.render("books", {
        listOfBooks: booksFromDb
      })
    })
});

// Detail of a book
// It matches routes like:
//    /books/5bdc1d2b08d8e13764b49bc9
//    /books/thisIsAWrongId
router.get('/books/:id', (req, res, next) => {
  let id = req.params.id // the id from the url
  Book.findById(id)
    .then(bookFromDb => {
      res.render('book-detail', {
        book: bookFromDb
      })
    })
    .catch(error => {
      next(error)
    })
})

// The route to display the form
router.get('/add-book', (req, res, next) => {
  res.render('add-book')
})

// The route to handle the form
router.post('/add-book', (req, res, next) => {
  // If there is an empty title
  if (!req.body.title) {
    res.render('add-book', {
      error: "The title must be filled"
    })
    return
  }

  // Create a book in the db with the information from the form
  Book.create({
    title: req.body.title, // the title entered in "<input type="text" name="title">"
    description: req.body.description,
    author: req.body.author,
    rating: req.body.rating,
  })
    .then(book => {
      res.redirect('/books/' + book._id)
    })
})

module.exports = router;
