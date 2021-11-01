import React from 'react';
import {makeStyles} from "@material-ui/core";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from "@material-ui/core/Typography";
import logo from './logo.svg';
import {inject, observer} from "mobx-react";

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        width: '20vw',
        height: '9vh',
        left: 0,
        top: 0,
        borderBottomRightRadius: theme.spacing(0.5),
        backgroundColor: theme.palette.primary.dark,

    },
    titleGroup: {
        width: '100%',
        height: '4vh',
        display: 'flex',
        alignItems: 'center',
    },
    logo: {
        margin: theme.spacing(2, 5),
        height: '3vh',
    },
    title: {
        fontSize: '2vh',
        color: theme.palette.secondary.contrastText,
    },
    tabGroup: {
        width: '100%',
        height: '4vh',
    },
}));

function AppBar({d}) {
    const classes = useStyles();

    const routers = ['home','explorer']

    const handleChange = (event, newValue) => {
        d.router = routers[newValue];
    };

    return <div className={classes.root}>
        <div className={classes.titleGroup}>
        <img className={classes.logo}
             alt={'logo'} src={logo}/>
        <Typography className={classes.title}>VisImages</Typography>
        </div>
        <Tabs
            className={classes.tabGroup}
            value={routers.indexOf(d.router)}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            centered
        >
            <Tab label="home" index={0}/>
            <Tab label="explorer" index={1}/>
        </Tabs>
    </div>
}

export default inject('d')(observer(AppBar));
