import chai, { expect } from 'chai';
import sinon from 'sinon'
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(sinonChai);
chai.use(chaiAsPromised);


import HabitServices from '../../src/services/habit.service.js';
import mongoose from 'mongoose';

var sandbox = sinon.createSandbox()


describe('habit service tests', () => {

    let findAllStub, sampleHabit, habits;

    habits = new HabitServices();

    beforeEach(() => {
        sampleHabit = {
            name: "Walking",
            createdAt: new Date("2023-11-03T14:27:31.294Z")
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

            const res = await habits.getHabits();

            expect(rejectFindStub).to.have.been.calledOnce;
            expect(res).to.be.a('Object')
            expect(res.status).to.equal(404);
            expect(res.error).to.equal("can't find database");
            rejectFindStub.restore();

        })
    })
})
