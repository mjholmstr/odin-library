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
    displayBooksOnPage();
}

//Display library array to cards
function displayBooksOnPage() {
    const books = document.querySelector(".books");

    const removeDivs = document.querySelectorAll(".card");
    for (let i = 0; i < removeDivs.length; i++) {
        removeDivs[i].remove();
    }

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

// Display form to add new book
const addBookButton = document.querySelector(".add-book-button");
addBookButton.addEventListener("click", displayForm);

function displayForm() {
    document.getElementById("add-book-form").style.display = "";
}

// Add input to array for new form entry
const submitButton = document.querySelector(".submit-button");
submitButton.addEventListener("click", intakeFormData);

function intakeFormData() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").value;

    // Break out if form is not complete
    if ((title == "") || (author == "") || (pages == "") || (read == "")) {
        return;
    }

    addBookToLibrary(title, author, pages, read);

    document.getElementById("add-book").reset();
}

// Clear/reset form
const clearButton = document.querySelector(".reset-button");
clearButton.addEventListener("click", clearForm);

function clearForm() {
    document.getElementById("add-book").reset();
}



// addBookToLibrary("The Hobbit", "Tolkien", "295", "Not");
// addBookToLibrary("Liberation Day", "GeorgeSaunders", "242", "Read");
// addBookToLibrary("The Hobbit", "Tolkien", "295", "Not");
// addBookToLibrary("Liberation Day", "GeorgeSaunders", "242", "Read");
// addBookToLibrary("The Hobbit", "Tolkien", "295", "Not");
// addBookToLibrary("Liberation Day", "GeorgeSaunders", "242", "Read");

console.log("End of code array contents", myLibrary);

displayBooksOnPage();