import config from './config.json';

const apiBaseUrl = config.apiBaseUrl;

const endpoints = {
  login: `${apiBaseUrl}${config.endpoints.login}`,
  verifyToken: `${apiBaseUrl}${config.endpoints.verifyToken}`
};

export default endpoints;