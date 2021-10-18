import React from 'react';
import {makeStyles} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import BarCharts from './BarCharts';
import Stream from './Stream';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        left: `calc(20vw + ${theme.spacing(1)}px)`,
        width: `calc(40vw - ${theme.spacing(1.5)}px)`,
        bottom: theme.spacing(1),
        height: `calc(50vh - ${theme.spacing(1.5)}px)`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1)
    },
    switches: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        height: '10%',
    },
    view: {
        position: 'relative',
        height: '90%',
    }
}));

function Distribution({d}) {
    const classes = useStyles();
    const [stream, setVisType] = React.useState(true);

    const handleVisChange = (event) => {
        setVisType(event.target.checked);
      };

      const handleGroupedChange = (event) => {
        d.groupedCat = !d.groupedCat;
      };

    return <div className={classes.root}>
        <FormGroup  className={classes.switches}>
            <FormControlLabel control={<Switch checked={stream} onChange={handleVisChange}/>} label="Stream" />
            <FormControlLabel control={<Switch checked={d.groupedCat} onChange={handleGroupedChange}/>} label="Grouped" />
        </FormGroup >
        <div className = {classes.view}>
            {stream?<Stream/>:<BarCharts/>}
        </div>
    </div>
}

export default inject('d')(observer(Distribution));