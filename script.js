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
}


// Создание функции отображения каждой книги на странице

function displayAllBooks() {
  // console.clear();
  const container = document.querySelector('.library');
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  };

  // Проход по массиву для отображения
  for (const book of myLibrary) {
    console.log(book);

    const container = document.querySelector('.library');
    const content = document.createElement('div');
    content.classList.toggle('new-book');
    content.setAttribute('data-index', myLibrary.indexOf(book));
    container.appendChild(content);

    const bookTitle = document.createElement('h2');
    bookTitle.textContent = book.title;

    const bookAuthor = document.createElement('p');
    bookAuthor.textContent = 'by ' + book.author;

    const bookPages = document.createElement('p');
    bookPages.textContent = book.pages + ' pages';

    const bookRead = document.createElement('p');
    if (book.read) {
      bookRead.textContent = 'already read';
    } else {
      bookRead.textContent = 'not read yet';
    }

    const removeBtn = document.createElement('button');
    removeBtn.classList.toggle('remove-button');
    removeBtn.textContent = 'Remove book';

    removeBtn.addEventListener('click', () => {
      myLibrary.splice(content.dataset.index, 1);
      displayAllBooks();
      });
    // console.log('Add remove button');
    
    content.appendChild(bookTitle);
    content.appendChild(bookAuthor);
    content.appendChild(bookPages);
    content.appendChild(bookRead);
    content.appendChild(removeBtn);
  }
}


// Добавлени 3-х книг для теста

addBookToLibrary('World as will and representation', 'Artur Schopenhauer', 576, true);
addBookToLibrary('Parerga und Paralipomena', 'Artur Schopenhauer', 522, false);
addBookToLibrary('Walden', 'Henry Thoreau', 262, true);

displayAllBooks();


// Добавление книги из формы

const btnForm = document.querySelector('.add-button');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readInput = document.querySelector('#read');
const formBook = document.querySelector('form');


btnForm.addEventListener('click', () => {
  let readStatus;
  readInput.checked ? readStatus = true : readStatus = false;
  addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readStatus);
  displayAllBooks();
  // formBook.reset();
});