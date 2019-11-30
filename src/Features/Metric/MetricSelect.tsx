import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { createClient, useQuery } from 'urql';

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

export default function SimpleSelect() {
    const classes = useStyles();
    const [metric, setMetric] = React.useState('');

    const inputLabel = React.useRef(null);

    const handleChange = (event: any) => {
        setMetric(event.target.value);
    };

    const [result] = useQuery({
        query
    });

    console.log(result);

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
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}