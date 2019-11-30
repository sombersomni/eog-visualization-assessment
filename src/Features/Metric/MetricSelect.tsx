import React, { useEffect } from 'react';
//material ui
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
//utilities
import { Provider, createClient, useQuery } from 'urql';
import { useDispatch } from 'react-redux';
import { actions } from './reducer';


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
    const {handleChange, metric} = props;
    const classes = useStyles();
    const inputLabel = React.useRef(null);
    const [result] = useQuery({
        query
    });

    const { data } = result;

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
                    { data && data.getMetrics ? 
                        result.data.getMetrics.map((metric: string) => (
                            <MenuItem value={metric} key={metric}>
                                {metric}
                            </MenuItem>
                    )) : null }
                </Select>
            </FormControl>
        </div>
    );
}