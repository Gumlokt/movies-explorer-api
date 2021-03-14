const {
  APP_PORT = "4000",

  JWT_SECRET = "JWT-SECRET-KEY",
  JWT_SECRET_TTL = "7d",

  DB_HOST = "localhost",
  DB_PORT = "27017",
  DB_NAME = "moviehunterdb",
} = process.env;

const config = {
  APP_PORT: APP_PORT,
  DB_URL: `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  SECRET_KEY: JWT_SECRET,
  SECRET_TTL: JWT_SECRET_TTL,
  allowedCors: [
    "http://localhost:3000",
    "http://213.159.211.244",
    "http://moviehunter.ru",
    "http://www.moviehunter.ru",
    "https://moviehunter.ru",
    "https://www.moviehunter.ru",
  ],
};

module.exports = config;
