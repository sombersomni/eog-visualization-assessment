import React, { useEffect, useState } from 'react';
//material ui
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
//utilities
import { Provider, createClient, useQuery } from 'urql';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer'
import { IState } from '../../store';


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

export default (props: any) => (
    <Provider value={client}>
        <MetricSelect handleChange={props.handleChange} metric={props.metric}/>
    </Provider>
)

function MetricSelect(props: any) {
    const [metric, setMetric] = useState('injValveOpen');
    const [metricOptions, setMetricOptions] = useState([]);
    const dispatch = useDispatch();
    const [selectedMetric] = useSelector((state: IState) => { setelectedMetric: state.setelectedMetric });
    const classes = useStyles();
    const inputLabel = React.useRef(null);
    function handleChange(event: any) : void {
        const metric = event.target.value;
        setMetric(metric);
        dispatch(actions.addMetric(metric));
    };

    useEffect(() => {
        const [result] = useQuery({
            query
        });
        const { data } = result;
        setMetricOptions(data.getMetrics);
    }, [])


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
                    { metricOptions.map((metric: string) => (
                            <MenuItem value={metric} key={metric}>
                                {metric}
                            </MenuItem>
                    )) : null }
                </Select>
            </FormControl>
        </div>
    );
}