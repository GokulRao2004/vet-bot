import config from './config.json';

const apiBaseUrl = config.apiBaseUrl1;
const backend_path = config.backend_path;
const endpoints = {
  login: `${apiBaseUrl}${backend_path}${config.endpoints.login}`,
  verifyToken: `${apiBaseUrl}${backend_path}${config.endpoints.verifyToken}`,
  whatsappLogin : `${apiBaseUrl}${config.endpoints.whatsappLogin}`
};

export default endpoints;