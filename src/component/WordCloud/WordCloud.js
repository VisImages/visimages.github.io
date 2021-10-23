import React from 'react';
import {makeStyles} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
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
    placeholder:{
        display: 'flex',
        height: '10px'
    }
}));


const options = {
    colors: ['#1f5886'],
    enableTooltip: true,
    deterministic: false,
    fontFamily: 'impact',
    fontSizes: [15, 60],
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

    
    const callbacks = {
        
        getWordColor: word => {
            if (d.clickOnWord)
                if (d.clickedWord == word.text)
                    return '#e94b4a'
            return '#1f5886'
        },
        onWordClick: word => {
            // console.log(word);
            if (!d.clickOnWord){
                d.clickOnWord = true;
                d.clickedWord = word.text;
            }
            else if (d.clickOnWord && d.clickedWord != word.text){
                d.clickedWord = word.text;
            }
            else {
                d.clickOnWord = false;
                d.clickedWord = "";
            }
        },
    }


    return <div className={classes.root}>
        {d.clickOnWord? <div className={classes.placeholder} onClick={() => d.initClickWord()}><Typography>{`Selected Word: ${d.clickedWord}`}</Typography><CloseIcon/></div>:<div className={classes.placeholder}></div>}
        <ReactWordcloud callbacks={callbacks} options={options} words={words}/>
    </div>
}

export default inject('d')(observer(WordCloud));
