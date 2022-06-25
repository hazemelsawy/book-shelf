import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

const Search = props => {
  const [searchText, setSearchText] = useState("");
  const [searchedBooks, setSearchedBooks] = useState([]);
  const nav = useNavigate();

  const handleSearchTextChange = event => {
    if (searchText.length !== 0) {
      BooksAPI.search(searchText).then(searchedBooks => {
        if (!searchedBooks.error) {
          BooksAPI.getAll().then(myBooks => {
            setSearchedBooks(setDefaultShelves(searchedBooks, myBooks));
          });
        } else {
          setSearchedBooks([]);
        }
      });
    } else if (searchText.length === 0) {
      setSearchedBooks([]);
    }
  };

  const setDefaultShelves = (searchedBooksLocal, myBooks) => {
    return searchedBooksLocal.map(book => {
      for (let i = 0; i < myBooks.length; i++) {
        if (myBooks[i].id === book.id) {
          return { ...book, shelf: myBooks[i].shelf };
        }
      }
      return { ...book, shelf: "none" };
    });
  };

  useEffect(() => {
    handleSearchTextChange()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button className="close-search" onClick={() => nav("/")}>
          Close
        </button>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            onChange={event => setSearchText(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchedBooks &&
            searchedBooks.map((book, index) => (
              <Book
                key={index}
                title={book.title}
                imageUrl={book.imageLinks && book.imageLinks.thumbnail}
                authors={book.authors}
                bookshelf={book.shelf}
                book={book}
                isSearching
              />
            ))}
        </ol>
      </div>
    </div>
  );
};

export default Search;
