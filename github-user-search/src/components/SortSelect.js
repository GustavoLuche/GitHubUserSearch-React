import React from "react";
import Form from "react-bootstrap/Form";
import { useGithubContext } from "../context/GithubContext";

const SortSelect = () => {
  // Usando o contexto para acessar a função
  const { sortRepos } = useGithubContext();

  const handleSortChange = (event) => {
    const selectedSortOption = event.target.value;
    sortRepos(selectedSortOption);
  };

  return (
    <Form.Select
      value="Sort"
      onChange={handleSortChange}
      aria-label="Default select example"
    >
      <option>Sort</option>
      <option value="lastUpdated">Last Update</option>
      <option value="name">Name</option>
    </Form.Select>
  );
};

export default SortSelect;
