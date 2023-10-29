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
  const { state } = useGithubContext();
  const { error, isLoading, searchPerformed } = state;

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
              <Paginator />
              <UserRepos />
            </div>
          </>
        )}
      </Container>
      {error && !isLoading && <ErrorMessage message={error} />}
      {!isLoading && !error && <Paginator />}
      <Footer />
    </div>
  );
}

export default App;
