import React from "react";
import Card from "react-bootstrap/Card";
import { useGithubContext } from "../context/GithubContext";

const UserInfo = () => {
  // Usando o contexto para acessar o estado
  const { state } = useGithubContext();
  const { userData } = state;

  return (
    <div className="App-user-info mb-3 pt-4 d-flex justify-content-center">
      <Card
        text="white"
        style={{
          width: "256px",
          backgroundColor: "rgba(0, 0, 0, 0)",
          border: "none",
        }}
      >
        <Card.Img
          className="rounded-circle"
          variant="top"
          src={userData.avatar_url}
          alt={userData.login}
          style={{ width: "256px", height: "256px" }}
        />
        <Card.Body>
          {userData.name && <Card.Title>{userData.name}</Card.Title>}
          {userData.login && (
            <Card.Subtitle className="mb-2 text-muted">
              <a
                href={`https://github.com/${userData.login}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                @{userData.login}
              </a>
            </Card.Subtitle>
          )}
          {userData.bio && (
            <Card.Text className="mb-2">{userData.bio}</Card.Text>
          )}
          {userData.location && (
            <Card.Text className="mb-1">
              Location: {userData.location}
            </Card.Text>
          )}
          {userData.email && (
            <Card.Text className="mb-1">
              <a href={`mailto:${userData.email}`}>{userData.email}</a>
            </Card.Text>
          )}
          {userData.blog && (
            <Card.Text className="mb-1">
              Blog:{" "}
              <a href={userData.blog} target="_blank" rel="noopener noreferrer">
                {userData.blog}
              </a>
            </Card.Text>
          )}
          {userData.company && (
            <Card.Text className="mb-1">Company: {userData.company}</Card.Text>
          )}
          <Card.Text className="mb-1">
            Public Repositories: {userData.public_repos}
          </Card.Text>
          <Card.Text className="mb-1">
            Followers: {userData.followers}
          </Card.Text>
          <Card.Text className="mb-1">
            Following: {userData.following}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserInfo;
