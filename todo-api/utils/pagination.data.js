export const calculatePaginationData = (items, total, page, limit) => {
  const itemCount = items?.length;
  const totalItems = (total?.length && total[0]?.count) || 0;

  let totalPages = 0;

  if (totalItems) {
    totalPages = Math.ceil(totalItems / limit);
  }

  return {
    currentPage: page,
    itemCount,
    itemsPerPage: limit,
    totalItems,
    totalPages,
  };
};

export const calculateSkip = (page, limit) => (page - 1) * limit;
