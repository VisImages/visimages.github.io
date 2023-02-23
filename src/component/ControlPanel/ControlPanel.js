import React from 'react';
import {makeStyles} from "@material-ui/core";
import {observer} from "mobx-react";
import Filters from "./Filters";
import Search from "./Search";
import BarCharts from "./BarCharts";
import AllPapers from "./AllPapers";

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        left: 0,
        width: `400px`,
        top: `calc(9vh + ${theme.spacing(1)}px)`,
        bottom: theme.spacing(1),
        borderRadius: `0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0`,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexDirection: 'column',
    },
}));

function ControlPanel() {
    const classes = useStyles();

    return <div className={classes.root}>
        <Search/>
        <BarCharts/>
        <Filters title={'Conference'} value={'Conferences'}/>
        <Filters title={'Authors'} value={'Authors'}/>
        <AllPapers/>
    </div>
}

export default observer(ControlPanel);
