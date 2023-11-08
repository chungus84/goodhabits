

const HabitCard = (habits) => {
    // const { data } = habits.data
    console.log(habits.data);
    return (
        <>
            <div className="card text-white bg-dark mb-3" style={{ maxWidth: "100%" }}>
                <div className="card-header">Habit</div>
                <div className="card-body">
                    <h5 className="card-title">{habits.data}</h5>
                    <p className="card-text"></p>
                </div>

            </div>
        </>
    )
}

export default HabitCard
