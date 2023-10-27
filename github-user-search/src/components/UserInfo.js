import React from "react";
import Card from "react-bootstrap/Card";

const UserInfo = ({ userData }) => {
  return (
    <Card className="App-user-info">
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
        {userData.bio && <Card.Text>{userData.bio}</Card.Text>}
        {userData.location && (
          <Card.Text>Location: {userData.location}</Card.Text>
        )}
        {userData.email && (
          <Card.Text>
            <a href={`mailto:${userData.email}`}>{userData.email}</a>
          </Card.Text>
        )}
        {userData.blog && (
          <Card.Text>
            Blog:{" "}
            <a href={userData.blog} target="_blank" rel="noopener noreferrer">
              {userData.blog}
            </a>
          </Card.Text>
        )}
        {userData.company && <Card.Text>Company: {userData.company}</Card.Text>}
        <Card.Text>Public Repositories: {userData.public_repos}</Card.Text>
        <Card.Text>Followers: {userData.followers}</Card.Text>
        <Card.Text>Following: {userData.following}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default UserInfo;
