/*Author: Dylan Parson
    Date: Feb 24, 2021
    Purpose: Library app, user can enter information for books they would like to store
             user can view all books entered, and delete books*/
//localStorage.clear();
let currentLibrary = [];
console.log(localStorage);
//Book Constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = true;
}
window.addEventListener('load', () =>{
  if (localStorage.length > 0){
    for(let i = 0; i < localStorage.length; i++){
      let key = localStorage.key(i);
      currentLibrary.push(JSON.parse(localStorage.getItem(key)));
    }
    displayNewLibrary();
  }
});

const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", () =>{
  localStorage.clear();
  currentLibrary.length = 0;
  window.location.reload();
});

const bookForm = document.getElementById("newBookForm");
bookForm.addEventListener("submit", addToLibrary);

function addToLibrary() {
  const newBook = new Book();

  newBook.title = bookForm.querySelector("#title").value;
  newBook.author = bookForm.querySelector("#author").value;
  newBook.pages = bookForm.querySelector("#pages").value;
  
  currentLibrary.push(newBook);
  
  localStorage.setItem(JSON.stringify(currentLibrary[currentLibrary.length - 1].title), JSON.stringify(currentLibrary[currentLibrary.length - 1]));

  console.table(localStorage.getItem(JSON.stringify(newBook.title)));
  
  document.getElementById("newBookForm").reset();
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
  const bookRead = document.createElement("button"); // creates table row for if the user has read the book
  const deleteBook = document.createElement("button");

  for (let i = 0; i < currentLibrary.length; i++) {
    bookTitle.textContent = currentLibrary[i].title;
    bookAuthor.textContent = currentLibrary[i].author;
    bookPages.textContent = currentLibrary[i].pages;
    bookRead.textContent = currentLibrary[i].read ? "Finished" : "Not Finished";
    bookRead.classList.add("finished");
    deleteBook.setAttribute("value", i);
    deleteBook.textContent = "Delete Book";
    deleteBook.classList.add("delete");
  }

  deleteBook.addEventListener("click", () => {
    deleteCurrentBook(deleteBook.value, booksElem);
  });

  bookRead.addEventListener("click", () => {
    currentLibrary[deleteBook.value].read = !currentLibrary[deleteBook.value].read; //toggles read status
    bookRead.textContent = currentLibrary[deleteBook.value].read
      ? "Finished"
      : "Not Finished";
    
    bookRead.classList.toggle("notFinished");

    console.log(currentLibrary[deleteBook.value].read);
  });

  newBook.append(bookTitle);
  newBook.append(bookAuthor);
  newBook.append(bookPages);
  newBook.append(bookRead);
  newBook.append(deleteBook);
  booksElem.append(newBook);
}

function deleteCurrentBook(value, booksElem) {
  console.table(currentLibrary[value].title);
  localStorage.removeItem(JSON.stringify(currentLibrary[value].title));
  console.table(localStorage);
  // delete both the book in the currentLibrary array, along with on the DOM and refresh to show current library
  currentLibrary.splice(value, 1);
  booksElem.textContent = "";
  
  if (currentLibrary.length === 0) {
    // won't display empty table
    return;
  }
  
  displayNewLibrary();
}

  //same as addCard function, only the entire thing is in the loop.
  //addCard will only display last index of currentLibrary 
function displayNewLibrary() {
  //DOM variables to create new Book card
  for (let i = 0; i < currentLibrary.length; i++) {
    const booksElem = document.getElementById("books"); //selects books wrapper
    const newBook = document.createElement("table"); // creates table
    newBook.classList.add("bookCard");

    const bookTitle = document.createElement("tr"); // creates table row for the title
    const bookAuthor = document.createElement("tr"); // creates table row for the author
    const bookPages = document.createElement("tr"); // creates table row for the pages
    const bookRead = document.createElement("button"); // creates table row for if the user has read the book
    const deleteBook = document.createElement("button");

    bookTitle.textContent = currentLibrary[i].title;
    bookAuthor.textContent = currentLibrary[i].author;
    bookPages.textContent = currentLibrary[i].pages;
    bookRead.textContent = currentLibrary[i].read ? "Finished" : "Not Finished";
    currentLibrary[i].read
      ? bookRead.classList.add("finished")
      : bookRead.classList.add("notFinished");

    deleteBook.setAttribute("value", i);
    deleteBook.textContent = "Delete Book";
    deleteBook.classList.add("delete");

    deleteBook.addEventListener("click", () => {
      deleteCurrentBook(deleteBook.value, booksElem);
    });

    bookRead.addEventListener("click", () => {
      currentLibrary[deleteBook.value].read = !currentLibrary[deleteBook.value]
        .read;

        if(currentLibrary[deleteBook.value].read === true){
          bookRead.textContent = "Finished"
          bookRead.classList = "finished";
        }
        else {
          bookRead.textContent = "Not Finished"
          bookRead.classList = "notFinished";
        }
    });

    newBook.append(bookTitle);
    newBook.append(bookAuthor);
    newBook.append(bookPages);
    newBook.append(bookRead);
    newBook.append(deleteBook);
    booksElem.append(newBook);
  }
}
