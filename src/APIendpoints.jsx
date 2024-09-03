import config from './config';

const apiBaseUrl = config.apiBaseUrl;
const backend_path = config.backend_path;
const endpoints = {
  login: `${apiBaseUrl}${backend_path}${config.endpoints.login}`,
  verifyToken: `${apiBaseUrl}${backend_path}${config.endpoints.verifyToken}`,
  embeddedSignup: `${apiBaseUrl}${config.endpoints.embeddedSignup}`
};

export default endpoints;