import React from "react";
import Pagination from "react-bootstrap/Pagination";
import { useGithubContext } from "../context/GithubContext";

function Paginator() {
  // Usando o contexto para acessar o estado e funções
  const { state, handlePageChange } = useGithubContext();
  const { userRepos, currentPage, itemsPerPage } = state;

  const totalPages = Math.ceil(userRepos.length / itemsPerPage);

  // Define o número máximo de itens de paginação a serem exibidos
  const maxItens = 10;
  let startItem, endItem;

  // Calcula o intervalo de itens de paginação a serem exibidos
  if (totalPages <= maxItens) {
    startItem = 1;
    endItem = totalPages;
  } else {
    const halfMax = Math.floor(maxItens / 2);

    // Se a página atual estiver próxima ao início
    if (currentPage <= halfMax + 1) {
      startItem = 1;
      endItem = maxItens - 1;
    } else if (currentPage >= totalPages - halfMax) {
      // Se a página atual estiver próxima ao final
      startItem = totalPages - maxItens + 2;
      endItem = totalPages;
    } else {
      // Se a página atual estiver no meio
      startItem = currentPage - halfMax;
      endItem = currentPage + halfMax;
    }
  }

  // Cria um array de páginas para renderizar
  const pages = Array.from(
    { length: endItem - startItem + 1 },
    (_, index) => startItem + index
  );

  return (
    <div className="App-paginator d-flex justify-content-center mb-3">
      <Pagination className="m-0">
        {startItem > 1 && (
          <Pagination.First
            className="custom-page"
            onClick={() => handlePageChange(1)}
          />
        )}
        {startItem > 2 && (
          <Pagination.Ellipsis className="custom-page" disabled />
        )}
        {pages.map((page) => (
          <Pagination.Item
            className="custom-page"
            key={page}
            active={currentPage === page}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Pagination.Item>
        ))}
        {endItem < totalPages - 1 && (
          <Pagination.Ellipsis className="custom-page" disabled />
        )}
        {endItem < totalPages && (
          <Pagination.Last
            className="custom-page"
            onClick={() => handlePageChange(totalPages)}
          />
        )}
      </Pagination>
    </div>
  );
}

export default Paginator;
