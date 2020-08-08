import React from 'react';
import {makeStyles, useTheme} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import {AutoSizer, List, CellMeasurer, CellMeasurerCache} from "react-virtualized";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
    },
}));

const cache = new CellMeasurerCache({defaultHeight: 100, fixedWidth: true});

function CellRenderer({index, key, parent, style, list}) {
    return <CellMeasurer key={key} rowIndex={index} columnIndex={0} cache={cache} parent={parent}>
        {({measure, registerChild}) => <div ref={registerChild} style={style}>
            {list[index](measure)}
        </div>}
    </CellMeasurer>
}


function VirtualList({children}) {
    const classes = useStyles();
    const theme = useTheme();

    return <div className={classes.root}>
        <AutoSizer>
            {({height, width}) => (
              <List
                height={height}
                rowCount={children.length}
                rowHeight={cache.rowHeight}
                deferredMeasurementCache={cache}
                rowRenderer={({index, key, parent, style}) => CellRenderer({index, key, parent, style, list: children})}
                width={width}
                style={{
                    paddingRight: theme.spacing(0),
                    transform: `translateX(${theme.spacing(0)}px)`,
                    outline: 'none',
                }}
              />
            )}
        </AutoSizer>
    </div>
}

export default inject()(observer(VirtualList));
