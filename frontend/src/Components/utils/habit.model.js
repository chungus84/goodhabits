export default class HabitModel {
    constructor(_id = null, name, minutes, distance = 0, createdAt) {
        this._id = _id;
        this.name = name;
        this.minutes = minutes;
        this.distance = distance;
        this.createdAt = createdAt;
    }
}
