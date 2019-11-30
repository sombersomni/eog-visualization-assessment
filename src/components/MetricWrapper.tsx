import React from 'react';
import styled from 'styled-components';
//components 
import MetricSelect from '../Features/Metric/MetricSelect';
import MeasurementChart from '../Features/Measurement/MeasurementChart';
import MetricInfo from '../Features/Metric/MetricInfo';

const MetricContainer = styled.div`
    width: 100vw;
    min-height: 50vh;
    display: flex;
    flex-direction: row;
`;

export default function MetricWrapper() {
    const [metric, setMetric] = React.useState('injValveOpen');
    function handleChange(event: any) : void {
        const metric = event.target.value;
        setMetric(metric);
        //dispatch(actions.metricReceived(metric));
    };
    return (
        <MetricContainer>
            <MetricSelect 
                handleChange={handleChange} 
                metric={metric} />
            <MetricInfo metric={metric} />
            <MeasurementChart />
        </MetricContainer>
    )
}