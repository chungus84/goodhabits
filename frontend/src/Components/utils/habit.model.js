export default class HabitModel {
    constructor(_id, name, minutes, distance, createdAt) {
        this._id = _id;
        this.name = name;
        this.minutes = minutes;
        this.distance = distance;
        this.createdAt = createdAt;
    }
}
