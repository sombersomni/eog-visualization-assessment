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
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: row;

    div {
        margin: 10px;
    }
`;

export default function MetricWrapper() {
    return (
        <MetricContainer>
            <InfoContainer>
                <MetricSelect />
                <MetricInfo />
            </InfoContainer>
            <MeasurementChart />
        </MetricContainer>
    )
}