import React from "react";
import Pagination from "react-bootstrap/Pagination";

function Paginator({ totalResults, currentPage, itemsPerPage, onPageChange }) {
  const totalPages = Math.ceil(totalResults / itemsPerPage);

  // Define o número máximo de itens de paginação a serem exibidos
  const maxItens = 5;
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
        {startItem > 1 && <Pagination.First onClick={() => onPageChange(1)} />}
        {startItem > 2 && <Pagination.Ellipsis disabled />}
        {pages.map((page) => (
          <Pagination.Item
            key={page}
            active={currentPage === page}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Pagination.Item>
        ))}
        {endItem < totalPages - 1 && <Pagination.Ellipsis disabled />}
        {endItem < totalPages && (
          <Pagination.Last onClick={() => onPageChange(totalPages)} />
        )}
      </Pagination>
    </div>
  );
}

export default Paginator;
