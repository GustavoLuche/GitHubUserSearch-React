import React from "react";
import { useGithubContext } from "../context/GithubContext";

function ErrorMessage() {
  // Usando o contexto para acessar o estado
  const { state } = useGithubContext();
  const { error } = state;

  return <div className="text-danger my-5 text-center">{error}</div>;
}

export default ErrorMessage;
