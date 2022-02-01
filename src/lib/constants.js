const FETCH_HEADERS = {
  headers: {
    Authorization: `token ${window.atob(process.env.REACT_APP_API_KEY)}`,
  },
};

export default FETCH_HEADERS;
