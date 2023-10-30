import React from "react";
import Form from "react-bootstrap/Form";
import { useGithubContext } from "../context/GithubContext";

const LanguageSelect = () => {
  // Usando o contexto para acessar o estado e funções
  const { state, filterByLanguage } = useGithubContext();
  const { allLanguages } = state;

  // Função para lidar com a mudança de seleção de linguagem
  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    filterByLanguage(selectedLanguage);
  };

  return (
    <Form className="LanguageSelect">
      <Form.Select
        value="Languages"
        onChange={handleLanguageChange}
        aria-label="Default select example"
      >
        <option>Languages</option>
        <option value="All">All Languages</option>
        {allLanguages.map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </Form.Select>
    </Form>
  );
};

export default LanguageSelect;
