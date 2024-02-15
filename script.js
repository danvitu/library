const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  changeStatus() {
    this.read = !this.read;
  }
}

// Создание функции которая сохраняет новый объект книги в массив

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

// Создание функции отображения каждой книги на странице

function displayAllBooks() {
  // Очищаем отображение

  const container = document.querySelector(".library");
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }

  // Проход по массиву для отображения библиотеки

  for (const book of myLibrary) {
    console.log(book);

    const container = document.querySelector(".library");
    const content = document.createElement("div");
    content.classList.toggle("new-book");
    content.setAttribute("data-index", myLibrary.indexOf(book));
    container.appendChild(content);

    const bookTitle = document.createElement("h2");
    bookTitle.textContent = book.title;

    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = "by " + book.author;

    const bookPages = document.createElement("p");
    bookPages.textContent = book.pages + " pages";

    const bookRead = document.createElement("p");
    if (book.read) {
      bookRead.textContent = "already read";
      bookRead.style.color = "green";
    } else {
      bookRead.textContent = "not read yet";
      bookRead.style.color = "red";
    }

    // Добавление кнопок

    const buttons = document.createElement("div");
    buttons.classList.toggle("buttons");

    const changeBtn = document.createElement("button");
    changeBtn.classList.toggle("change-status-button");
    changeBtn.textContent = "Change status";

    changeBtn.addEventListener("click", () => {
      book.changeStatus();
      displayAllBooks();
    });

    const removeBtn = document.createElement("button");
    removeBtn.classList.toggle("remove-button");
    removeBtn.textContent = "Remove book";

    removeBtn.addEventListener("click", () => {
      myLibrary.splice(content.dataset.index, 1);
      displayAllBooks();
    });

    content.appendChild(bookTitle);
    content.appendChild(bookAuthor);
    content.appendChild(bookPages);
    content.appendChild(bookRead);
    content.appendChild(buttons);
    buttons.appendChild(changeBtn);
    buttons.appendChild(removeBtn);
  }
}

// Добавление 3-х книг для тестирования

addBookToLibrary(
  "World as will and representation",
  "Artur Schopenhauer",
  576,
  true
);
addBookToLibrary("Parerga und Paralipomena", "Artur Schopenhauer", 522, false);
addBookToLibrary("Walden", "Henry Thoreau", 262, true);

displayAllBooks();

// Добавление новой книги из формы

const btnForm = document.querySelector(".add-button");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");
const formBook = document.querySelector("form");

btnForm.addEventListener("click", (event) => {
  if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity("Please, enter book title!");
  } else {
    titleInput.setCustomValidity("");
  }

  if (authorInput.validity.valueMissing) {
    authorInput.setCustomValidity("Please, enter author's name");
  } else {
    authorInput.setCustomValidity("");
  }

  if (
    pagesInput.validity.rangeOverflow ||
    pagesInput.validity.rangeUnderflow ||
    pagesInput.validity.valueMissing
  ) {
    pagesInput.setCustomValidity("Please, enter from 1 to 5000 pages!");
  } else {
    pagesInput.setCustomValidity("");
  }
});

formBook.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("All is okay");
  let readStatus;
  readInput.checked ? (readStatus = true) : (readStatus = false);
  addBookToLibrary(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    readStatus
  );
  displayAllBooks()
});
