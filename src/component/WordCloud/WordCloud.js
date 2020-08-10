import React from 'react';
import {makeStyles} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import ReactWordcloud from 'react-wordcloud';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        right: theme.spacing(1),
        width: `calc(40vw - ${theme.spacing(1.5)}px)`,
        bottom: theme.spacing(1),
        height: `calc(50vh - ${theme.spacing(1.5)}px)`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
    },
}));

const options = {
    colors: ['#1f5886'],
    enableTooltip: true,
    deterministic: false,
    fontFamily: 'impact',
    fontSizes: [5, 60],
    fontStyle: 'normal',
    fontWeight: 'normal',
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 0],
    scale: 'sqrt',
    spiral: 'archimedean',
    transitionDuration: 100,
}

function WordCloud({d}) {
    const classes = useStyles();
    const words = d.showedWords;

    return <div className={classes.root}>
        <ReactWordcloud options={options} words={words}/>
    </div>
}

export default inject('d')(observer(WordCloud));
