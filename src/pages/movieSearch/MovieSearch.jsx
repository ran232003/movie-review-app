import React, { useState } from "react";
import MovieList from "./components/MovieList";
import PaginationComponent from "./components/PaginationComponent";
import {
  Form,
  Button,
  Container,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useApiHelper } from "../../global/apiHelper";
import { useDispatch } from "react-redux";
import { SEARCH_MOVIES_URL } from "../../URLS";
import "./MovieSearch.css";
import PageWrapper from "../../global/PageWrapper ";
function MovieSearch() {
  const { handleApiCall } = useApiHelper();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [movieListResponse, setMovieListResponse] = useState([]);
  const [pages, setPages] = useState({ current: 1, total: 1 });

  const fetchMovies = (page = 1) => {
    if (!query.trim()) return;

    console.log(`Searching for: ${query}, Page: ${page}`);

    const searchParams = new URLSearchParams();
    searchParams.append("page", page);
    searchParams.append("query", query);

    let url = `${SEARCH_MOVIES_URL}${searchParams.toString()}`;

    handleApiCall(
      "GET",
      url,
      {},
      (data) => {
        console.log(data.data);
        setMovieListResponse(data.data.results || []);
        setPages({ current: page, total: data.data.total_pages || 1 });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPages({ current: 1, total: 1 });
    fetchMovies(1);
  };

  return (
    <PageWrapper>
      <Container className="d-flex flex-column align-items-center mt-5">
        {/* Search Bar */}
        <Form onSubmit={handleSearch} style={{ width: "50%" }}>
          <InputGroup>
            <FormControl
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search for a movie..."
            />
            <Button type="submit" variant="primary">
              Search
            </Button>
          </InputGroup>
        </Form>

        {/* Movie List */}
        <MovieList movies={movieListResponse} />

        {/* Pagination Component */}
        <PaginationComponent
          currentPage={pages.current}
          totalPages={pages.total}
          onPageChange={fetchMovies}
        />
      </Container>
    </PageWrapper>
  );
}

export default MovieSearch;
