import React from 'react';
import {makeStyles} from "@material-ui/core";
import {observer} from "mobx-react";
import Typography from "@material-ui/core/Typography";
import logo from './logo.png';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        width: '20vw',
        height: '5vh',
        left: 0,
        top: 0,
        borderBottomRightRadius: theme.spacing(0.5),
        backgroundColor: theme.palette.secondary.main,

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
    }
}));

function AppBar() {
    const classes = useStyles();

    return <div className={classes.root}>
        <img className={classes.logo}
             alt={'logo'} src={logo}/>
        <Typography className={classes.title}>VisImages</Typography>
    </div>
}

export default observer(AppBar);
