import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import mongoose from 'mongoose';

chai.use(sinonChai);
chai.use(chaiAsPromised);

import HabitServices from "../../src/services/habit.service.js";

import HabitControllers from "../../src/controllers/habit.controller.js"

var sandbox = sinon.createSandbox();

describe('HabitController Test', () => {

    let getHabitsStub, addHabitStub, habitCont, habitServ, findStub;

    habitCont = new HabitControllers();
    habitServ = new HabitServices()


    context("getAllHabits", () => {

        let sampleHabit = {


        }
        beforeEach(() => {
            getHabitsStub = sandbox.stub(habitServ, 'getHabits').resolves(sampleHabit);
            findStub = sandbox.stub(mongoose.Model, 'find').resolves(sampleHabit)
        })

        afterEach(() => {
            sandbox.restore()
        })
        it('should return habits ', async () => {

            const res = {
                json: sinon.spy(),
                status: sinon.stub().resolvesThis
            }


            let habit = await habitCont.getAllHabits({}, res);


            expect(res.json).to.have.been.calledOnce;
            expect(findStub).to.have.been.calledOnce;

        });
        it('should return an error message if promise is rejected', async () => {
            findStub.restore()
            getHabitsStub.restore()

            // getHabitsStub = sandbox.stub(habitServ, 'getHabits').rejects(new Error("Oh no"))

            findStub = sandbox.stub(mongoose.Model, 'find').rejects(sampleHabit)



            const res = {
                json: sinon.spy(),
                status: sinon.stub().resolvesThis
            }


            // let habitStub = sandbox.stub(habitCont, 'getAllHabits').rejects(new Error("Oh no"))
            const response = await habitCont.getAllHabits(null, res)
            expect(findStub).to.have.been.calledOnce;
            // expect(getHabitsStub).to.have.been.calledOnce;


        });

        it('should create anew habit', async () => {
            let newHabit = { name: "Running" };
            // addHabitStub = sandbox.stub(habitServ, 'addHabit').resolves(newHabit);
            // let createStub = sandbox.stub(mongoose.Model, 'create').resolves(newHabit);
            const res = {
                json: sinon.spy(),
                status: sinon.stub().resolvesThis
            }

            let result = await habitCont.addHabit(newHabit, res);

            expect(res.json).to.have.been.calledOnce;
        })

        it('should return an error ', async () => {
            let newHabit = { name: "Running" };
            // addHabitStub = sandbox.stub(habitServ, 'addHabit').resolves(newHabit);
            // let createStub = sandbox.stub(mongoose.Model, 'create').resolves(newHabit);
            const res = {
                json: sinon.spy(),
                status: sinon.stub().resolvesThis
            }

            let stub = sandbox.stub(mongoose.Model, 'create').rejects(newHabit);

            let result = await habitCont.addHabit(newHabit, res)
        })
    })
})
