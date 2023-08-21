equire('dotenv').config();
const connectionString = process.env.DATABASE_URL;
console.log('connectionString: ', connectionString)
console.log('env environment: ', process.env.NODE_ENV)

module.exports = {

  development: {
    client: 'pg',
    // if using local database:
    connection: connectionString,
    // if using Heroku or DigitalOCean databases:
    // connection: { connectionString, ssl: { rejectUnauthorized: false, }, },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds'
    }
  },

  staging: {
    client: 'pg',
    connection: connectionString,
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds'
    }
  },

  production: {
    client: 'pg',
    connection: { connectionString, ssl: { rejectUnauthorized: false, }, },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds'
    }
  },

};