import React from 'react';
import { useSelector } from 'react-redux';
import { createClient, useQuery, Provider } from 'urql';
//material ui
import LinearProgress from '@material-ui/core/LinearProgress';
import { IState }from '../../store';
const client = createClient({ url: 'https://react.eogresources.com/graphql' });

const query = `
query($input: MeasurmentQuery!) {
  getMeasurements(input: $input) {
        metric
        at
        value
        unit
    }
}
`;
const hours = 5;
const hourDiff = 1000 * 60 * 60 * hours;

export default () => (
    <Provider value={client}>
        <MeasurementChart />
    </Provider>
)

function MeasurementChart() {
    const { metric, at, value, unit } = useSelector((state: IState) => ({ ...state.measurement}));
    const currentTimestamp = Date.now();
    const input = { metricName: 'oilTemp', after: currentTimestamp, before: currentTimestamp - hourDiff }
    const [ result ] = useQuery({ query, variables: { input } });
    const { data, fetching } = result;
    if (fetching) {
        return <LinearProgress />
    }
    console.log(result);
    return (
        <div>
            Metric and Measurement
        </div>
    )
}

/*
    <LineChart width={730} height={500} data={[{name: 'a', pv: 12, uv: 100 }]}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
*/