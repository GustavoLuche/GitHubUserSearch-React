import React, { createContext, useReducer, useContext } from "react";
import {
  getUserDetails,
  getAllUserRepositories,
} from "../services/githubService";

// Estrutura inicial do estado
const initialState = {
  userData: null,
  userRepos: [],
  originalUserRepos: [],
  filteredRepos: [],
  error: null,
  isLoading: false,
  currentPage: 1,
  searchPerformed: false,
  itemsPerPage: 10,
  allLanguages: [],
};

// Criação do contexto
const GithubContext = createContext();

// Função de redução para atualizar o estado com base em ações
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return { ...state, userData: action.payload };
    case "SET_USER_REPOS":
      return { ...state, userRepos: action.payload };
    case "SET_ORIGINAL_USER_REPOS":
      return { ...state, originalUserRepos: action.payload };
    case "SET_FILTERED_REPOS":
      return { ...state, filteredRepos: action.payload };
    case "SET_USER_REPOS_ALL_LANGUAGES":
      return { ...state, allLanguages: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_IS_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    case "SET_SEARCH_PERFORMED":
      return { ...state, searchPerformed: action.payload };
    default:
      return state;
  }
};

// Provedor do contexto que fornece o estado e funções de atualização
export function GithubProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Função para lidar com a pesquisa de usuário
  const searchGithubByUserWithContext = async (username) => {
    try {
      dispatch({ type: "SET_IS_LOADING", payload: true });
      const userDetails = await getUserDetails(username);
      dispatch({ type: "SET_USER_DATA", payload: userDetails });
      const userRepos = await getAllUserRepositories(username);
      dispatch({
        type: "SET_USER_REPOS",
        payload: userRepos.sort(
          (a, b) => new Date(b.pushed_at) - new Date(a.pushed_at)
        ),
      });
      dispatch({
        type: "SET_ORIGINAL_USER_REPOS",
        payload: userRepos.sort(
          (a, b) => new Date(b.pushed_at) - new Date(a.pushed_at)
        ),
      });
      dispatch({
        type: "SET_USER_REPOS_ALL_LANGUAGES",
        payload: [
          ...new Set(
            userRepos
              .map((repo) => repo.language)
              .filter((language) => language !== null)
          ),
        ],
      });
      dispatch({ type: "SET_ERROR", payload: null });
      dispatch({ type: "SET_SEARCH_PERFORMED", payload: true });
    } catch (error) {
      dispatch({ type: "SET_USER_DATA", payload: null });
      dispatch({ type: "SET_USER_REPOS", payload: [] });
      dispatch({ type: "SET_USER_REPOS_ALL_LANGUAGES", payload: [] });
      dispatch({ type: "SET_ERROR", payload: "User not found." });
      dispatch({ type: "SET_SEARCH_PERFORMED", payload: false });
    } finally {
      dispatch({ type: "SET_IS_LOADING", payload: false });
      dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
    }
  };

  // Função para lidar com a mudança de página
  const handlePageChange = (pageNumber) => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: pageNumber });
  };

  // Função para classificar os repositórios com base na opção de ordenação
  const sortRepos = (sortOption) => {
    const { userRepos } = state;

    // Define a função de comparação com base na opção
    const compareFunction =
      sortOption === "lastUpdated"
        ? (a, b) => new Date(b.pushed_at) - new Date(a.pushed_at)
        : (a, b) => a.name.localeCompare(b.name);

    // Ordena a lista e atualiza o estado com a lista classificada
    const sortedRepos = [...userRepos].sort(compareFunction);
    dispatch({ type: "SET_USER_REPOS", payload: sortedRepos });
  };

  // Função para filtrar os repositórios por linguagem
  const filterByLanguage = (selectedLanguage) => {
    const { originalUserRepos } = state;
    if (selectedLanguage === "All") {
      dispatch({ type: "SET_USER_REPOS", payload: originalUserRepos });
    } else {
      const filteredReposByLanguage = originalUserRepos.filter(
        (repo) => repo.language === selectedLanguage
      );
      dispatch({
        type: "SET_FILTERED_REPOS",
        payload: filteredReposByLanguage,
      });
      dispatch({ type: "SET_USER_REPOS", payload: filteredReposByLanguage });
    }
    dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
  };

  // Furnção para filtar os repositórios por term
  const filterByTerm = (term) => {
    const { originalUserRepos, filteredRepos } = state;

    if (term.trim() !== "") {
      dispatch({
        type: "SET_FILTERED_REPOS",
        payload: originalUserRepos.filter(
          (repo) =>
            repo.name.toLowerCase().includes(term) ||
            (repo.description && repo.description.toLowerCase().includes(term))
        ),
      });
      dispatch({ type: "SET_USER_REPOS", payload: filteredRepos });
      dispatch({ type: "SET_ERROR", payload: null });
    } else {
      dispatch({ type: "SET_USER_REPOS", payload: originalUserRepos });
    }
    dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
  };

  return (
    <GithubContext.Provider
      value={{
        state,
        onSearch: searchGithubByUserWithContext,
        handlePageChange,
        sortRepos,
        filterByLanguage,
        filterByTerm,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
}

// Hook personalizado para usar o contexto
export function useGithubContext() {
  const context = useContext(GithubContext);
  if (!context) {
    throw new Error("useGithubContext must be used within a GithubProvider");
  }
  return context;
}
