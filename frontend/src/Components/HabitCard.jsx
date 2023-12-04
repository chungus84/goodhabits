import { useNavigate } from "react-router-dom";


const HabitCard = (userHabits) => {

    const navigate = useNavigate()
    // const { data } = habits.data
    const { data, habits } = userHabits;
    // console.log(data);
    return (

        <div className="card col-lg-3 col-sm-10 col-xs-10 text-white bg-dark my-2 mx-2"
            onClick={(() => navigate(`/habit/${data._id}`))}>
            <div className="card-header">Habit type: {data.type}</div>
            <div className="card-body">
                <h5 className="card-title">{data.name}</h5>
                <p className="card-text"></p>
            </div>

        </div>

    )
}

export default HabitCard
