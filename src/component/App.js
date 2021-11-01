import React from 'react';
import { makeStyles, CssBaseline } from "@material-ui/core";
import AppBar from "./AppBar/AppBar";
import ControlPanel from "./ControlPanel/ControlPanel";
import Gallery from "./Gallery/Gallery";
import Distribution from "./Distribution/Distribution";
import WordCloud from "./WordCloud/WordCloud";
import DetailView from "./DetailView/DetailView";
import LeftBar from './Home/LeftBar';
import RightPanel from './Home/RightPanel';
import { inject, observer } from "mobx-react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: theme.palette.primary.main,
    },
}));


function App({ d }) {
    const classes = useStyles();
    console.log(d.router);

    return <div className={classes.root}>
        <CssBaseline />
        <AppBar />
        {d.router == "home" ?
            <React.Fragment>
                <LeftBar/>
                <RightPanel/>
            </React.Fragment> :
            <React.Fragment>
                <ControlPanel />
                <Gallery />
                <Distribution />
                <WordCloud />
                <DetailView />

            </React.Fragment>}
    </div>;
}

export default inject('d')(observer(App))
