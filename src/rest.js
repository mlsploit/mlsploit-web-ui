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

const commonDELETERequestOptions = {
  ...commonRequestOptions,
  method: 'DELETE'
};

const createGETRequestOptionsWithAuth = () => ({
  ...commonGETRequestOptions,
  headers: {
    'Authorization': `Token ${API.TOKEN}`
  }
});

const createDELETERequestOptionsWithAuth = () => ({
  ...commonDELETERequestOptions,
  headers: {
    'X-CSRFToken': getCookie('csrftoken'),
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
  const requestOptionsForObj = createPOSTRequestOptionsForObj(obj);
  requestOptionsForObj.headers['Authorization'] = `Token ${API.TOKEN}`;
  return requestOptionsForObj;
};

const createPATCHRequestOptionsForObjWithAuth = (obj) => ({
  ...commonRequestOptions,
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken': getCookie('csrftoken'),
    'Authorization': `Token ${API.TOKEN}`
  },
  body: JSON.stringify(obj)
});

const parseResponse = (response) => {

  if (!response.ok) {
    throw new Error(
      `[REQUEST FAILED] ${response.status}: ${response.statusText}`);
  }

  return response.json();
};

// Auth requests

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

// Query requests

API.getResourceFromURLWithAuth = resourceURL => fetch(
  resourceURL,
  createGETRequestOptionsWithAuth()
).then(parseResponse);

API.getModules = () => API.getResourceFromURLWithAuth(API.ENDPOINTS.MODULES);
API.getFunctions = () => API.getResourceFromURLWithAuth(API.ENDPOINTS.FUNCTIONS);
API.getCurrentUser = () => API.getResourceFromURLWithAuth(API.ENDPOINTS.USER);
API.getFiles = () => API.getResourceFromURLWithAuth(API.ENDPOINTS.FILES);
API.getPipelines = () => API.getResourceFromURLWithAuth(API.ENDPOINTS.PIPELINES);
API.getTasks = () => API.getResourceFromURLWithAuth(API.ENDPOINTS.TASKS);
API.getRuns = () => API.getResourceFromURLWithAuth(API.ENDPOINTS.RUNS);
API.getJobs = () => API.getResourceFromURLWithAuth(API.ENDPOINTS.JOBS);

// Delete requests

API.deleteResourceByURLWithAuth = resourceURL => fetch(
  resourceURL,
  createDELETERequestOptionsWithAuth()
);

// Mutation requests

API.createNewPipeline = (pipelineName) => fetch(
  API.ENDPOINTS.PIPELINES,
  createPOSTRequestOptionsForObjWithAuth({
    name: pipelineName
})).then(parseResponse);

API.addTaskToPipeline = (pipelineURL, functionURL, args) => fetch(
  API.ENDPOINTS.TASKS,
  createPOSTRequestOptionsForObjWithAuth({
    pipeline: pipelineURL,
    function: functionURL,
    arguments: JSON.stringify(args)
})).then(parseResponse);

API.enablePipeline = (pipelineURL) => fetch(
  pipelineURL,
  createPATCHRequestOptionsForObjWithAuth({
    enabled: true
}));

API.createNewPipelineWithTasks = (pipelineName, tasks) => API.createNewPipeline(
  pipelineName
).then(async pipeline => {
  const pipelineURL = pipeline.url;
  for (const task of tasks) {
    await API.addTaskToPipeline(
      pipelineURL,
      task.function.url,
      task.arguments
    );
  }
  await API.enablePipeline(pipelineURL);
  const updatedPipeline = await API.getResourceFromURLWithAuth(pipelineURL);
  return updatedPipeline;
});

API.runPipeline = (pipelineURL, fileURLs) => fetch(
  API.ENDPOINTS.RUNS,
  createPOSTRequestOptionsForObjWithAuth({
    pipeline: pipelineURL,
    files: fileURLs,
})).then(parseResponse);

API.editFileTags = (file, tags) => fetch(
  file.url,
  createPATCHRequestOptionsForObjWithAuth({
    tags: JSON.stringify(Object.assign(file.tags, tags))
})).then(parseResponse);

API.uploadFile = (fileBlob) => {
  const formData = new FormData();
  formData.append('blob', fileBlob);

  // this request is the only post request that sends form data not JSON.
  const requestOptions = createPOSTRequestOptionsForObjWithAuth({});
  delete requestOptions.headers['Content-Type'];
  requestOptions.body = formData;

  return fetch(
    API.ENDPOINTS.FILES,
    requestOptions
  ).then(parseResponse);
};

API.uploadFiles = async (fileList) => {
  let uploadedFiles = []

  // fileList is a JS FileList, not an Array
  for (let i = 0; i < fileList.length; i++) {
    uploadedFiles.push(
      await API.uploadFile(fileList[i])
    );
  }

  return uploadedFiles;
};

window.API = API;
export default API;