const paginationMeta = (meta) => {
  const { url } = meta;
  const data = {
    limit: meta.limit,
    offset: meta.offset,
    page: meta.page,
    pages: 1,
    pageSize: meta.pageSize,
    total: meta.total,
    previous: '',
    current: '',
    next: ''
  };
  data.pages = Math.ceil(data.total / data.limit);
  data.page = data.page > data.pages ? data.pages : data.page;
  data.previous = data.page !== 1 ? `${url}?limit=${data.limit}&offset=${data.offset - data.limit}` : undefined;
  data.current = `${url}?limit=${data.limit}&offset=${data.offset}`;
  data.next = data.page === data.pages ? undefined : `${url}?limit=${data.limit}&offset=${data.offset + data.limit}`;

  return { pagination: data };
};

export const handleQuery = (query) => {
  let limit = parseInt(query.limit, 10) || 20;
  const offset = parseInt(query.offset, 10) || 0;
  let page = parseInt(query.page, 10) || undefined;
  const name = query.name || '';
  const location = query.location || '';
  let facilities = query.facilities || [];

  if (!Array.isArray(facilities)) {
    facilities = facilities.split(',');
  }

  if (limit > 100) {
    limit = 20;
  }

  if (page === undefined) {
    page = Math.ceil((offset + limit) / limit);
  }
  return {
    limit, offset, page, name, location, facilities
  };
};

export default paginationMeta;
