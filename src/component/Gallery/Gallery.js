import React, {useState} from 'react';
import {makeStyles, GridList, GridListTileBar, GridListTile, Typography} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import Pagination from "@material-ui/lab/Pagination";
import VisCatFilters from "./VisCatFilters";
import Image from "./Image";

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        padding: theme.spacing(1),
        left: `calc(20vw + ${theme.spacing(1)}px)`,
        right: theme.spacing(1),
        top: theme.spacing(1),
        height: `calc(50vh - ${theme.spacing(1.5)}px)`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        position: 'absolute',
        top: 50,
        width: `calc(100% - ${theme.spacing(1)}px)`,
        height: 'calc(100% - 50px)',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    titleBar: {
        // background:'transparent',
        // color:'transparent'
        background:
          'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
          'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    actions: {
        position: 'relative',
        zIndex: 100,
        display: 'flex',
        width: '100%',
        marginBottom: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
    },
    filter: {
        flex: '0 1 fit-content',
    },
    placeholder: {
        flex: 1,
    },
    stat: {
        display: 'flex',
        flex: '0 0 fit-content',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pagination: {
        flex: '0 0 fit-content',
    }
}));

function Gallery({sys, d}) {
    const classes = useStyles();
    const cntPerPage = 20;
    const [page, setPage] = useState(1);

    return <div className={classes.root}>
        <div className={classes.actions}>
            <VisCatFilters/>
            <div className={classes.placeholder}/>
            <div className={classes.stat}>
                <Typography>{d.showedImages.length} images found.</Typography>
                <Pagination
                  className={classes.pagination}
                  page={page}
                  count={Math.ceil(d.showedImages.length / cntPerPage)}
                  onChange={(e, newPage) => setPage(newPage)}/>
            </div>
        </div>
        <GridList cellHeight={200} spacing={10} className={classes.gridList} cols={5}>
            {
                d.showedImages
                  .slice((page - 1) * cntPerPage, page * cntPerPage)
                  .map(img => {
                      const {title} = d.getPaperInfo(img.pid);
                  return <GridListTile key={`${img.pid},${img.iid}`}
                                            cols={1} rows={1}
                                            style={{cursor: 'pointer'}}
                                            onClick={() => sys.showDetail(img.pid, img.iid, img.src)}>
                      <Image src={img.src}/>
                      <GridListTileBar
                        title={title}
                        titlePosition="top"
                        actionPosition="left"
                        className={classes.titleBar}
                      />
                  </GridListTile>})
            }
        </GridList>
    </div>
}

export default inject('d', 'sys')(observer(Gallery));
