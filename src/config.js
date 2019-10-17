// const REST_API_HOST = window.location.protocol + '//' + window.location.hostname;
// const REST_API_PORT = 8000;

const REST_API_HOST = 'http://localhost'
const REST_API_PORT = '8000';

const REST_API_URL = REST_API_HOST + (REST_API_PORT ? ':' + REST_API_PORT : '');

export default {
  DEBUG: true,
  REST_API_URL: REST_API_URL,
};