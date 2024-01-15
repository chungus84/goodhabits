import { useNavigate } from "react-router-dom";
import "./utils/css/HabitCard.css"


const HabitCard = (userHabits) => {

    const navigate = useNavigate()

    const { data } = userHabits;

    return (
        <div className="card habit-card col-lg-3 col-sm-10 col-xs-10 my-2 mx-2"
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
