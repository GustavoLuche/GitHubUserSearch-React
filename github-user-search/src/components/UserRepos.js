import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

const UserRepos = ({ userRepos }) => {
  userRepos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  return (
    <div>
      <h2>User Repositories (Sorted by Last Update)</h2>
      <ListGroup>
        {userRepos.map((repo) => (
          <ListGroup.Item key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default UserRepos;
