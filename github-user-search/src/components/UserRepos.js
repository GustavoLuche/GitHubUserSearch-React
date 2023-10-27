import React from "react";
import Card from "react-bootstrap/Card";

const UserRepos = ({ userRepos }) => {
  userRepos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  return (
    <div>
      <h2 className="text-uppercase text-center" style={{ color: '#fff' }}>Repositories</h2>
      {userRepos.map((repo) => (
        <Card key={repo.id} className="mb-3">
          <Card.Body>
            <Card.Title>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </Card.Title>
            {repo.description && <Card.Text>{repo.description}</Card.Text>}
            {repo.language && (
              <Card.Text>
                <strong>Language:</strong> {repo.language}
              </Card.Text>
            )}
            <Card.Text>
              <strong>Last Updated:</strong>{" "}
              {new Date(repo.updated_at).toLocaleDateString()}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default UserRepos;
