/* const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development);

module.exports = connection; */

import Knex from 'knex';
import KnexConfig from '../../knexfile';

const knex_connection = Knex(KnexConfig.development);

export default knex_connection;