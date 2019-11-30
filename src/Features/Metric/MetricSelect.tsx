import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Provider, createClient, useQuery } from 'urql';

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
    const classes = useStyles();
    const [metric, setMetric] = React.useState('');

    const inputLabel = React.useRef(null);

    const handleChange = (event: any) => {
        setMetric(event.target.value);
    };

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