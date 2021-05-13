require('dotenv').config();
const pg = requite('pg');

const localConnection = process.env.LOCAL_PG_ROUTE

let connection;
if (process.env.DATABASE_URL){
    pg.defaults.ssl = { rejectUnauthorized: false};
    connection = process.env.DATABASE_URL;
} else {
    connection = localConnection
};

const sharedConfig = {
    client: 'pg',
    connection,
    migrations: { direction: './database/migrations' },
    seeds: { directory: './database/seeds' }
};

module.exports = {
    development: { ...sharedConfig },
    production: {
        ...sharedConfig,
        pool: {min: 2, max:10},
    },
};