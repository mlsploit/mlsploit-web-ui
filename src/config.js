const REST_API_HOST = window.location.protocol + '//' + window.location.hostname;
const REST_API_PORT = null; // sometimes hosted on port 8000

const REST_API_URL = REST_API_HOST + (REST_API_PORT ? ':' + REST_API_PORT : '');

export default {
  DEBUG: false,
  REST_API_URL: REST_API_URL,
};
