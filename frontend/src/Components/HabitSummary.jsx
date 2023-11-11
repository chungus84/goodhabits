import { useNavigate } from "react-router-dom"

const HabitSummary = () => {

    const navigate = useNavigate()
    return (
        <>
            <div>HabitSummary</div>
            <div onClick={(() => navigate(`/`))}>back</div>

        </>

    )
}

export default HabitSummary
