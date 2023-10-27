import React, { useState } from "react";
import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import Search from "./components/Search";
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

  // Função para lidar com a pesquisa de usuário
  const handleSearch = async (username) => {
    try {
      const userDetails = await getUserDetails(username);
      const userRepos = await getUserRepositories(username);
      setUserData(userDetails);
      setUserRepos(userRepos);
      setError(null);
    } catch (error) {
      setUserData(null);
      setUserRepos([]);
      setError("User not found.");
    }
  };

  return (
    <div className="App">
      <Header title="GitHub User Search" />
      <Container className="App-container">
        <Search onSearch={handleSearch} />
        {error && <ErrorMessage message={error} />}
        {userData && <UserInfo userData={userData} />}
        {userRepos.length > 0 && <UserRepos userRepos={userRepos} />}
      </Container>
    </div>
  );
}

export default App;
