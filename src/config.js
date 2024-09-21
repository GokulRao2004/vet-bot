const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  backend_path: "/auth",
  endpoints: {
    login: "/login",
    verifyToken: "/verify_token",
    embeddedSignup: "/embedded_signup",
    contacts: "/contacts",
    chats: "/chats",
    template: "/template",
    addContact :"/contact",
    textMessage : "/text_message",
    editProfile: "/edit_profile"
  }
};

export default config;
