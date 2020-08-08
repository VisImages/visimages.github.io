import React, {useEffect} from 'react';
import {makeStyles, Typography} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import VirtualList from "./VirtualList";

const useStyles = makeStyles(theme => ({
    cnt: {
        margin: theme.spacing(1),
        flex: '0 0 fit-content',
    },
    list: {
        margin: theme.spacing(0, 1, 1, 1),
        flex: 1,
        overflow: 'hidden',
    },
    paperItem: {
        margin: theme.spacing(1, 0)
    }
}));

function PaperItem({paper, onLoad}) {
    useEffect(() => {
        onLoad();
    }, [paper.title, onLoad]);

    return <li>{paper.title}</li>
}

function AllPapers({d}) {
    const classes = useStyles();
    const papers = d.filteredPapers;

    return <React.Fragment>
        <Typography className={classes.cnt}>Find {papers.length} paper{papers.length !== 1 && 's'}.</Typography>
        <div className={classes.list}>
            <VirtualList>
                {papers.map(p => measure => <PaperItem paper={p} onLoad={measure}/>)}
            </VirtualList>
        </div>
    </React.Fragment>
}

export default inject('d')(observer(AllPapers));
