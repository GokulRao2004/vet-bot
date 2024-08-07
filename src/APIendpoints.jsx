import config from './config.json';

const apiBaseUrl = config.apiBaseUrl1;

const endpoints = {
  login: `${apiBaseUrl}${config.endpoints.login}`,
  verifyToken: `${apiBaseUrl}${config.endpoints.verifyToken}`,
  whatsappLogin : `${apiBaseUrl}${config.endpoints.whatsappLogin}`
};

export default endpoints;