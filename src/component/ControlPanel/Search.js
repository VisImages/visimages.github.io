import React from 'react';
import {makeStyles, InputBase, fade} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import {inject, observer} from "mobx-react";

const useStyles = makeStyles(theme => ({
    search: {
        position: 'relative',
        flex: '0 0 fit-content',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        margin: theme.spacing(1),
        width: '100%',
    },
    searchIcon: {
        padding: theme.spacing(0, 2, 0, 0),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: `calc(100% - ${theme.spacing(2)}px)`,
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
        width: '100%',
    },
}));

function Search({d}) {
    const classes = useStyles();

    return <div className={classes.search}>
        <div className={classes.searchIcon}>
            <SearchIcon/>
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
          }}
          onKeyPress={e => {
              if (e.key === 'Enter') d.updateFilter('search', e.target.value);
          }}
        />
    </div>
}

export default inject('d')(observer(Search));
