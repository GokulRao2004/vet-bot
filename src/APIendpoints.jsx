import config from './config';

const apiBaseUrl = config.apiBaseUrl;
const backend_path = config.backend_path;
const endpoints = {
  login: `${apiBaseUrl}${backend_path}${config.endpoints.login}`,
  verifyToken: `${apiBaseUrl}${backend_path}${config.endpoints.verifyToken}`,
  embeddedSignup: `${apiBaseUrl}${config.endpoints.embeddedSignup}`,
  contacts: `${apiBaseUrl}${backend_path}${config.endpoints.contacts}`,
  chats: `${apiBaseUrl}${backend_path}${config.endpoints.chats}`,
  template: `${apiBaseUrl}${backend_path}${config.endpoints.template}`,
  addContact: `${apiBaseUrl}${backend_path}${config.endpoints.addContact}`,
  textMessage: `${apiBaseUrl}${backend_path}${config.endpoints.textMessage}`,
  editProfile: `${apiBaseUrl}${backend_path}${config.endpoints.editProfile}`,
};

export default endpoints;