import config from './config';

const apiBaseUrl = config.apiBaseUrl;
const backend_path = config.backend_path;
const endpoints = {
  login: `${apiBaseUrl}${backend_path}${config.endpoints.login}`,
  verifyToken: `${apiBaseUrl}${backend_path}${config.endpoints.verifyToken}`,
  embeddedSignup: `${apiBaseUrl}${config.endpoints.embeddedSignup}`,
  contacts: `${apiBaseUrl}${config.endpoints.contacts}`,
  chats: `${apiBaseUrl}${config.endpoints.chats}`,
  template: `${apiBaseUrl}${config.endpoints.template}`,
  addContact: `${apiBaseUrl}${config.endpoints.addContact}`,
   
};

export default endpoints;