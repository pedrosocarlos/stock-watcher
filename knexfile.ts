const config = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/dev.sqlite3'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    seeds: {
      directory: './src/database/seeds'
    },
    useNullAsDefault: true
  },
  staging: {
    client: 'mariadb',
    connection: {
      database: 'stock_watcher',
      user:     'root',
      password: '1234'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    seeds: {
      directory: './src/database/seeds'
    }
  }
}

export default config