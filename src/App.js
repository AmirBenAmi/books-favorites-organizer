import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import SearchBar from "./components/SearchBar";
import BookItem from "./components/BookItem";
import { Container, Button, Typography } from "@mui/material";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const savedPage = localStorage.getItem("bookListCurrentPage");
    if (savedPage) {
      setCurrentPage(Number(savedPage));
    }
  }, []);

  useEffect(() => {
    const savedPage = localStorage.getItem("bookListCurrentPage");
    if (savedPage) {
      setCurrentPage(Number(savedPage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bookListCurrentPage", currentPage);

    fetchBooks();
  }, [currentPage, query]);

  const fetchBooks = async (query) => {
    const startIndex = (currentPage - 1) * 10;
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}`
      );
      const data = await response.json();
      setBooks(data.items);
      setTotalPages(Math.ceil(data.totalItems / 10));
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };
  //////////////////

  const handleFavoriteToggle = (book) => {
    const isBookFavorite = favorites.some((fav) => fav.id === book.id);
    let newFavorites = [];
    if (isBookFavorite) {
      newFavorites = favorites.filter((fav) => fav.id !== book.id);
    } else {
      newFavorites = [...favorites, book];
    }
    setFavorites(newFavorites);
  };

  const viewFavorites = () => {
    setBooks(favorites);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Container>
      <SearchBar onSearch={fetchBooks} />
      <Button variant="contained" color="primary" onClick={viewFavorites}>
        View Favorites
      </Button>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
      >
        <Button
          variant="contained"
          color="primary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </Button>
        <Typography style={{ margin: "0 20px" }}>Page {currentPage}</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
      {books
        ? books.map((book) => (
            <BookItem
              key={book.id}
              book={book}
              onFavoriteToggle={handleFavoriteToggle}
              isFavorite={favorites.some((fav) => fav.id === book.id)}
            />
          ))
        : null}
    </Container>
  );
}

export default App;
