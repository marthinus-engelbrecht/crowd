import chai = require('chai');
import sinonChai = require('sinon-chai');
import 'behavioural-describe-mocha'

chai.use(sinonChai);

global.expect = chai.expect;
