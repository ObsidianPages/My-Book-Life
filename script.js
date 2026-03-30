// Book Tracking Functionality

// Book constructor
class Book {
    constructor(title, author, read) {
        this.title = title;
        this.author = author;
        this.read = read;
    }
}

// Book list array
let bookList = [];

// Load books from local storage
function loadBooks() {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    bookList = books.map(book => new Book(book.title, book.author, book.read));
}

// Save books to local storage
function saveBooks() {
    localStorage.setItem('books', JSON.stringify(bookList));
}

// Add a book
function addBook(title, author, read) {
    const newBook = new Book(title, author, read);
    bookList.push(newBook);
    saveBooks();
}

// Delete a book
function deleteBook(index) {
    bookList.splice(index, 1);
    saveBooks();
}

// Edit a book
function editBook(index, title, author, read) {
    const book = bookList[index];
    book.title = title;
    book.author = author;
    book.read = read;
    saveBooks();
}

// Get book statistics
function getStatistics() {
    const totalBooks = bookList.length;
    const readBooks = bookList.filter(book => book.read).length;
    const unreadBooks = totalBooks - readBooks;
    return {
        totalBooks,
        readBooks,
        unreadBooks
    };
}

// Export to CSV
function exportToCSV() {
    const csvContent = 'data:text/csv;charset=utf-8,' + bookList.map(e => `${e.title},${e.author},${e.read}`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'books.csv');
    document.body.appendChild(link);
    link.click();
}

// Initialize the book list
loadBooks();

