import React from 'react';
import { makeStyles } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import Typography from "@material-ui/core/Typography";
import dataStructure from './data-structure.png';
import pipeline from './pipeline.png';
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        padding: theme.spacing(1),
        left: `calc(20vw + ${theme.spacing(1)}px)`,
        right: theme.spacing(1),
        top: theme.spacing(1),
        height: `calc(100vh - ${theme.spacing(2)}px)`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        overflow: 'scroll'
    },
    title: {
        padding: '10px 30px 10px 30px',
        fontWeight: 'bold'
    },
    figure: {
        padding: '10px 60px 10px 60px',
        maxWidth: '1080px',
    },
    figureHalf: {
        display: 'block',
        padding: '10px 60px 10px 60px',
        maxWidth: '600px',
    },
    details: {
        display: 'block',
        padding: '10px 60px 40px 60px',
        width: '80%',
    },
    lists: {
        display: 'block',
        padding: '0px 60px 10px 60px',
        width: '80%',
    },
    table: {
        padding: '0px 60px 10px 60px',
    },
    th: {
        borderRight: "1px solid black",
    },
    td: {
        borderRight: "1px solid black",
    },
    th2: {
        borderTop: "1px solid black",
    },
    th3: {
        borderBottom: "2px solid black",
    }
}));


function RightPanel({ d }) {
    const classes = useStyles();

    const tableData = {
        "Area": "area chart, proportional area chart",
        "Bar": "bar chart",
        "Circle ": "donut chart, pie chart",
        "Diagram": "flow diagram, chord diagram, Sankey diagram, Venn diagram",
        "Statistic": "box plot, error bar, stripe graph",
        "Table": "table",
        "Line": "contour graph, line chart, storyline, polar plot, parallel coordinate (PCP), surface graph, vector graph",
        "Map": "map",
        "Point": "scatter plot",
        "Grid & Matrix": "heatmap, matrix",
        "Word": "phrase net, word cloud, word tree",
        "Tree & Graph ": "graph, tree, treemap, hierarchical edge bundling, sunburst/icicle chart",
        "Special": "glyph-based visualization, unit visualization"
    }

    const changeState = () => {
        d.router = "explorer";
    }

    return <div className={classes.root}>
        <Typography variant="h6" className={classes.title}>
            Data Structure
        </Typography>
        <img src={dataStructure} className={classes.figureHalf} />
        <Typography variant="h7" className={classes.details}>
            The data in VisImages is organized into three levels, namely, paper, image, and visualization. The paper data includes metadata of the paper (i.e., title, authors, conference, year) and image data. The metadata of the paper is coded from vispubdata.org. The image data is a list of the data of each image, which includes the image file name, textual caption, image position (bounding box) in the paper, and visualitzation data.
            The visualization data is a list of the data of each visualization, including the visualization type and visualization position (bounding box) in the image.
            In all, the dataset contain the data of 1,397 papers, 12,267 images, and 35,096 visualizations. You can explore the data using <a style={{ display: 'inline', color: 'blue', cursor: 'pointer', 'text-decoration': 'underline'}} onClick={changeState}>VisImages Explorer</a>.
        </Typography>


        <Typography variant="h6" className={classes.title}>
            Data & Codes
        </Typography>
        <ul className={classes.lists}>
            <li>
                <a href="https://drive.google.com/drive/folders/1p00qs7PXCpbxhcaeDeYV4bENh8Jmn53r?usp=sharing">Download the Dataset.</a>
            </li>
            <li>
                <a href="https://github.com/VisImages/data">Source Code for Images Extraction.</a>
            </li>
            <li>
                <a href="https://github.com/VisImages/caption_tool">Source Code of Caption Validation and Correction Tool.</a>
            </li>
            <li>
                <a href="https://github.com/VisImages/visimages_annotation">Source Code of Image Annotation Interface.</a>
            </li>
        </ul>

        <Typography variant="h6" className={classes.title}>
            Data Annotation Process
        </Typography>
        <img src={pipeline} className={classes.figure} />
        <Typography variant="h7" className={classes.details}>
            To ensure the quality and efficiency of the annotation, we adopt a framework with carefully designed tasks and cross-validation procedures. Specifically, we recruit senior visualization practitioners to annotate visualization types and employ crowd workers for bounding box annotation.
        </Typography>

        <Typography variant="h6" className={classes.title}>
            Visualization Taxonomy
        </Typography>
        <table className={classes.table}>
            <tr>
                <th className={clsx(classes.th, classes.th3)}>Categories</th>
                <th className={classes.th3}>Subtypes</th>
            </tr>
            {Object.keys(tableData).map((key, index) => {
                if (index == Object.keys(tableData).length - 1){
                    return <tr>
                    <td className={clsx(classes.td, classes.th3)}>{key}</td>
                    <td className={classes.th3}>{tableData[key]}</td>
                </tr>
                }
                return <tr>
                    <td className={classes.td}>{key}</td>
                    <td>{tableData[key]}</td>
                </tr>
            })}
        </table>
        <Typography variant="h7" className={classes.details}>
            We use a comprehensive taxonomy proposed by <a href="https://ieeexplore.ieee.org/document/6634103/">Borkin et al.</a> to classify the visualization types contained in the images.
        </Typography>
    </div>
}


export default inject('d')(observer(RightPanel));