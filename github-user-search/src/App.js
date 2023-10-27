import React, { useState } from "react";
import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import Search from "./components/Search";
import SpinnerLoading from "./components/SpinnerLoading";
import ErrorMessage from "./components/ErrorMessage";
import UserInfo from "./components/UserInfo";
import UserRepos from "./components/UserRepos";
import { getUserDetails, getUserRepositories } from "./services/githubService";
import "./App.css";

function App() {
  // Inicialização dos estados
  const [userData, setUserData] = useState(null);
  const [userRepos, setUserRepos] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Função para lidar com a pesquisa de usuário
  const handleSearch = async (username) => {
    try {
      setIsLoading(true);
      const userDetails = await getUserDetails(username);
      const userRepos = await getUserRepositories(username);
      setUserData(userDetails);
      setUserRepos(userRepos);
      setError(null);
    } catch (error) {
      setUserData(null);
      setUserRepos([]);
      setError("User not found.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <Header title="GitHub User Search" />
      <Container className="App-container">
        <Search onSearch={handleSearch} />
        {isLoading && <SpinnerLoading />}
        {!isLoading && !error && (
          <>
            {userData && <UserInfo userData={userData} />}
            {userRepos.length > 0 && <UserRepos userRepos={userRepos} />}
          </>
        )}
        {error && !isLoading && <ErrorMessage message={error} />}
      </Container>
    </div>
  );
}

export default App;
