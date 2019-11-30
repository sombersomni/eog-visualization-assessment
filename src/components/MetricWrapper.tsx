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
    return (
        <MetricContainer>
            <MetricSelect />
            <MetricInfo />
            <MeasurementChart />
        </MetricContainer>
    )
}