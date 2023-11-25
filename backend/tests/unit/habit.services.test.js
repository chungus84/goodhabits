import chai, { expect } from 'chai';
import sinon from 'sinon'
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';


chai.use(sinonChai);
chai.use(chaiAsPromised);


import HabitServices from '../../src/services/habit.service.js';
// const HabitServices = rewire('../../src/services/habit.service')
import mongoose from 'mongoose';
import Habit from '../../src/models/habit.model.js';

var sandbox = sinon.createSandbox()


describe('habit service tests', () => {

    let findAllStub, sampleHabit, habits;

    habits = new HabitServices();

    beforeEach(() => {



        sampleHabit = {
            name: "Walking",
            createdAt: new Date("2023-11-03T14:27:31.294Z"),
            save: sandbox.stub().resolves()
        }
        findAllStub = sandbox.stub(mongoose.Model, 'find').resolves(sampleHabit);

    });

    afterEach(() => {
        sandbox.restore();
    })
    context('getHabits', () => {
        it('should return all habits', async () => {
            const retHabits = await habits.getHabits();
            expect(findAllStub).to.have.been.calledOnce;

            expect(retHabits).to.have.property('name').to.equal("Walking");
            expect(retHabits).to.have.property('createdAt').to.be.a('Date');
            findAllStub.restore()


        });
        it('should return an error when rejected', async () => {
            sandbox.restore()
            let rejectFindStub = sandbox.stub(mongoose.Model, 'find').rejects(new Error("can't find database"));
            // expect(async () => { await habits.getHabits() }).to.throw("can't find database")
            try {
                const res = await habits.getHabits();
            } catch (err) {
                expect(err).to.be.instanceOf(Error)
                expect(err.message).to.equal("can't find database")

            }


            // expect(rejectFindStub).to.have.been.calledOnce;
            // expect(res).to.be.a('Object')
            // expect(res.status).to.equal(404);
            // expect(res.error).to.equal("can't find database");
            rejectFindStub.restore();

        })
    });

    context('addHabit', () => {

        let FakeHabitClass, savedStub, result;

        beforeEach(async () => {
            savedStub = sandbox.stub().resolves(sampleHabit);
            // FakeHabitClass = sandbox.stub(Habit, 'create').callsFake((args) => {
            //     return new FakeHabitClass(args)
            // })

            // habits.__set__('Habit', FakeHabitClass)

            // result = await habits.addHabit(sampleHabit);
            // console.log(result);

        })

        it('should reject invalid args', async () => {
            await expect(habits.addHabit()).to.eventually.be.rejectedWith('Invalid arguments');

            await expect(habits.addHabit({ message: "Hi" })).to.eventually.be.rejectedWith('Invalid arguments');

        });

        it('should create a new habit', async () => {


            const newHabit = { name: "Walking" }

            let stub = sandbox.stub(mongoose.Model, 'create').resolves(newHabit);


            // console.log(FakeHabit);

            let res = await habits.addHabit(newHabit);

            expect(stub).to.have.been.calledOnceWith(newHabit);
            expect(res).to.have.property('name').to.equal("Walking");

            stub.restore();

        })

        it('should return an error', async () => {


            const newHabit = { name: "Walking" }

            let stub = sandbox.stub(mongoose.Model, 'create').rejects();

            try {
                let res = await habits.addHabit(newHabit);
            } catch (err) {

                expect(stub).to.have.been.calledOnce;
                expect(err).to.be.instanceOf(Error)
            }





        })




    })
})
