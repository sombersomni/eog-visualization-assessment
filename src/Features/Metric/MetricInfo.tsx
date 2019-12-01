import React, { useEffect, useState } from 'react';
import { Provider, useSubscription, createClient, defaultExchanges, subscriptionExchange } from 'urql';
import { useSelector, useDispatch } from 'react-redux';
import { actions, Measurement } from '../Measurement/reducer';
//matrial ui
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { IState } from '../../store';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import { LinearProgress } from '@material-ui/core';

const useStyles = makeStyles({
    card: {
        minWidth: 275,
        height: 100
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const client = createClient({
    url: 'https://react.eogresources.com/graphql',
    exchanges: [
        ...defaultExchanges,
        subscriptionExchange({ forwardSubscription: operation => subscriptionClient.request(operation)})
    ]
});

const subscriptionClient = new SubscriptionClient( 'ws://react.eogresources.com/graphql', { reconnect: true });

const query = 'subscription { newMeasurement { metric value at unit } }';

export default () => (
    <Provider value={client}>
        <MultipleMetrics/>
    </Provider>
)

function MultipleMetrics() {
    const dispatch = useDispatch();
    //const { selectedMetrics } = useSelector((state: IState) => ({ selectedMetrics: state.selectedMetrics }));
    const [ result ] = useSubscription({ query });
    const { data } = result;
    return (
        <div>
            { ['oilTemp'].map((metric: string) => (
                <MetricInfo 
                    key={metric}
                    metric={metric}
                    measurement={data && data.newMeasurement.metric === metric ? data.newMeasurement : null} />
            )) }
        </div>
    )
}

function MetricInfo(props: { metric: string, measurement: Measurement}) {
    const { metric, measurement } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const [ savedMeasurement, saveMeasurement ] = useState({
        metric,
        value: 10,
        unit: '%'
    })

    useEffect(() => {
        if (measurement) {
                saveMeasurement({...measurement});
                dispatch(actions.measurementReceived(measurement));
        }
    }, [measurement])

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    { metric }
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {`${measurement.value} ${measurement.unit}`}
                </Typography>
            </CardContent>
        </Card>
    );
}