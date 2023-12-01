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

    });

    it('should create another instance of a User', (done) => {
        const newUser = {
            firstName: "Joe",
            lastName: "Bloggs",
            userName: "BloJoe",
            email: "joe@test.com",
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

    });



    it('should return errors for each field not filled in', async () => {
        const testUser = new User({})

        await testUser.validate().catch(err => {
            // console.log(err.errors);

            expect(err.errors.firstName).to.exist;
            expect(err.errors.lastName).to.exist;
            expect(err.errors.userName).to.exist;
            expect(err.errors.email).to.exist;
            expect(err.errors.password).to.exist;
            expect(err.errors.habits).to.not.exist;
        })

    })

    it('should add a new Habit to the habit array', () => {
        const newUser = {
            firstName: "Test",
            lastName: "Testy",
            userName: "Testy McGee",
            email: "test@test.com",
            password: "password",
            repeatedPassword: "password"
        }

        const newHabit = {
            name: "Running",
            type: "cardio",
            createdAt: new Date("2022-11-01")
        }

        const user = new User(newUser);

        user.habits.push(newHabit);

        expect(user.habits[0]).to.have.property('name').to.equal(newHabit.name)
        expect(user.habits[0]).to.have.property('type').to.equal(newHabit.type)
        expect(user.habits[0]).to.have.property('events').to.be.empty;
        expect(user.habits[0]).to.have.property('createdAt').to.be.a('Date')

    })

    it('should produce error messages for malformed habit', async () => {
        const newUser = {
            firstName: "Test",
            lastName: "Testy",
            userName: "Testy McGee",
            email: "test@test.com",
            password: "password",
            repeatedPassword: "password"
        }

        const failedHabit = {
            name: ""
        }

        const user = new User(newUser);

        user.habits.push(failedHabit)

        await user.validate().catch(err => {

            expect(err.errors['habits.0.type']).to.exist
            expect(err.errors['habits.0.name']).to.exist
        })


    })


})
