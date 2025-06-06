function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
};

const myLibrary = [];

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    const bookshelf = document.getElementById('bookshelf');
    bookshelf.innerHTML = '';

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.dataset.index = index;
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read: <span class="read-status">${book.read ? 'Yes' : 'No'}</span></p>
            <button class="remove-btn">Remove</button>
            <button class="toggle-read-btn">${book.read ? 'Mark as Unread' : 'Mark as Read'}</button>
        `;
        bookshelf.appendChild(bookCard);

        const removeBtn = bookCard.querySelector('.remove-btn');
        const toggleReadBtn = bookCard.querySelector('.toggle-read-btn');

        removeBtn.addEventListener('click', () => removeBook(index));
        toggleReadBtn.addEventListener('click', () => toggleReadStatus(index));
    });
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

function toggleReadStatus(index) {
    myLibrary[index].toggleRead();
    displayBooks();
}

const newBookBtn = document.getElementById('newBookBtn');
const bookDialog = document.getElementById('bookDialog');
const bookForm = document.getElementById('bookForm');
const cancelBtn = document.getElementById('cancelBtn');

newBookBtn.addEventListener('click', () => {
    bookDialog.showModal();
});

cancelBtn.addEventListener('click', () => {
    bookDialog.close();
});

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = parseInt(document.getElementById('pages').value);
    const read = document.getElementById('read').checked;

    addBookToLibrary(title, author, pages, read);
    bookForm.reset();
    bookDialog.close();
});

// Initial books
addBookToLibrary("Eloquent JavaScript", "Marijn Haverbeke", 472, false);
addBookToLibrary("You Don't Know JS: Up & Going", "Kyle Simpson", 88, false);
addBookToLibrary("JavaScript: The Good Parts", "Douglas Crockford", 176, true);
addBookToLibrary("JavaScript: The Definitive Guide", "David Flanagan", 706, false);
addBookToLibrary("Clean Code in JavaScript", "James Padolsey", 410, false);
addBookToLibrary("HTML and CSS: Design and Build Websites", "Jon Duckett", 490, false);
addBookToLibrary("CSS Secrets", "Lea Verou", 392, false);
addBookToLibrary("HTML5: The Missing Manual", "Matthew MacDonald", 518, true);
addBookToLibrary("CSS: The Definitive Guide", "Eric A. Meyer & Estelle Weyl", 1090, false);
addBookToLibrary("Learning Web Design", "Jennifer Niederst Robbins", 808, false);

displayBooks();

const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
}

scrollToTopBtn.addEventListener("click", function(){
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});