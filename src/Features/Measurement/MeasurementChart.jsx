import React from 'react';
import { createClient, useQuery, Provider } from 'urql';
//material ui
import LinearProgress from '@material-ui/core/LinearProgress';

const client = createClient({ url: 'https://react.eogresources.com/graphql' });

const query = `
query {
    heartBeat
}
`
const hours = 5;
const hourDiff = 1000 * 60 * 60 * hours;

export default () => (
    <Provider value={client}>
        <MeasurementChart />
    </Provider>
)

function MeasurementChart() {
    const [ result ] = useQuery({ query });
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