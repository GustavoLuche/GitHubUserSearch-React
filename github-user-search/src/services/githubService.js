import axios from "axios";

const BASE_URL = "https://api.github.com";

/**
 * Função para buscar detalhes de um usuário do GitHub.
 *
 * @param {string} username - O nome de usuário do GitHub.
 * @returns {Promise<Object>} - Um objeto contendo os detalhes do usuário.
 * @throws {Error} - Lança um erro se o usuário não for encontrado ou se houver um problema com a solicitação.
 */
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

/**
 * Função para buscar todos os repositórios de um usuário no GitHub.
 *
 * @param {string} username - O nome de usuário do GitHub.
 * @returns {Promise<Array>} - Um array contendo todos os repositórios do usuário.
 * @throws {Error} - Lança um erro se não for possível recuperar os repositórios do usuário.
 */
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
        // Não há mais repositórios disponíveis
        break;
      }
    }

    return allRepositories;
  } catch (error) {
    throw new Error("Failed to retrieve user repositories.");
  }
};
