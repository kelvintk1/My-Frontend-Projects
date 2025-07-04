const express = require('express');
const app = express();

//Middleware
app.use(express.json())

let books = [
    {
        id: '1',
        title: 'Book 1'
    },
    {
        id: '2',
        title: 'Book 2'
    },
];

// get all books
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to our Bookstore api",
    });
});

// get all books
app.get('/get', (req, res)=>{
    res.json(books)
});

// get a single book
app.get('/get/:id', (req, res)=>{
    const bookId = req.params.id;
    const getSingleBook = books.find((book)=> book.id === bookId);
    if(getSingleBook){
        res.json(getSingleBook)
    }else{
        res.status(404).send('Book not found! please try with different id')
    }
});

// add a new book
app.post('/add', (req, res)=>{
    const newBook = {
        id: (Math.floor(Math.random() * 1000000)).toString(),
        title: `Book ${Math.floor(Math.random() * 1000000)}`
    }
    books.push(newBook);
    res.status(200).json({
        data: newBook,
        message: 'New Book added successfully'
    });
});

// update a book - CORRECTED VERSION
app.put('/update/:id', (req, res)=>{
    // Add this validation check
    if (!req.body || !req.body.title) {
        return res.status(400).json({ message: 'Title is required in request body' });
    }

    const findCurrentBook = books.find((bookItem)=> bookItem.id === req.params.id);
    if(findCurrentBook){
        findCurrentBook.title = req.body.title; // Removed the fallback to keep it simple
        
        res.status(200).json({
            message: `Book with ID ${req.params.id} updated successfully`, // Fixed typo "withh"
            data: findCurrentBook,
        });
    } else {
        res.status(404).json({
            message: `Book not found`,
        });
    }
});

app.delete('/delete/:id', (req,res)=> {
    const findIndexofCurrentBook = books.findIndex(item=> item.id === req.params.id);
    if(findIndexofCurrentBook !== -1){
        const deletedBooks = books.splice(findIndexofCurrentBook, 1);
        res.status(200).json({
            message: 'Book deleted successfully',
            data: deletedBooks[0]
        })
    } else {
        res.status(404).json({
            message: 'Book not found',
        })
    }
})

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server is now running on port ${PORT}`);
});