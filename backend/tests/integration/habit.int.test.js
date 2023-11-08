import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import server from '../../index.js';
import Habit from '../../src/models/habit.model.js';
import testHabits from '../testdata/sampleHabit.js'

const habitArray = testHabits.habits;

chai.use(chaiHttp);

describe('Testing requests for habits on database', () => {

    beforeEach(async () => {
        try {
            await Habit.deleteMany();
            console.log(`Database has been cleared`);
        } catch (e) {
            console.log(`Error clearing Database`);
            throw new Error(e.message);
        };

        try {
            await Habit.insertMany(habitArray);
            console.log(`Populated Habit database with habits`);
        } catch (e) {
            console.log(`Error populating database with test data`);
            throw new Error();
        };
    });

    describe('/GET request for habits', () => {
        it('should return with a status of 200 from GET request', async () => {
            const res = (await chai.request(server).get('/')).setEncoding();
            expect(res).to.have.status(200);
        });
        it('should return an array of events from GET request', async () => {
            const res = await chai.request(server).get('/').send();
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.equal(habitArray.length);
        })
    });

    describe('/POST request for events', () => {
        it('should return a 201 from POST request', async () => {
            const req = {
                body: {
                    name: "Reading",
                    minutes: 120,
                }
            }

            const res = await chai.request(server).post('/').send(req.body);
            expect(res).to.have.status(201);

        });

        it('should return a 400 on malformed data with POST', async () => {
            const req = {
                body: {

                }
            }

            const res = await chai.request(server).post("/").send(req.body);
            expect(res).to.have.status(400);
        })
    })
});
