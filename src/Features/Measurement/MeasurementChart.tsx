import React from 'react';
import { useSelector } from 'react-redux';
import { createClient, useQuery, Provider } from 'urql';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
//material ui
import LinearProgress from '@material-ui/core/LinearProgress';
import { Measurement } from './reducer';
import { IState } from '../../store';
const client = createClient({ url: 'https://react.eogresources.com/graphql' });

const query = `
query($input: MeasurementQuery!) {
  getMeasurements(input: $input) {
        metric
        at
        value
        unit
    }
}
`;

export default () => (
    <Provider value={client}>
        <MeasurementChart />
    </Provider>
)

function mapResultToTable(measurements: Array<Measurement>): Array<Measurement> {
    return measurements.map((measurement: Measurement) => {
        const currentDate = new Date(measurement.at);
        const timeString = currentDate.toLocaleTimeString('en-US');
        return { ...measurement, at: timeString };
    })
}

function MeasurementChart() {
    const { selectedMetric } = useSelector((state: IState) => ({ selectedMetric: state.metric.selectedMetric }));
    const input = { metricName: selectedMetric }
    console.log(input);
    const [result] = useQuery({ query, variables: { input } });
    const { data, fetching } = result;
    if (!data) {
        return <LinearProgress />
    }
    return (
        <LineChart
        width={600}
        height={350}
        data={mapResultToTable(data.getMeasurements.slice(0, 100))}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="at" />
        <YAxis label={data.getMeasurements[0].unit} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 1 }} />
      </LineChart>
    )
}

/*
     
*/