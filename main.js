(function() {
    let books = [];

    function addBook(event) {
      event.preventDefault();
      const inputBookTitle = document.querySelector("#inputBookTitle");
      const inputBookAuthor = document.querySelector("#inputBookAuthor");
      const inputBookYear = document.querySelector("#inputBookYear");
      const inputBookIsComplete = document.querySelector("#inputBookIsComplete");
      const newBook = {
        id: Date.now(),
        title: inputBookTitle.value,
        author: inputBookAuthor.value,
        year: inputBookYear.value,
        isComplete: inputBookIsComplete.checked
      };
      console.log(newBook);
      books.push(newBook);
      document.dispatchEvent(new Event("bookChanged"));
    }

    function searchBook(event) {
      event.preventDefault();
      const searchBookTitle = document.querySelector("#searchBookTitle");
      const query = searchBookTitle.value;
      if (query) {
        filterBooks(books.filter(book => book.title.toLowerCase().includes(query.toLowerCase())));
      } else {
        filterBooks(books);
      }
    }

    function toggleBookCompletion(event) {
      const bookId = Number(event.target.id);
      const index = books.findIndex(book => book.id === bookId);
      if (index !== -1) {
        books[index] = {
          ...books[index],
          isComplete: !books[index].isComplete
        };
        document.dispatchEvent(new Event("bookChanged"));
      }
    }

    function removeBook(event) {
      const bookId = Number(event.target.id);
      const index = books.findIndex(book => book.id === bookId);
      if (index !== -1) {
        books.splice(index, 1);
        document.dispatchEvent(new Event("bookChanged"));
      }
    }

    function editBook(event) {
      const bookId = Number(event.target.id);
      const index = books.findIndex(book => book.id === bookId);
      if (index !== -1) {
        const updatedTitle = prompt("Enter the updated title", books[index].title);
        const updatedAuthor = prompt("Enter the updated author", books[index].author);
        const updatedYear = prompt("Enter the updated year", books[index].year);
        books[index] = {
          ...books[index],
          title: updatedTitle,
          author: updatedAuthor,
          year: updatedYear,
        };
        console.log(books[index]);
        document.dispatchEvent(new Event("bookChanged"));
      }
    }

    function filterBooks(books) {
      const incompleteBookshelfList = document.querySelector("#incompleteBookshelfList");
      const completeBookshelfList = document.querySelector("#completeBookshelfList");
      incompleteBookshelfList.innerHTML = "";
      completeBookshelfList.innerHTML = "";
      for (const book of books) {
        const bookItem = document.createElement("article");
        bookItem.classList.add("book_item");
        const bookTitle = document.createElement("h2");
        bookTitle.innerText = book.title;
        const bookAuthor = document.createElement("p");
        bookAuthor.innerText = `Penulis: ${book.author}`;
        const bookYear = document.createElement("p");
        bookYear.innerText = `Tahun: ${book.year}`;
        bookItem.appendChild(bookTitle);
        bookItem.appendChild(bookAuthor);
        bookItem.appendChild(bookYear);
        if (book.isComplete) {
          const actionDiv = document.createElement("div");
          actionDiv.classList.add("action");
          const completeButton = document.createElement("button");
          completeButton.id = book.id;
          completeButton.innerText = "Belum Selesai dibaca";
          completeButton.classList.add("green");
          completeButton.addEventListener("click", toggleBookCompletion);
          const removeButton = document.createElement("button");
          removeButton.id = book.id;
          removeButton.innerText = "Hapus buku";
          removeButton.classList.add("red");
          removeButton.addEventListener("click", removeBook);
          const editButton = document.createElement("button");
          editButton.id = book.id;
          editButton.innerText = "Edit buku";
          editButton.classList.add("yellow");
          editButton.addEventListener("click", editBook);
          actionDiv.appendChild(completeButton);
          actionDiv.appendChild(removeButton);
          actionDiv.appendChild(editButton);
          bookItem.appendChild(actionDiv);
          completeBookshelfList.appendChild(bookItem);
        } else {
          const actionDiv = document.createElement("div");
          actionDiv.classList.add("action");
          const incompleteButton = document.createElement("button");
          incompleteButton.id = book.id;
          incompleteButton.innerText = "Selesai dibaca";
          incompleteButton.classList.add("green");
          incompleteButton.addEventListener("click", toggleBookCompletion);
          const removeButton = document.createElement("button");
          removeButton.id = book.id;
          removeButton.innerText = "Hapus buku";
          removeButton.classList.add("red");
          removeButton.addEventListener("click", removeBook);
          const editButton = document.createElement("button");
          editButton.id = book.id;
          editButton.innerText = "Edit buku";
          editButton.classList.add("yellow");
          editButton.addEventListener("click", editBook);
          actionDiv.appendChild(incompleteButton);
          actionDiv.appendChild(removeButton);
          actionDiv.appendChild(editButton);
          bookItem.appendChild(actionDiv);
          incompleteBookshelfList.appendChild(bookItem);
        }
      }
    }

    function saveBooks() {
      localStorage.setItem("books", JSON.stringify(books));
      filterBooks(books);
    }

    window.addEventListener("load", function() {
      books = JSON.parse(localStorage.getItem("books")) || [];
      filterBooks(books);
      const form = document.querySelector("#inputBook");
      const searchForm = document.querySelector("#searchBook");
      form.addEventListener("submit", addBook);
      searchForm.addEventListener("submit", searchBook);
      document.addEventListener("bookChanged", saveBooks);
    });
  })();