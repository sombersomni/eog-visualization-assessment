import React from 'react';

const query = `
query {
    heartBeat
}
`
function MeasurementChart() {
    return (
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
    )
}