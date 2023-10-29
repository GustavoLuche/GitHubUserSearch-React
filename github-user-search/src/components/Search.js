import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { useGithubContext } from "../context/GithubContext";

function Search() {
  // Usando o contexto para acessar a função
  const { onSearch } = useGithubContext();

  const [searchQuery, setSearchQuery] = useState("");

  // Função para lidar com a pesquisa
  const handleSearch = () => {
    if (typeof onSearch === "function" && searchQuery.trim() !== "") {
      onSearch(searchQuery);
      setSearchQuery("");
    } else {
      console.error("Invalid onSearch function or empty search term.");
    }
  };

  // Manipulador para envio de formulário com Enter
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="App-search mb-4 d-flex justify-content-center">
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <InputGroup.Text
            style={{
              borderTopLeftRadius: "6px",
              borderBottomLeftRadius: "6px",
            }}
          >
            @
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Username"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            variant="outline-light"
            onClick={handleSearch}
            disabled={searchQuery.trim() === ""}
            className="search-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
}

export default Search;
