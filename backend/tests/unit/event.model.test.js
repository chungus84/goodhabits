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
})
