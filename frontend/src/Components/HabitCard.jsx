

const HabitCard = (habits) => {
    const { _id, name, minutes, distance } = habits.data
    console.log(name);
    return (
        <>
            <div className="card text-white bg-dark mb-3" style={{ maxWidth: "100%" }}>
                <div className="card-header">Habit</div>
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">minutes: {minutes} distance {distance}</p>
                </div>

            </div>
        </>
    )
}

export default HabitCard
