const calcPaginationData = ({ total, page, perPage }) => {
  const totalPages = Math.ceil(total / perPage);
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;

  return { totalPages, hasNextPage, hasPreviousPage };
};

export default calcPaginationData;
