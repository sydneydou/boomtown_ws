const express = require('express');
const chalk = require('chalk');

const config = require('./config/application');

const app = express();
const PORT = config(app);

const initDB = require('./config/postgres');
const postgres = initDB(app);

let pgResource = require('./api/pg-resource');
pgResource = pgResource(postgres);

/**
 * @TODO: Initialize Apollo Server
 *
 * When you've completed your schema, configured and connected to Postgres
 * you're ready to start your Apollo Server.
 *
 *  Uncomment the following lines when you're ready to start Apollo:
 * */
const initApollo = require('./config/apollo')
initApollo({ app, pgResource })


postgres.on('error', (err, client) => {
  console.error('Unexpected error on idle postgres client', err);
  process.exit(-1);
});

const server = app.listen(PORT, () => {
  console.log(`>> ${chalk.blue('Express running:')} http://localhost:${PORT}`);

  /**
   *  @TODO: Initialize Apollo Server
   *
   *   Uncomment the following lines when you're ready to start Apollo:
   *
   *   console.log(
   *     `>> ${chalk.magenta('GraphQL playground:')} http://localhost:${PORT}/graphql`
   *   );
   */
});

server.on('error', err => {
  console.log(err);
});
