// services/githubService.js

import axios from "axios";

const BASE_URL = "https://api.github.com";

// Função para buscar detalhes de um usuário do GitHub
export const getUserDetails = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Função para buscar os repositórios de um usuário no GitHub
export const getUserRepositories = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}/repos`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
