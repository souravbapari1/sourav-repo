export const config = {
  appName: "My Application",
  port: 4000,
  jwt: {
    secret: "secret",
  },
  smtp: {
    host: "smtp.example.com",
    port: 587,
    secure: false,
    auth: {
      user: "username",
      pass: "password",
    },
  },
};
