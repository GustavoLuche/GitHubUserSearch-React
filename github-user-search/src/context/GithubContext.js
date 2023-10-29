import React, { createContext, useReducer, useContext } from "react";
import {
  getUserDetails,
  getAllUserRepositories,
} from "../services/githubService";

// Estrutura inicial do estado
const initialState = {
  userData: null,
  userRepos: [],
  error: null,
  isLoading: false,
  currentPage: 1,
  searchPerformed: false,
  itemsPerPage: 10,
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
      dispatch({ type: "SET_USER_REPOS", payload: userRepos });
      dispatch({ type: "SET_ERROR", payload: null });
      dispatch({ type: "SET_SEARCH_PERFORMED", payload: true });
    } catch (error) {
      dispatch({ type: "SET_USER_DATA", payload: null });
      dispatch({ type: "SET_USER_REPOS", payload: [] });
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

  return (
    <GithubContext.Provider
      value={{
        state,
        onSearch: searchGithubByUserWithContext,
        handlePageChange,
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
      throw new Error(
        "useGithubContext must be used within a GithubProvider"
      );
    }
    return context;
  }
  