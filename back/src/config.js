console.log(`ENV(REDIS_HOST) : ${process.env.REDIS_HOST}`);
console.log(`ENV(REDIS_PORT) : ${process.env.REDIS_PORT}`);
console.log(`ENV(PSQL_HOST) : ${process.env.PSQL_HOST}`);
console.log(`ENV(PSQL_PORT) : ${process.env.PSQL_PORT}`);
console.log(`ENV(PSQL_LOGGING) : ${process.env.PSQL_LOGGING}`);
console.log(`ENV(MONGO_HOST) : ${process.env.MONGO_HOST}`);
console.log(`ENV(MONGO_PORT) : ${process.env.MONGO_PORT}`);

const config = {
  deploy: {
    apiUrls: {
      mainnet: "https://mainnet.infura.io/v3/d9153f9f351946c1841e246d19825eb6",
      gorli: "https://goerli.infura.io/v3/d9153f9f351946c1841e246d19825eb6",
      sepolia: "https://sepolia.infura.io/v3/d9153f9f351946c1841e246d19825eb6",
    },
  },
  auth: {
    hashSaltRound: 10,
    expireTimeout: 300,
    sessionSecret: "SESSION_SECRET_KEY",
  },
  redis: {
    host: process.env.REDIS_HOST || "0.0.0.0",
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  },
  mongodb: {
    host: process.env.MONGO_HOST || "0.0.0.0",
    port: process.env.MONGO_PORT ? parseInt(process.env.MONGO_PORT) : 37016,
  },
  postgres: {
    host: process.env.PSQL_HOST || "0.0.0.0",
    port: process.env.PSQL_PORT ? parseInt(process.env.PSQL_PORT) : 5432,
    logging: process.env.PSQL_LOGGING === "true",
  },
};

export default config;
