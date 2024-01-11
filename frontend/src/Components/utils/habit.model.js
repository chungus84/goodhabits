export default class HabitModel {

    constructor(_id, name, type, createdAt, userId) {
        this._id = _id;
        this.name = name;
        this.type = type;
        this.createdAt = createdAt;
        this.userId = userId
    }
}
