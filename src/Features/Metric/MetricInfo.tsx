import React from 'react';
import { Provider, useSubscription, createClient } from 'urql';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { IState } from '../../store';

const useStyles = makeStyles({
    card: {
        minWidth: 275,
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
    url: 'https://react.eogresources.com/graphql'
});

const query = `subscription { 
    newMeasurement {
        metric
        at
        value
        unit
    } 
}`;

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

function MetricInfo() {
    const classes = useStyles();

    //useSubscription({ query });

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    Metric
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    adjective
        </Typography>
                <Typography variant="body2" component="p">
                    well meaning and kindly.
          <br />
                    {'"a benevolent smile"'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}