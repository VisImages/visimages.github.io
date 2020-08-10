import React, {useEffect, useState} from 'react';
import {makeStyles, CircularProgress, Typography} from "@material-ui/core";
import {inject, observer} from "mobx-react";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: '100%',
    },
}));

function Image({src}) {
    const classes = useStyles();

    const [state, setState] = useState('loading');

    const [imgSrc, setSrc] = useState(null);
    useEffect(() => {
        const controller = new AbortController();
        const {signal} = controller;
        fetch(src, {signal})
          .then(res => res.blob())
          .then(img => {
              setSrc(URL.createObjectURL(img));
              setState('loaded');
          })
          .catch(e => {
              setState('error');
          });
        return () => {
            controller.abort();
        }
    }, [src]);

    return <div className={classes.root}>
        {state === 'loading' && <CircularProgress/>}
        {state === 'loaded' && <img className={classes.img} src={imgSrc} alt={src}/>}
        {state === 'error' && <Typography className={classes.img}>Fail to load.</Typography>}
    </div>
}

export default observer(Image);
