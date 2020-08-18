const ENV = process.env.NODE_ENV || 'test';
const dbConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
};
const customConfigs = {
  development: { connection: { database: 'trap', user: 'danny', password: 'password', } },
  test: { connection: { database: 'trap_test', user: 'danny', password: 'password', } }
};
module.exports = { ...dbConfig, ...customConfigs[ENV] };