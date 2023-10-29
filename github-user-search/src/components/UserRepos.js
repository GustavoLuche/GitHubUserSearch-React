import React from "react";
import Card from "react-bootstrap/Card";
import SortSelect from "../components/SortSelect";
import LanguageSelect from "../components/LanguageSelect";
import { useGithubContext } from "../context/GithubContext";

const UserRepos = () => {
  // Usando o contexto para acessar o estado
  const { state } = useGithubContext();
  const { userRepos, currentPage, itemsPerPage } = state;

  // Calcular o índice do primeiro item na página atual
  const startIndex = (currentPage - 1) * itemsPerPage;

  // Filtrar a lista de repositories para exibir apenas os itens da página atual
  const userReposToDisplay = userRepos.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="App-user-repos mb-3">
      {userRepos.length > 0 && (
        <>
          <SortSelect />
          <LanguageSelect />
          <h2 className="text-uppercase text-center" style={{ color: "#fff" }}>
            Repositories
          </h2>
          {userReposToDisplay.map((repo) => (
            <Card
              key={repo.id}
              text="white"
              className="mb-2"
              style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            >
              <Card.Body>
                <Card.Title>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.name}
                  </a>
                </Card.Title>
                {repo.description && (
                  <Card.Text className="mb-2">{repo.description}</Card.Text>
                )}
                {repo.language && (
                  <Card.Text className="mb-1">
                    <strong>Language:</strong> {repo.language}
                  </Card.Text>
                )}
                <Card.Text className="mb-1">
                  <strong>Last Updated:</strong>{" "}
                  {new Date(repo.pushed_at).toLocaleDateString()}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </>
      )}
    </div>
  );
};

export default UserRepos;
