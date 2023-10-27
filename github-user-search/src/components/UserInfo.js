import React from "react";
import Card from "react-bootstrap/Card";

const UserInfo = ({ userData }) => {
  return (
    <Card>  
      <Card.Img variant="top" src={userData.avatar_url} alt={userData.login} />
      <Card.Body>
        <Card.Title>{userData.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {userData.login}
        </Card.Subtitle>
        <Card.Text>{userData.bio}</Card.Text>
        <Card.Text>Location: {userData.location}</Card.Text>
        <Card.Text>Public Repositories: {userData.public_repos}</Card.Text>
        <Card.Text>Followers: {userData.followers}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default UserInfo;
