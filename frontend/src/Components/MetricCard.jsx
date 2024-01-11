import * as helper from './utils/helper';

const MetricCard = (data) => {

    return (
        <div className="card col-sm-10 col-xs-10 text-dark bg-white my-2">
            <h3>{`${data.data.name} completed this week.`}</h3>
            <h2>{`${data.data.total} ${data.data.metric === "minutes" ? "mins" : "miles"}`}</h2>
        </div>
    )
}

export default MetricCard
