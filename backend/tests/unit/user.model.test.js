import { expect } from 'chai';

import User from '../../src/models/user.model.js'

describe('User Model Tests', () => {
    it('should create an instance of User', (done) => {
        const newUser = {
            firstName: "Test",
            lastName: "Testy",
            userName: "Testy McGee",
            email: "test@test.com",
            password: "password",
            repeatedPassword: "password"
        }

        const user = new User(newUser);

        expect(user).to.have.property("firstName").to.equal(newUser.firstName);
        expect(user).to.have.property("lastName").to.equal(newUser.lastName);
        expect(user).to.have.property("userName").to.equal(newUser.userName);
        expect(user).to.have.property("email").to.equal(newUser.email);
        expect(user).to.have.property("habits").to.be.a('array').to.be.empty;

        done()

    })

    it('should return errors for each field not filled in', async () => {
        const testUser = new User({})

        await testUser.validate().catch(err => {
            expect(err.errors.firstName).to.exist;
            expect(err.errors.lastName).to.exist;
            expect(err.errors.userName).to.exist;
            expect(err.errors.email).to.exist;
            expect(err.errors.password).to.exist;
            expect(err.errors.habits).to.not.exist;
        })

    })
})
