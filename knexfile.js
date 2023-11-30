// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      database : 'postgres',
      user :     'postgres',
      password : 'digits1985',
      charset : 'utf8' 
    },
    migrations: {
      directory: './dbconfig/migration'
    }
  },

  // staging: {
  //   client: 'pg',
  //   connection: {
  //     connectionString: process.env.DATABASE_URL,
  //     ssl: {rejectUnauthorized: false},
  //     host: process.env.DATABASE_HOST,
  //     port: process.env.PORT || 5432,
  //     database: process.env.DATABASE_DB,
  //     user:     process.env.DATABASE_USER,
  //     password: process.env.DATABASE_PW
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   // migrations: {
  //   //   tableName: 'knex_migrations'
  //   // }
  // },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

};
