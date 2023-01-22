// Odin Project Library App

// div holding all the book cards
const books = document.querySelector(".books");

// add book button
const addBookButton = document.querySelector(".add-book-button");

//add/edit book modal
const modal = document.querySelector("#modal");

// x button to close modal
const closeModal = document.querySelector(".close");

//Declare empty library array
let myLibrary = [];



// Object constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = Math.floor(Math.random() * 1000000);
}

// Add book to library
function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayBooksOnPage();
}

//helper function to create html elements with textcontent and classes
function createBookElement(el, content, className) {
    const element = document.createElement(el);
    element.textContent = content;
    element.setAttribute("class", className);
    return element;
  }

  //helper function to create input checkbox for if book is read w/ event listener
function createReadElement(bookItem, book) {
    let read = document.createElement("div");
    read.setAttribute("class", "book-read");
    read.appendChild(createBookElement("h1", "Read?", "book-read-title"));
    let input = document.createElement("input");
    input.type = "checkbox";
    input.addEventListener("click", (e) => {
      if (e.target.checked) {
        bookItem.setAttribute("class", "card book read-checked");
        book.read = true;
        displayBooksOnPage();
      } else {
        bookItem.setAttribute("class", "card book read-unchecked");
        book.read = false;
        displayBooksOnPage();
      }
    });
    if (book.read) {
      input.checked = true;
      bookItem.setAttribute("class", "card book read-checked");
    }
    read.appendChild(input);
    return read;
  }

  function fillOutEditForm(book) {
    modal.style.display = "block";
    document.querySelector(".form-title").textContent = "Edit Book";
    document.querySelector(".form-add-button").textContent = "Edit";
    document.querySelector(".add-book-form").setAttribute("id", book.id);
    document.querySelector("#book-title").value = book.title || "";
    document.querySelector("#book-author").value = book.author || "";
    document.querySelector("#book-pages").value = book.pages || "";
    document.querySelector("#book-read").checked = book.read;
  }
  
  //create the edit icon w/ event listener
  function createEditIcon(book) {
    const editIcon = document.createElement("img");
    editIcon.src = "pencil.svg";
    editIcon.setAttribute("class", "edit-icon");
    editIcon.addEventListener("click", () => {
      fillOutEditForm(book);
    });
    return editIcon;
  }

  //Function to create all of the book content on the book dom card
function createBookItem(book, index) {
    const bookItem = document.createElement("div");
    bookItem.setAttribute("id", index);
    bookItem.setAttribute("key", index);
    bookItem.setAttribute("class", "card book");
    bookItem.appendChild(
      createBookElement("h1", `Title: ${book.title}`, "book-title")
    );
    bookItem.appendChild(
      createBookElement("h1", `Author: ${book.author}`, "book-author")
    );
    bookItem.appendChild(
      createBookElement("h1", `Pages: ${book.pages}`, "book-pages")
    );
    bookItem.appendChild(createReadElement(bookItem, book));
    bookItem.appendChild(createBookElement("button", "X", "delete"));
    bookItem.appendChild(createEditIcon(book));
  
    bookItem.querySelector(".delete").addEventListener("click", () => {
      deleteBook(index);
    });
  
    books.insertAdjacentElement("afterbegin", bookItem);
  }
  
  //function to render all the books
  function renderBooks() {
    books.textContent = "";
    myLibrary.map((book, index) => {
      createBookItem(book, index);
    });
  }

  function deleteBook(index) {
    myLibrary.splice(index, 1);
    displayBooksOnPage();
  }
  

//Display library array to cards
function displayBooksOnPage() {
    localStorage.setItem("library", JSON.stringify(myLibrary));
    renderBooks();
}

addLocalStorage();



// Display modal to add new book

addBookButton.addEventListener("click", () => {
    modal.style.display = "block";
    document.querySelector(".form-title").textContent = "Add Book";
    document.querySelector(".form-add-button").textContent = "Add";
});

//button to close modal
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// close modal if click elsewhere
window.addEventListener("click", (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
})


// Add form data
const addBookForm = document.querySelector(".add-book-form");
addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    let newBook = {};
    for (let [name, value] of data) {
        if (name === "book-read") {
            newBook["book-read"] = true;
        } else {
            newBook[name] = value || "";
        }
    }

    if (!newBook["book-read"]) {
        newBook["book-read"] = false;
    }

    if (document.querySelector(".form-title").textContent === "Edit Book") {
        let id = e.target.id;
        let editBook = myLibrary.filter((book) => book.id == id)[0];
        editBook.title = newBook["book-title"];
        editBook.author = newBook["book-author"];
        editBook.pages = newBook["book-pages"];
        editBook.read = newBook["book-read"];
        displayBooksOnPage();
    } else {
        addBookToLibrary(
            newBook["book-title"],
            newBook["book-author"],
            newBook["book-pages"],
            newBook["book-read"]
        );
    }
    addBookForm.reset();
    modal.style.display = "none";
});

// add local storage
function addLocalStorage() {
    myLibrary = JSON.parse(localStorage.getItem("library")) || [];
    displayBooksOnPage();
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


