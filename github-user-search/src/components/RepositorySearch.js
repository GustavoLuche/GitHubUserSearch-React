import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { useGithubContext } from "../context/GithubContext";

function RepositorySearch() {
  // Usando o contexto para acessar a função
  const { filterByTerm } = useGithubContext();

  const [searchTerm, setSearchTerm] = useState("");

  // Função para lidar com a pesquisa
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterByTerm(term);
  };

  return (
    <div>
      <Form>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Find a repository..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </InputGroup>
      </Form>
    </div>
  );
}

export default RepositorySearch;
