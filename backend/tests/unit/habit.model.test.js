import chai, { expect } from 'chai';

import Habit from '../../src/models/habit.model.js';

describe('Habit model', () => {

    it('should return errors if required fields are missing', async () => {
        let habit = new Habit();

        await habit.validate().catch(err => {


            expect(err.errors.name).to.exist;
            expect(err.errors.type).to.exist;
            expect(err.errors.events).to.not.exist;
            expect(err.errors.createdAt).to.exist;
            expect(err.message).to.equal('Habit validation failed: minutes: Path `minutes` is required., name: Path `name` is required.')
        })


    })
    // it('should create a new habit for walking', (done) => {
    //     let habit = new Habit({
    //         name: "Walking",
    //         type: "cardio",

    //     });


    //     expect(habit).to.have.property('name').to.equal("Walking")
    //     expect()
    //     expect(habit).to.have.property('createdAt').to.be.a('Date');

    //     done();
    // });

    // it('should create another habit for Running', (done) => {
    //     let habit = new Habit({
    //         name: "Running"

    //     });


    //     expect(habit).to.have.property('name').to.equal("Running")
    //     expect(habit).to.have.property('createdAt').to.be.a('Date');

    //     done();
    // })

})
