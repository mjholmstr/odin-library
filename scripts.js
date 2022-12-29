// Odin Project Library App

//Declare empty library array
let myLibrary = [];

// Object constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Add book to library
function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

//Display library array to cards
function displayBooksOnPage() {
    const books = document.querySelector(".books");

    myLibrary.forEach(myLibrary => {
        const card = document.createElement("div");
        card.classList.add("card");
        books.appendChild(card);
        for (let key in myLibrary) {
            console.log(`${key}: ${myLibrary[key]}`);
            const para = document.createElement("p");
            para.textContent = (`${key}: ${myLibrary[key]}`);
            card.appendChild(para);
        }
    })
}

addBookToLibrary("The Hobbit", "Tolkien", "295", "Not");
addBookToLibrary("Liberation Day", "GeorgeSaunders", "242", "Read");
addBookToLibrary("The Hobbit", "Tolkien", "295", "Not");
addBookToLibrary("Liberation Day", "GeorgeSaunders", "242", "Read");
addBookToLibrary("The Hobbit", "Tolkien", "295", "Not");
addBookToLibrary("Liberation Day", "GeorgeSaunders", "242", "Read");

console.log("End of code array contents", myLibrary);

displayBooksOnPage();