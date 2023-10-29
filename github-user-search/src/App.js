import React from "react";
import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import Search from "./components/Search";
import SpinnerLoading from "./components/SpinnerLoading";
import ErrorMessage from "./components/ErrorMessage";
import UserInfo from "./components/UserInfo";
import Paginator from "./components/Paginator";
import UserRepos from "./components/UserRepos";
import Footer from "./components/Footer";

import { useGithubContext } from "./context/GithubContext";

import "./App.css";

function App() {
  // Usando o contexto para acessar o estado e funções
  const { state, handlePageChange } = useGithubContext();
  const {
    userData,
    userRepos,
    error,
    isLoading,
    currentPage,
    searchPerformed,
    itemsPerPage,
  } = state;

  // Calcular o índice do primeiro item na página atual
  const startIndex = (currentPage - 1) * itemsPerPage;

  // Filtrar a lista de conselhos para exibir apenas os itens da página atual
  const userReposToDisplay = userRepos.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="App">
      <Header title="GitHub User Search" />
      <div className={`${searchPerformed ? "" : "no-search-performed"}`}>
        <Search />
      </div>
      {isLoading && <SpinnerLoading />}
      <Container className="App-container">
        {!isLoading && !error && (
          <>
            <UserInfo />
            <div>
              <Paginator
                totalResults={userRepos.length}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
              {userRepos.length > 0 && (
                <UserRepos userRepos={userReposToDisplay} />
              )}
            </div>
          </>
        )}
      </Container>
      {error && !isLoading && <ErrorMessage message={error} />}
      {!isLoading && !error && (
        <Paginator
          totalResults={userRepos.length}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
