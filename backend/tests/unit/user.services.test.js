import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(sinonChai);
chai.use(chaiAsPromised);

import UserServices from '../../src/services/user.service.js'
import mongoose, { mongo } from 'mongoose';

var sandbox = sinon.createSandbox();

describe('user service tests', () => {
    let findUserStub, sampleUser, user;

    user = new UserServices();

    beforeEach(() => {
        sampleUser = {
            _id: 123456789,
            firstName: "Test",
            lastName: "Testy",
            userName: "Testy McGee",
            email: "test@test.com",
            password: "password",
            habits: [
                {
                    name: "Running",
                    type: "cardio",
                    events: [],
                    createdAt: new Date("2023-11-01")
                },
                {
                    name: "Walking",
                    type: "cardio",
                    events: [],
                    createdAt: new Date("2023-11-01")
                }
            ],
            createdAt: new Date("2023-10-01"),
            save: sandbox.stub().resolves()
        }
        findUserStub = sandbox.stub(mongoose.Model, 'findById').resolves(sampleUser)
    });

    afterEach(() => {
        sandbox.restore();
    })

    describe('FindUserById', () => {
        it('should return sampleUser by id', async () => {
            const res = await user.findUserById(123456789);

            expect(findUserStub).to.have.been.calledOnceWith({ _id: 123456789 });
            expect(res).to.have.property('_id').to.equal(123456789);
            expect(res).to.have.property("firstName").to.equal("Test");
            expect(res).to.have.property("lastName").to.equal("Testy");
            expect(res).to.have.property("userName").to.equal("Testy McGee");
            expect(res).to.have.property("email").to.equal("test@test.com");
            expect(res).to.have.property('createdAt').to.be.a('date');

        });
        it('User object should have nested documents in habits', async () => {
            const res = await user.findUserById(123456789);

            expect(findUserStub).to.have.been.calledOnceWith({ _id: 123456789 });
            expect(res.habits.length).to.equal(2);
            expect(res.habits[0]).to.have.property('name').to.equal("Running")
            expect(res.habits[0]).to.have.property('type').to.equal("cardio");
            expect(res.habits[0]).to.have.property('createdAt').to.be.a('date');
            expect(res.habits[0]).to.have.property('events').to.be.empty;

        })
        it('should test that it throws and error if rejected', async () => {
            findUserStub.restore()
            findUserStub = sandbox.stub(mongoose.Model, 'findById').rejects(new Error("Problem"))

            try {
                await user.findUserById({ _id: 123456789 });
            } catch (err) {
                expect(err).to.be.instanceOf(Error);
                expect(err.message).to.equal("Problem");
            }
            findUserStub.restore()
        })

    })

    describe('addUser Tests', () => {
        let createUserStub, sampleUser, user;

        user = new UserServices();

        beforeEach(() => {
            sampleUser = {
                _id: 123456789,
                firstName: "Test",
                lastName: "Testy",
                userName: "Testy McGee",
                email: "test@test.com",
                password: "password",
                repeatedPassword: "password",
                save: sandbox.stub().resolves()
            }

        })
        it('should create a new user', async () => {
            createUserStub = sandbox.stub(mongoose.Model, 'create').resolves(sampleUser);
            const res = await user.addNewUser(sampleUser)


            expect(createUserStub).to.have.been.calledOnceWith(sampleUser);
            expect(res).to.have.property('firstName').to.equal(sampleUser.firstName)

        });

        it('should return an error with no firstName', async () => {


            const newUser = {
                lastName: "Testy",
                userName: "Testy McGee",
                email: "test@test.com",
                password: "password",
                repeatedPassword: "password",
                save: sandbox.stub().resolves()
            }
            createUserStub = sandbox.stub().resolves(newUser);

            await expect(user.addNewUser(newUser)).to.eventually.be.rejectedWith('User validation failed: firstName: Path `firstName` is required')

        })

    })
})
