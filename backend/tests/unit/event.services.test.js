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

    describe('getEvents', () => {
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
        });
    });

    describe('addEvents', () => {
        it('should reject invalid arguments', async () => {
            await expect(events.addEvent()).to.eventually.be.rejectedWith('Invalid arguments');
            await expect(events.addEvent({ habit: "Error Events", ditance: 2, time: 30 })).to.eventually.be.rejectedWith('Invalid arguments')
        });

        it('should create a new event', async () => {
            const newEvent = {
                name: "Walking",
                date: new Date("2023-11-20"),
                minutes: 40,
                distance: 2.3
            }

            let stub = sandbox.stub(mongoose.Model, 'create').resolves(newEvent);

            const res = await events.addEvent(newEvent);

            expect(stub).to.have.been.calledOnceWith(newEvent);
            expect(res).to.have.property('name').to.equal('Walking');
            expect(res).to.have.property('date').to.be.a('date');
            expect(res).to.have.property('minutes').to.equal(40);
            expect(res).to.have.property('distance').to.equal(2.3);
        });

        it('should throw an error when rejected', async () => {
            const newEvent = {
                name: "Walking",
                date: new Date("2023-11-20"),
                minutes: 40,
                distance: 2.3
            }

            let stub = sandbox.stub(mongoose.Model, 'create').rejects();

            try {
                const res = await events.addEvent(newEvent);
            } catch (err) {
                expect(stub).to.have.been.calledOnce;
                expect(err).to.be.instanceOf(Error);
            }


        })

    })
});
