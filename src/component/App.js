import React from 'react';
import {makeStyles, CssBaseline} from "@material-ui/core";
import AppBar from "./AppBar/AppBar";
import ControlPanel from "./ControlPanel/ControlPanel";
import Gallery from "./Gallery/Gallery";
import Distribution from "./Distribution/Distribution";
import WordCloud from "./WordCloud/WordCloud";
import DetailView from "./DetailView/DetailView";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: theme.palette.primary.main,
    },
}));

export default function App() {
    const classes = useStyles();

    return <div className={classes.root}>
        <CssBaseline/>
        <div>
            <AppBar/>
            <ControlPanel/>
            <Gallery/>
            <Distribution/>
            <WordCloud/>
            <DetailView/>
        </div>
    </div>;
}
