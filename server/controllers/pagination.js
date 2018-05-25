const paginationMeta = (meta) => {
  const {
    url,
    searchQuery
  } = meta;
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

  const searchQueryString = (searchQuery !== '' && searchQuery.length > 0) ? `&${searchQuery}` : '';

  data.pages = Math.ceil(data.total / data.limit);
  data.page = data.page > data.pages ? data.pages : data.page;
  data.previous = data.page !== 1 ? `${url}?limit=${data.limit}&offset=${data.offset - data.limit}${searchQueryString}` : undefined;
  data.current = `${url}?limit=${data.limit}&offset=${data.offset}${searchQueryString}`;
  data.next = data.page === data.pages ? undefined : `${url}?limit=${data.limit}&offset=${data.offset + data.limit}${searchQueryString}`;

  return {
    pagination: data
  };
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
  // HANDLE SEARCH QUERY
  const searchParams = {
    name,
    location,
    facilities
  };

  const searchQuery = Object.keys(searchParams).reduce((arr, key) => {
    if (searchParams[key] === '' || (Array.isArray(searchParams[key]) && searchParams[key].length === 0)) {
      return arr;
    }
    arr.push(`${key}=${searchParams[key]}`);

    return arr;
  }, []).join('&');
  // END SEARCH QUERY


  if (limit > 100) {
    limit = 20;
  }

  if (page === undefined) {
    page = Math.ceil((offset + limit) / limit);
  }
  return {
    limit,
    offset,
    page,
    searchQuery,
    name,
    location,
    facilities
  };
};

export default paginationMeta;
