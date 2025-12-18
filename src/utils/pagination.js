
export const paginate = (items, currentPage, perPage) => {
  const totalPages = Math.ceil(items.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const paginatedItems = items.slice(startIndex, startIndex + perPage);

  return { paginatedItems, totalPages };
};
