import chai, { expect } from 'chai';

import Event from '../../src/models/event.model.js';

describe('Event Model Tests', () => {

    it('should return errors if required fields are empty', async () => {
        const newEvent = new Event();

        await newEvent.validate().catch(err => {

            expect(err.errors.name).to.exist;
            expect(err.errors.minutes).to.exist;
            expect(err.errors.distance).to.exist;

        })
    });

    it('should create a new event for Walking', (done) => {
        const newEvent = new Event({
            name: "Walking",
            date: new Date("2023-11-20"),
            minutes: 52,
            distance: 2.5
        });


        expect(newEvent).to.have.property('name').to.equal("Walking");
        expect(newEvent).to.have.property('minutes').to.equal(52);
        expect(newEvent).to.have.property('distance').to.equal(2.5);
        expect(newEvent).to.have.property('date').to.be.a('Date');
        expect(newEvent).to.have.property("_id").to.exist;

        done();

    });

    it('should create a new event for Running', (done) => {
        const newEvent = new Event({
            name: "Running",
            date: new Date("2023-10-13"),
            minutes: 40,
            distance: 3
        });


        expect(newEvent).to.have.property('name').to.equal("Running");
        expect(newEvent).to.have.property('minutes').to.equal(40);
        expect(newEvent).to.have.property('distance').to.equal(3);
        expect(newEvent).to.have.property('date').to.be.a('Date');
        expect(newEvent).to.have.property("_id").to.exist;

        done();
    });
})
