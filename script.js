/*Author: Dylan Parson
    Date: Feb 24, 2021
    Purpose: Library app, user can enter information for books they would like to store
             user can view all books entered, and delete books*/

//Book Constructor
let currentLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addToLibrary() {
  const newBook = new Book();
  const bookForm = document.getElementById("newBook");

  newBook.title = bookForm[0].value;
  newBook.author = bookForm[1].value;
  newBook.pages = bookForm[2].value;

  currentLibrary.push(newBook);
  document.getElementById("newBook").reset();
  addCard();
}
//Creates new card
function addCard() {
  //DOM variables to create new Book card
  const booksElem = document.getElementById("books"); //selects books wrapper
  const newBook = document.createElement("table"); // creates table
  newBook.classList.add("bookCard");

  const bookTitle = document.createElement("tr"); // creates table row for the title
  const bookAuthor = document.createElement("tr"); // creates table row for the author
  const bookPages = document.createElement("tr"); // creates table row for the pages
  const bookRead = document.createElement("tr"); // creates table row for if the user has read the book
  const deleteBook = document.createElement("button");

  for (let i = 0; i < currentLibrary.length; i++) {
    bookTitle.textContent = currentLibrary[i].title;
    bookAuthor.textContent = currentLibrary[i].author;
    bookPages.textContent = currentLibrary[i].pages;
    bookRead.textContent = currentLibrary[i].read;

    deleteBook.setAttribute("value", i);
    deleteBook.textContent = "Delete Book";
  }

  deleteBook.addEventListener("click", () => {
    deleteCurrentBook(deleteBook.value, booksElem);
  });

  newBook.append(bookTitle);
  newBook.append(bookAuthor);
  newBook.append(bookPages);
  newBook.append(bookRead);
  newBook.append(deleteBook);
  booksElem.append(newBook);

}

function deleteCurrentBook(value, booksElem) {
  // delete both the book in the currentLibrary array, along with on the DOM and refresh to show current library
  currentLibrary.splice(value, 1);
  booksElem.textContent = "";
  
  if (currentLibrary.length === 0) { // won't display empty table
    return;
  }
  displayNewLibrary();
}

/* same as addCard function, only the entire thing is in the loop.
   addCard will only display last index of currentLibrary */
function displayNewLibrary() {
  for (let i = 0; i < currentLibrary.length; i++) {
    const booksElem = document.getElementById("books"); //selects books wrapper
    const newBook = document.createElement("table"); // creates list wrapper
    newBook.classList.add("bookCard")
    const bookTitle = document.createElement("tr"); // creates list item for the title
    const bookAuthor = document.createElement("tr"); // creates list item for the author
    const bookPages = document.createElement("tr"); // creates list item for the pages
    const bookRead = document.createElement("tr"); // creates list item for if the user has read the book
    const deleteBook = document.createElement("button");
    bookTitle.textContent = currentLibrary[i].title;
    bookAuthor.textContent = currentLibrary[i].author;
    bookPages.textContent = currentLibrary[i].pages;
    bookRead.textContent = currentLibrary[i].read;

    deleteBook.setAttribute("value", i);
    deleteBook.textContent = "Delete Book";

    deleteBook.addEventListener("click", () => {
      deleteCurrentBook(deleteBook.value, booksElem);
    });

    newBook.append(bookTitle);
    newBook.append(bookAuthor);
    newBook.append(bookPages);
    newBook.append(bookRead);
    newBook.append(deleteBook);
    booksElem.append(newBook);
  }
}