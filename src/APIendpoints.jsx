import config from './config.json';

const apiBaseUrl = config.apiBaseUrl;

const endpoints = {
  login: `${apiBaseUrl}${config.endpoints.login}`,
  checkOTP: `${apiBaseUrl}${config.endpoints.checkOTP}`,
  checkPhoneNumber: `${apiBaseUrl}${config.endpoints.checkPhoneNumber}`,
};

export default endpoints;