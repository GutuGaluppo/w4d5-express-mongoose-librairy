const express = require('express');
const Book = require('../models/book')
const Publisher = require('../models/publisher')

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
    .populate('_publisher') // change the field "_publisher" by the full document
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
  // // The simple render without the publishers
  // res.render('add-book')

  Publisher.find({}, null, { sort: { name: 1 } })
    .then(publishers => {
      res.render('add-book', { publishers })
    })
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
    _publisher: req.body._publisher,
  })
    .then(book => {
      res.redirect('/books/' + book._id)
    })
})

// Page to display the edit form
router.get('/books/:id/edit', (req, res, next) => {
  Book.findById(req.params.id)
    .then(book => {
      Publisher.find({}, null, { sort: { name: 1 } })
        .then(publishers => {
          res.render('edit-book', { book, publishers })
        })
    })
})

// Route to handle the edit form submission
router.post('/books/:id/edit', (req, res, next) => {
  // Find the book and update it with the info from the form
  Book.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    rating: req.body.rating,
    _publisher: req.body._publisher,
  })
    .then(book => {
      res.redirect('/books/' + book._id)
    })
})

router.get('/books/:id/delete', (req, res, next) => {
  Book.findByIdAndRemove(req.params.id)
    .then(book => {
      res.redirect('/books')
    })
})


module.exports = router;
