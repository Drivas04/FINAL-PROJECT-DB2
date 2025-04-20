import { useState, useMemo } from "react";

const usePagination = (data, itemsPerPage = 5) => {
  const [currentPage, setCurrentPage] = useState(1);

  const maxPage = Math.ceil(data.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  const goToPage = (page) => {
    if (page < 1) page = 1;
    if (page > maxPage) page = maxPage;
    setCurrentPage(page);
  };

  return {
    currentPage,
    maxPage,
    goToPage,
    paginatedData,
  };
};

export default usePagination;
