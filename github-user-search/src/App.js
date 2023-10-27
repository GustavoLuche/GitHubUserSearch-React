import React, { useState } from "react";
import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import Search from "./components/Search";
import UserInfo from "./components/UserInfo";
import { getUserDetails, getUserRepositories } from "./services/githubService";
import "./App.css";

function App() {
  const [userData, setUserData] = useState(null);
  const [userRepos, setUserRepos] = useState([]);

  const handleSearch = async (username) => {
    const userDetails = await getUserDetails(username);
    const userRepos = await getUserRepositories(username);
    setUserData(userDetails);
    setUserRepos(userRepos);
  };

  return (
    <div className="App">
      <Header title="GitHub User Search" />
      <Container className="App-container">
        <Search onSearch={handleSearch} />
        {userData && <UserInfo userData={userData} />}
        {userRepos.length > 0 && (
          <div>
            <h2>User Repositories</h2>
            <ul>
              {userRepos.map((repo) => (
                <li key={repo.id}>{repo.name}</li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </div>
  );
}

export default App;
