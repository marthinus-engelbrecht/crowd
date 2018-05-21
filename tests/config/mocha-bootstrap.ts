import {expect, use} from 'chai';
import sinonChai = require('sinon-chai');
use(sinonChai);

(<any>global).expect = expect;
