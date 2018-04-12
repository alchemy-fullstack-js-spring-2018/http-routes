require('dotenv').config({ path: 'test/.env.test' });
const app = require('../lib/app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const client = require('../lib/db-client');

const { assert } = chai;
chai.use(chaiHttp);

