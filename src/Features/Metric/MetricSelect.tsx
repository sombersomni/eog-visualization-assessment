import React, { useState } from 'react';
//material ui
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
//utilities
import { Provider, createClient, useQuery } from 'urql';
import { useDispatch } from 'react-redux';
import { actions } from './reducer'
import { LinearProgress } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const client = createClient({
    url: 'https://react.eogresources.com/graphql'
});

const query = '{ getMetrics }';

export default () => (
    <Provider value={client}>
        <MetricSelect />
    </Provider>
)

function MetricSelect() {
    const [metric, setMetric] = useState('injValveOpen');
    const dispatch = useDispatch();
    const classes = useStyles();
    const inputLabel = React.useRef(null);
    function handleChange(event: any) : void {
        const metric = event.target.value;
        setMetric(metric);
        dispatch(actions.setMetric(metric));
    };

    const [result] = useQuery({
        query
    });
    const { data, fetching } = result;

    if(fetching) {
        return <LinearProgress />
    }

    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel ref={inputLabel} id="metric-select-outlined-label">
                    Metrics
        </InputLabel>
                <Select
                    labelId="metric-select-outlined-label"
                    id="metric-select-outlined"
                    value={metric}
                    onChange={handleChange}
                    labelWidth={80}
                >
                    { data ? data.getMetrics.map((metric: string) => (
                            <MenuItem value={metric} key={metric}>
                                {metric}
                            </MenuItem>
                    )) : null }
                </Select>
            </FormControl>
        </div>
    );
}