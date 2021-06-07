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

}

const update = async (req, res) => {
    
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

// router.post('/books', passport.authenticate('jwt', { session: false }), create);
// router.put('/books/:id', passport.authenticate('jwt', { session: false }), update);
// router.delete('/books/:id', passport.authenticate('jwt', { session: false }), deleteBook);

module.exports = router;