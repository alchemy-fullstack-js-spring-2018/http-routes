require('dotenv').config({ path:'./test/.env.test'});
const chai = require('chai');
const chaiHttp = require('chai-http');
const client = require('../lib/client-db');
const app = require('../lib/app');

const { assert } = chai;
chai.use(chaiHttp);

describe('plants', () =>

    before(() => client.query('DELETE FROM plants'));

    

)