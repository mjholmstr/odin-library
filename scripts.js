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

    let index = 0;
    myLibrary.forEach(myLibrarys => {
        const card = document.createElement("div");
        card.classList.add("card");
        books.appendChild(card);

        // Create remove book button
        const removeBookButton = document.createElement("button");
        removeBookButton.classList.add("remove-book-button");
        removeBookButton.textContent = "Remove From Library";

        removeBookButton.dataset.linkedArray = index;
        card.appendChild(removeBookButton);

        removeBookButton.addEventListener("click", removeBookFromLibrary);

        function removeBookFromLibrary() {
            let retrieveBookToRemove = removeBookButton.dataset.linkedArray;
            myLibrary.splice(parseInt(retrieveBookToRemove), 1);
            card.remove();
            displayBooksOnPage();
        }
       
        
        // Create read status button
        const readStatusButton = document.createElement("button");
        readStatusButton.classList.add("read-status-button");
        readStatusButton.textContent = "Change Read Status";

        //Link data attribute of toggle read button to array and card
        readStatusButton.dataset.linkedArray = index;
        card.appendChild(readStatusButton);

        readStatusButton.addEventListener("click", toggleReadStatus);

        function toggleReadStatus() {
            let retrieveBookToToggle = readStatusButton.dataset.linkedArray;
            Book.prototype = Object.create(Book.prototype);
            const toggleBook = new Book();
            console.log("Toggle Initial Value", myLibrary[parseInt(retrieveBookToToggle)].read);

            if ((myLibrary[parseInt(retrieveBookToToggle)].read) == "yes") {
                toggleBook.read = "no";
                myLibrary[parseInt(retrieveBookToToggle)].read = toggleBook.read;
            } else if ((myLibrary[parseInt(retrieveBookToToggle)].read) == "no") {
                toggleBook.read = "yes";
                myLibrary[parseInt(retrieveBookToToggle)].read = toggleBook.read;
            }
            displayBooksOnPage();
        }

        for (let key in myLibrarys) {
            console.log(`${key}: ${myLibrarys[key]}`);
            const para = document.createElement("p");
            para.textContent = (`${key}.charAt(0).toUpperCase: ${myLibrarys[key]}`);
            card.appendChild(para);
        }

        index++;
    });
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


