const Config = {
  development: {
    username: 'root',
    password: 'root',
    database: 'db_events',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'root',
    password: 'root',
    database: 'db_events_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    dialect: 'postgres'
  }
};

export default Config;
