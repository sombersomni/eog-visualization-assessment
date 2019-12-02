import React, { useEffect, useState } from 'react';
import { Provider, useSubscription, createClient, defaultExchanges, subscriptionExchange } from 'urql';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../Measurement/reducer';
//matrial ui
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { IState } from '../../store';
import {SubscriptionClient} from 'subscriptions-transport-ws';

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
        <MetricInfo />
    </Provider>
)


function MetricInfo() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { selectedMetric } = useSelector((state: IState) => ({ selectedMetric: state.metric.selectedMetric }));
    const [ result ] = useSubscription({ query });
    const { data } = result;
    const [ savedMeasurement, saveMeasurement ] = useState({
        selectedMetric,
        value: 10,
        unit: '%'
    })

    useEffect(() => {
        if (data) {
            const { newMeasurement } = data;
                if (newMeasurement.metric === selectedMetric) {
                    saveMeasurement({...newMeasurement});
                    dispatch(actions.measurementReceived(newMeasurement));
                }
        }
    }, [data])

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    { selectedMetric }
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {data && data.newMeasurement.metric === selectedMetric? `${data.newMeasurement.value} ${data.newMeasurement.unit}` : `${savedMeasurement.value} ${savedMeasurement.unit}`}
                </Typography>
            </CardContent>
        </Card>
    );
}