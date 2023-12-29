// Создание массива библиотеки и конструктора

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Создание функции которая сохраняет новый объект книги в массив

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
  loopThroughArray();
}

// Добавлени 3-х книг для теста

addBookToLibrary('World as will and representation', 'Artur Schopenhauer', 576, 'read');
addBookToLibrary('Parerga und Paralipomena', 'Artur Schopenhauer', 522, 'unread');
addBookToLibrary('Walden', 'Henry Thoreau', 262, 'read');


function loopThroughArray() {
  const container = document.querySelector('.library');
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  };
  for (const book of myLibrary) {
    console.log(book);
    const container = document.querySelector('.library');
    const content = document.createElement('div');
    content.classList.toggle('new-book');
    container.appendChild(content);
    const bookTitle = document.createElement('h2');
    bookTitle.textContent = book.title;
    const bookAuthor = document.createElement('p');
    bookAuthor.textContent = 'by ' + book.author;
    const bookPages = document.createElement('p');
    bookPages.textContent = book.pages + ' pages';
    const bookRead = document.createElement('p');
    bookRead.textContent = book.read;
    content.appendChild(bookTitle);
    content.appendChild(bookAuthor);
    content.appendChild(bookPages);
    content.appendChild(bookRead);
  }
}

const btn = document.querySelector('button');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readInput = document.querySelector('#read');
const formBook = document.querySelector('form');

btn.addEventListener('click', () => {
  let readStatus;
  if (readInput.checked) {
    readStatus = 'read';
  } else {
    readStatus = 'unread';
  }
  addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readStatus);
  loopThroughArray();
  formBook.reset();
});
