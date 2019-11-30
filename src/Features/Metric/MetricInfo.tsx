import React, { useEffect, useState } from 'react';
import { Provider, useSubscription, createClient, defaultExchanges, subscriptionExchange } from 'urql';
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
        <MetricInfo />
    </Provider>
)

// const getMeasurement = (state: IState) => {
//     const { metric, at, value, unit } = state.measurement;
//     return {
//         metric,
//         at,
//         value,
//         unit
//     };
// };

function MetricInfo({metric = 'oilTemp'}) {
    const classes = useStyles();

    const [ result ] = useSubscription({ query });
    const [ savedMeasurement, saveMeasurement ] = useState({
        value: 10,
        unit: '%'
    })

    const { data, fetching } = result;
    
    useEffect(() => {
        console.log(result, metric);
        if (data && data.newMeasurement.metric === metric) {
            saveMeasurement({...data.newMeasurement});
        }
    }, [data])

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    { metric }
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {data && data.newMeasurement.metric === metric ? `${data.newMeasurement.value} ${data.newMeasurement.unit}` : `${savedMeasurement.value} ${savedMeasurement.unit}` }
                </Typography>
            </CardContent>
        </Card>
    );
}