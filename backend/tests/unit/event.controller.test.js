import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import mongoose from 'mongoose';

chai.use(sinonChai);
chai.use(chaiAsPromised);

import EventServices from "../../src/services/event.service.js";
import EventControllers from "../../src/controllers/event.controller.js";

var sandbox = sinon.createSandbox();

describe('EventController Tests', () => {
    let getEventStub, eventCont, eventServ, findStub;

    eventCont = new EventControllers();
    eventServ = new EventServices();

    describe('getAllEvents', () => {

        let sampleEvent = {

        }

        beforeEach(() => {
            getEventStub = sandbox.stub(eventServ, 'getEvents').resolves(sampleEvent);
            findStub = sandbox.stub(mongoose.Model, 'find').resolves(sampleEvent);
        })

        afterEach(() => {
            sandbox.restore();
        })

        it('should return events', async () => {



            const res = {
                json: sinon.spy(),
                status: sinon.stub().resolvesThis
            }

            let event = await eventCont.getAllEvents({}, res);

            console.log(event);

            expect(res.json).to.have.been.calledOnce;
            // expect(getEventStub).to.have.been.calledOnce;
        })

    })


})
