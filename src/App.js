import React, { useState, useCallback } from "react";
import debounce from "lodash.debounce";
import "./App.css"; // Make sure to create this CSS file with styles provided earlier

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [page, setPage] = useState(1);
  const [numFound, setNumFound] = useState(0);

  const fetchBooks = async (term, pageNum = 1) => {
    if (!term.trim()) {
      setBooks([]);
      setNumFound(0);
      return;
    }
    setLoading(true);
    setError(null);
    setSelectedBook(null);
    setPage(pageNum);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(term)}&page=${pageNum}`
      );
      const data = await response.json();
      setBooks(data.docs.slice(0, 10));
      setNumFound(data.numFound);
    } catch (err) {
      setError("Failed to fetch data");
    }
    setLoading(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchBooks = useCallback(
    debounce((term) => fetchBooks(term, 1), 500),
    []
  );

  const handleInputChange = (e) => {
    const newTerm = e.target.value;
    setSearchTerm(newTerm);
    debouncedFetchBooks(newTerm);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleCloseDetails = () => {
    setSelectedBook(null);
  };

  return (
    <div className="container">
      <h1> Book Finder </h1>
      <input
        type="text"
        placeholder="Enter book title"
        value={searchTerm}
        onChange={handleInputChange}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="cards-container">
        {books.map((book) => (
          <div key={book.key} className="book-card" onClick={() => handleBookClick(book)}>
            {book.cover_i ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={`${book.title} cover`}
                className="book-cover"
              />
            ) : (
              <div className="book-cover">No Image</div>
            )}
            <div className="book-title">{book.title}</div>
            {book.author_name && <div className="book-author">{book.author_name.join(", ")}</div>}
            {book.first_publish_year && <div className="book-year">({book.first_publish_year})</div>}
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => fetchBooks(searchTerm, page - 1)} disabled={page <= 1 || loading}>
          Previous
        </button>
        <span style={{ alignSelf: "center" }}>Page {page}</span>
        <button
          onClick={() => fetchBooks(searchTerm, page + 1)}
          disabled={page >= Math.ceil(numFound / 10) || loading}
        >
          Next
        </button>
      </div>

      {selectedBook && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
          onClick={handleCloseDetails}
        >
          <div
            style={{ backgroundColor: "rgba(245, 240, 230, 0.85)", padding: 25, maxWidth: 600, width: "100%", position: "relative", borderRadius: "15%"}}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={handleCloseDetails} style={{ position: "absolute", top: 10, right:60  }}>
              Close
            </button>

            <h2>{selectedBook.title}</h2>
            {selectedBook.cover_i && (
              <img
                src={`https://covers.openlibrary.org/b/id/${selectedBook.cover_i}-L.jpg`}
                alt={`${selectedBook.title} cover`}
                style={{ width: "100%", maxHeight: 400, objectFit: "contain" }}
              />
            )}
            {selectedBook.author_name && <p>Author(s): {selectedBook.author_name.join(", ")}</p>}
            {selectedBook.first_publish_year && <p>First Published: {selectedBook.first_publish_year}</p>}
            {selectedBook.subject && <p>Subjects: {selectedBook.subject.join(", ")}</p>}
            {selectedBook.publisher && <p>Publisher(s): {selectedBook.publisher.join(", ")}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

