const imgCoverSelect = document.querySelector("#img-btn");
const inputButton = document.querySelector("#book-cover");
const formCoverPlaceholder = document.querySelector("#form-book-cover");
const bookshelf = document.querySelector(".items");
const addBookForm = document.querySelector(".add-book-form");
const modal = document.querySelector("#add-modal");
const addBookBtn = document.querySelector("#add-book");
const modalCloseBtn = document.querySelector(".modal-close");
const items = document.querySelector(".items");

function Book(title, author, pages, cover, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.cover = cover;
  this.read = read;
}

let myLibrary = JSON.parse(localStorage.getItem('library')) || [];;

function addBook(e) {
  e.preventDefault();
  const bookName = this.querySelector("#book-name").value;
  const bookAuthor = this.querySelector("#book-author").value;
  const bookPages = this.querySelector("#book-pages").value;
  const bookCover = this.querySelector("#form-book-cover").src;
  const bookRead = this.querySelector("#book-read").checked;
  const newBook = new Book(
    bookName,
    bookAuthor,
    bookPages,
    bookCover,
    bookRead
  );
  modal.style.display = "none";
  addBookToLibrary(newBook);
  renderLibrary(myLibrary, bookshelf);
  localStorage.setItem('library', JSON.stringify(myLibrary));
  this.reset();
  formCoverPlaceholder.src = "";
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function removeBook(e) {
  if (!e.target.matches(".remove-book") && !e.target.matches(".remove")) return;
  const itemToRemove = e.target.closest(".item").dataset.index;
  myLibrary.splice(itemToRemove, 1);
  renderLibrary(myLibrary, bookshelf);
  localStorage.setItem('library', JSON.stringify(myLibrary));
}

function toggleRead(e) {
  if (!e.target.matches(".read-label")) return;
  const itemToRead = e.target.closest(".item").dataset.index;
  myLibrary[itemToRead].read = !myLibrary[itemToRead].read;
  localStorage.setItem('library~', JSON.stringify(myLibrary));
}

function renderLibrary(library, items) {
  items.innerHTML = library
    .map((book, i) => {
      return `
  <div data-index=${i} class="item">
    <img src=${book.cover}
        alt="">
    <div class="info">
        <h4>${book.title}</h4>
        <h5>${book.author}</h5>
        <p>Pages: ${book.pages}</p>
    </div>
    <div class="buttons-wrapper">
        <button class="remove">
            <i class="fas fa-times remove-book"></i>
        </button>
        <input class="read" id="read${i}" type="checkbox" ${
        book.read ? "checked" : ""
      }>
        <label class="read-label" for="read${i}"></label>
    </div>
  </div>
    `;
    })
    .join("");
}

addBookForm.addEventListener("submit", addBook);
items.addEventListener("click", removeBook);
items.addEventListener("click", toggleRead);

renderLibrary(myLibrary, bookshelf);

//#########################################################
// cover button
//########################################################
imgCoverSelect.addEventListener("click", () => {
  inputButton.click();
});

inputButton.addEventListener("change", () => {
  let value = inputButton.files[0];
  formCoverPlaceholder.src = URL.createObjectURL(value);
});

//#########################################################
// modal
//########################################################

// When the user clicks on the button, open the modal
addBookBtn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
modalCloseBtn.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
