import * as helper from './utils/helper';

const MetricCard = (metric, total) => {
    return (
        <div className="card col-lg-4 col-sm-10 col-xs-10 text-dark bg-white my-2">
            <h3>{`minutes completed this week: `}</h3>
            <h2>{total}</h2>
        </div>
    )
}

export default MetricCard
