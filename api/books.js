// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Models
const { Book } = require('../models');

// Controllers
const index = async (req, res) => {
    console.log('In /api/books')
    try {
        const allBooks = await Book.find({});

        res.json({ books: allBooks });
    } catch (error) {
        console.log('Error in /api/books');
        console.log(error);
        return res.status(400).json({ message: 'Books not found. Please try again.'});
    }
}

const show = async (req, res) => {
    const { id } = req.params;
    try {
        // look for book by id
    const book = await Book.findById(id);
    res.json({ book });
    } catch (error) {
        console.log('Error in /api/books/:id');
        console.log(error);
        res.status(400).json({ message: 'Book not found. Please try again.'});
    }
}

const create = async (req, res) => {
    const { title, author, price, pages, isbn, genre } = req.body;

    try {
        const newBook = await Book.create(req.body);
        console.log('new book created', newBook);
        res.json({ book: newBook });
    } catch (error) {
        console.log('Error inside POST /api/books');
        console.log(error);
        return res.status(400).json({ message: 'An error has occurred. Please try again.'})
    }
}

const update = async (req, res) => {
    console.log(req.body);
    try {
        // const book = await Book.findOne({ title: req.body.title });
        // console.log(book);

        // book.author = req.body.author;
        // book.pages = req.body.pages;
        // book.isbn = req.body.isbn;
        // book.genre = req.body.genre;
        // book.price = req.body.price;

        // // Save new book info
        // const savedBook = await book.save();

        const updatedBook = await Book.updateOne({ title: req.body.title }, req.body);
        const book = await Book.findOne({title: req.body.title});

        console.log(book);

        res.redirect(`/api/books/${book.id}`);

    } catch (error) {
        console.log('Error in UPDATE route');
        console.log(error);
        return res.status(400).json({ message: 'Could not update. Please try again.'});
    }    
}

const deleteBook = async (req, res) => {
    
}


// GET api/books/test (Public)
router.get('/test', (req, res) => {
    res.json({ msg: 'Books endpoint OK!'});
});

// GET -> api/books
router.get('/', passport.authenticate('jwt', {session: false}), index); 

// GET -> api/books/:id
router.get('/:id', show);

// POST -> api/books
router.post('/', passport.authenticate('jwt', { session: false }), create);

// PUT -> api/books
router.put('/', passport.authenticate('jwt', { session: false }), update);

// router.delete('/books/:id', passport.authenticate('jwt', { session: false }), deleteBook);

module.exports = router;