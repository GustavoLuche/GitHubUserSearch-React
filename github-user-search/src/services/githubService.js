import axios from "axios";

const BASE_URL = "https://api.github.com";

// Função para buscar detalhes de um usuário do GitHub
export const getUserDetails = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to retrieve user details.");
    }
  } catch (error) {
    throw new Error("User not found or there was an issue with the request.");
  }
};

// Função para buscar todos os repositórios de um usuário no GitHub
export const getAllUserRepositories = async (username) => {
  try {
    let page = 1;
    let allRepositories = [];

    while (true) {
      const response = await axios.get(`${BASE_URL}/users/${username}/repos`, {
        params: { page },
      });

      if (response.status === 200 && response.data.length > 0) {
        allRepositories = allRepositories.concat(response.data);
        page++;
      } else {
        // Nenhos mais repositórios disponíveis
        break;
      }
    }

    return allRepositories;
  } catch (error) {
    throw new Error("Failed to retrieve user repositories.");
  }
};