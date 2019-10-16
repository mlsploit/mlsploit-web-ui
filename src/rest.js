import config from './config.js';
import { tokenStore } from './store.js';


const ENDPOINTS = {
  SIGNIN: `${config.REST_API_URL}/auth/login/`,
  SIGNUP: `${config.REST_API_URL}/auth/registration/`,

  USER: `${config.REST_API_URL}/auth/user/`,
  FILES: `${config.REST_API_URL}/api/v1/files/`,

  MODULES: `${config.REST_API_URL}/api/v1/modules/`,
  FUNCTIONS: `${config.REST_API_URL}/api/v1/functions/`,
  PIPELINES: `${config.REST_API_URL}/api/v1/pipelines/`,
  TASKS: `${config.REST_API_URL}/api/v1/tasks/`,
  RUNS: `${config.REST_API_URL}/api/v1/runs/`,
  JOBS: `${config.REST_API_URL}/api/v1/jobs/`,
}

const API = { ENDPOINTS };
tokenStore.subscribe(token => {
  API.TOKEN = token;
});

const getCookie = (name) => {
  var cookieValue = null;

  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }

  return cookieValue;
};

const commonRequestOptions = {
  mode: 'cors',
  cache: 'no-cache',
  referrer: 'no-referrer'
};

const commonGETRequestOptions = {
  ...commonRequestOptions,
  method: 'GET'
};

const createGETRequestOptionsWithAuth = () => ({
  ...commonGETRequestOptions,
  headers: {
    'Authorization': `Token ${API.TOKEN}`
  }
});

const createPOSTRequestOptionsForObj = (obj) => ({
  ...commonRequestOptions,
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCookie('csrftoken')
  },
  body: JSON.stringify(obj)
});

const createPOSTRequestOptionsForObjWithAuth = (obj) => {
  requestOptionsForObj = createPOSTRequestOptionsForObj(obj);
  requestOptionsForObj.headers['Authorization'] = `Token ${API.TOKEN}`;
  return requestOptionsForObj;
};

const parseResponse = (response) => {

  if (!response.ok) {
    throw new Error(
      `[REQUEST FAILED] ${response.status}: ${response.statusText}`);
  }
  
  return response.json();
};

API.signin = (username, password) => fetch(
  API.ENDPOINTS.SIGNIN, 
  createPOSTRequestOptionsForObj({
    username, password
  })
).then(parseResponse);

API.signup = (username, password1, password2) => fetch(
  API.ENDPOINTS.SIGNUP, 
  createPOSTRequestOptionsForObj({
    username, password1, password2
  })
).then(parseResponse);

API.getModules = () => fetch(
  API.ENDPOINTS.MODULES,
  createGETRequestOptionsWithAuth()
).then(parseResponse);

API.getFunctions = () => fetch(
  API.ENDPOINTS.FUNCTIONS,
  createGETRequestOptionsWithAuth()
).then(parseResponse);

API.getCurrentUser = () => fetch(
  API.ENDPOINTS.USER,
  createGETRequestOptionsWithAuth()
).then(parseResponse);

API.getFiles = () => fetch(
  API.ENDPOINTS.FILES,
  createGETRequestOptionsWithAuth()
).then(parseResponse);

API.getPipelines = () => fetch(
  API.ENDPOINTS.PIPELINES,
  createGETRequestOptionsWithAuth()
).then(parseResponse);

API.getTasks = () => fetch(
  API.ENDPOINTS.TASKS,
  createGETRequestOptionsWithAuth()
).then(parseResponse);

API.getRuns = () => fetch(
  API.ENDPOINTS.RUNS,
  createGETRequestOptionsWithAuth()
).then(parseResponse);

API.getJobs = () => fetch(
  API.ENDPOINTS.JOBS,
  createGETRequestOptionsWithAuth()
).then(parseResponse);

window.API = API;
export default API;