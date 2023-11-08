import main from '../../src/db/main.js';
import chai, { expect } from 'chai';
import sinon from 'sinon'
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import mongoose from 'mongoose';

chai.use(sinonChai);
chai.use(chaiAsPromised);

var sandbox = sinon.createSandbox()

describe('main test', () => {
    let connectStub = sandbox.stub(mongoose, 'connect').rejects(new Error('oh no'));

    beforeEach(() => {

    })

    afterEach(() => {
        sandbox.restore();
    })
    it('should throw error when connection is rejected', async () => {
        try {
            await main();
        } catch (error) {
            expect(error).to.be.instanceOf(Error);
            expect(err.message).to.equal('oh no');
            expect(connectStub).to.have.been.calledOnce;
        };
    });

});
