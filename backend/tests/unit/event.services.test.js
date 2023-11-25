import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';


chai.use(sinonChai);
chai.use(chaiAsPromised);

import EventServices from '../../src/services/event.service.js';
import mongoose, { mongo } from 'mongoose';
import Event from '../../src/models/event.model.js';

var sandbox = sinon.createSandbox();

describe('Event Service tests', () => {
    let findEventStub, sampleEvent, events;

    events = new EventServices();

    beforeEach(() => {
        sampleEvent = {
            name: "Running",
            date: new Date("2023-11-20"),
            minutes: 52,
            distance: 4,
            save: sandbox.stub().resolves(),
        }
        findEventStub = sandbox.stub(mongoose.Model, 'find').resolves(sampleEvent);
    });



    afterEach(() => {
        sandbox.restore();
    });

    context('getEvents', () => {
        it('should return all events', async () => {
            const resEvents = await events.getEvents();

            expect(findEventStub).to.have.been.calledOnce;
            expect(resEvents).to.have.property('name').to.equal("Running");
            expect(resEvents).to.have.property('date').to.be.a('Date');
            expect(resEvents).to.have.property('distance').to.equal(4);
            expect(resEvents).to.have.property('minutes').to.equal(52);
            findEventStub.restore();

        });

        it('should throw an error when rejected', async () => {
            sandbox.restore();
            const rejectedFindStub = sandbox.stub(mongoose.Model, 'find').rejects(new Error('cant find database'));

            try {
                const res = await events.getEvents();
            } catch (err) {

                expect(err).to.be.instanceOf(Error);
                expect(err.message).to.equal('cant find database');
                expect(rejectedFindStub).to.have.been.calledOnce;
            }
        })
    })
});
