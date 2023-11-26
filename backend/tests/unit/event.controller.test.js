import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import mongoose from 'mongoose';

chai.use(sinonChai);
chai.use(chaiAsPromised);

import EventServices from "../../src/services/event.service.js";
import EventControllers from "../../src/controllers/event.controller.js";
import HabitServices from '../../src/services/habit.service.js';

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
            expect(findStub).to.have.been.calledOnce;
        })

        it('should return an error message if promise is rejected', async () => {
            findStub.restore();
            getEventStub.restore();

            findStub = sandbox.stub(mongoose.Model, 'find').rejects(sampleEvent);

            const res = {
                json: sinon.spy(),
                status: sinon.stub().resolvesThis
            }

            const response = await eventCont.getAllEvents(null, res);
            console.log(response);
            expect(res.json).to.have.been.calledOnce;
            expect(findStub).to.have.been.calledOnceWith(sampleEvent);

        });



    })

    describe('addEvent', () => {
        it('should create a new Event', async () => {


            const newEvent = {
                name: "Walking",
                date: new Date("2023-11-20"),
                minutes: 30,
                distance: 1.5
            }
            const res = {
                json: sinon.spy(),
                status: sinon.stub().resolvesThis
            }

            // let addEventStub = sandbox.stub(eventServ, 'addEvent').resolves(newEvent);

            await eventCont.addEvent(newEvent, res);

            expect(res.json).to.have.been.calledOnce;
            // expect(addEventStub).to.have.been.calledOnce;

        })
    })


})
