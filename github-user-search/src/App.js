import React, { useState } from "react";
import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import Search from "./components/Search";
import SpinnerLoading from "./components/SpinnerLoading";
import ErrorMessage from "./components/ErrorMessage";
import UserInfo from "./components/UserInfo";
import Paginator from "./components/Paginator";
import UserRepos from "./components/UserRepos";
import Footer from "./components/Footer";

import {
  getUserDetails,
  getAllUserRepositories,
} from "./services/githubService";

import "./App.css";

function App() {
  // Inicialização dos estados
  const [userData, setUserData] = useState(null);
  const [userRepos, setUserRepos] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const itemsPerPage = 10;

  // Função para lidar com a pesquisa de usuário
  const handleSearch = async (username) => {
    try {
      setIsLoading(true);
      const userDetails = await getUserDetails(username);
      const userRepos = await getAllUserRepositories(username);
      setUserData(userDetails);
      setUserRepos(userRepos);
      setError(null);
      setSearchPerformed(true);
    } catch (error) {
      setUserData(null);
      setUserRepos([]);
      setError("User not found.");
      setSearchPerformed(false);
    } finally {
      setIsLoading(false);
      setCurrentPage(1);
    }
  };

  // Função para lidar com a mudança de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
        <Search onSearch={handleSearch} />
      </div>
      {isLoading && <SpinnerLoading />}
      <Container className="App-container">
        {!isLoading && !error && (
          <>
            {userData && <UserInfo userData={userData} />}
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
