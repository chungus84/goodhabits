import { useNavigate } from "react-router-dom";


const HabitCard = (habits) => {

    const navigate = useNavigate()
    // const { data } = habits.data
    console.log(habits.data.name);
    return (

        <div className="card col-lg-4 col-sm-10 col-xs-10 text-white bg-dark my-2"
            onClick={(() => navigate(`/habit/${habits._id}`))}>
            <div className="card-header">Habit</div>
            <div className="card-body">
                <h5 className="card-title">{habits.data.name}</h5>
                <p className="card-text"></p>
            </div>

        </div>

    )
}

export default HabitCard
