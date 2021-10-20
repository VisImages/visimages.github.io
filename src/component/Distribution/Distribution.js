import React from 'react';
import { makeStyles } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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
  switchbox:{
    width: '30%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    position: 'relative',
    height: '90%',
  }
}));

function Distribution({ d }) {
  const classes = useStyles();
  const [stream, setVisType] = React.useState(true);

  const handleVisChange = (event) => {
    setVisType(event.target.checked);
  };

  const handleGroupedChange = (event) => {
    d.groupedCat = !d.groupedCat;
  };

  const handleSelectedChange = (event) => {
    d.showOnlySelected = !d.showOnlySelected;
  };



  return <div className={classes.root}>
    <FormGroup className={classes.switches}>
      <div className={classes.switchbox}>
        <Typography>Bar</Typography>
          <Switch checked={stream} onChange={handleVisChange}/>
        
        <Typography item>Stream</Typography>
      </div>
      <div className={classes.switchbox}>
        <Typography>All Vis.</Typography>
        <Switch checked={d.showOnlySelected} onChange={handleSelectedChange}/>
        <Typography item>Filtered Vis.</Typography>
      </div>
      <div className={classes.switchbox}>
        <Typography>Non-grouped</Typography>
        <Switch checked={d.groupedCat} onChange={handleGroupedChange}/>
        <Typography item>Grouped</Typography>
      </div>
      {/* <FormControlLabel control={<Switch checked={stream} onChange={handleVisChange} />} label="Stream" /> */}
      {/* <FormControlLabel control={<Switch checked={d.groupedCat} onChange={handleGroupedChange} />} label="Grouped" /> */}
    </FormGroup >
    <div className={classes.view}>
      {stream ? <Stream /> : <BarCharts />}
    </div>
  </div>
}

export default inject('d')(observer(Distribution));