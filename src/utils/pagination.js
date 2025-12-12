// src/utils/pagination.js

/**
 * Paginate an array of items
 * @param {Array} items - full array of items
 * @param {Number} currentPage - current page number (1-indexed)
 * @param {Number} perPage - items per page
 * @returns {Object} { paginatedItems, totalPages }
 */
export const paginate = (items, currentPage, perPage) => {
  const totalPages = Math.ceil(items.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const paginatedItems = items.slice(startIndex, startIndex + perPage);

  return { paginatedItems, totalPages };
};
