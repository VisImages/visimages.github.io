import React from 'react';
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        left: 0,
        width: `20vw`,
        top: `calc(9vh + ${theme.spacing(1)}px)`,
        bottom: theme.spacing(1),
        borderRadius: `0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0`,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexDirection: 'column',
    },
    title:{
        padding: '15px',
        fontWeight: 'bold'
    },
    authors:{
        padding: '0px 15px 0px 15px',
        fontWeight: 'bold'
    },
    abstract:{
        padding: '15px'
    }
}));


export default function LeftBar() {
    const classes = useStyles();

    return <div className={classes.root}>
        <Typography variant='h6' className={classes.title}>
            A Corpus of Visualizations in the Images of Visualization Publications
        </Typography>

        <Typography  variant='h7' className={classes.authors}>
        Dazhen Deng, Yihong Wu, Xinhuan Shu, Jiang Wu, Mengye Xu, Siwei Fu, Weiwei Cui, Yingcai Wu
        </Typography>
        
        <Typography  variant='h7' className={classes.abstract}>
        Images in visualization publications contain rich information, e.g., novel visualization designs and common combinations of visualizations. A systematic collection of these images can contribute to the community in many aspects, such as literature analysis and automated tasks for visualization. In this paper, we build and make public a dataset, VisImages, which collects 12,267 images with captions from 1,397 papers in IEEE InfoVis and VAST. Based on a comprehensive visualization taxonomy, the dataset includes 35,096 annotated visualizations, as well as their bounding boxes in the images. We demonstrate the usefulness of VisImages through three use cases: 1) investigating the use of visualizations in the publications with VisImages Explorer, 2) training and benchmarking models for visualization classification, and 3) localizing visualizations in the visual analytics systems automatically.
        </Typography>
    </div>
}