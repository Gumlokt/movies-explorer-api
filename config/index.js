const config = {
  DEFAULT_PORT: 4000, // set to 4000 for development purposes and 3000 for production
  SECRET_KEY: "MY-SECRET-KEY",
  SECRET_TTL: "7d",
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
