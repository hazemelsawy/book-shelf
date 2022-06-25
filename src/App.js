import "./App.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import * as BooksAPI from "./BooksAPI";
import Bookshelf from "./Bookshelf";


const bookshelves = [
  { title: "Currently Reading", shelfName: "currentlyReading" },
  { title: "Want to Read", shelfName: "wantToRead" },
  { title: "Read", shelfName: "read" }
];

const App = () => {
  const [books, setBooks] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    BooksAPI.getAll().then(booksFromApi => {
      setBooks(booksFromApi);
    });
  }, []);

  return (
        <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {bookshelves.map((bookshelf, index) => (
                  <Bookshelf
                    key={index}
                    title={bookshelf.title}
                    books={
                      books &&
                      books.filter(
                        book => book && book.shelf === bookshelf.shelfName
                      )
                    }
                    setBooks={setBooks}
                  />
                ))}
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => nav("/search")}>Add a book</button>
            </div>
          </div>
        </div>
  );
};

export default App;
