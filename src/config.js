const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  backend_path: "/auth",
  endpoints: {
    login: "/login",
    verifyToken: "/verify_token",
    embeddedSignup: "/embedded_signup"
  }
};

export default config;
