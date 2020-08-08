import React from 'react';
import {makeStyles} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import ReactEcharts from 'echarts-for-react';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        left: `calc(20vw + ${theme.spacing(1)}px)`,
        width: `calc(40vw - ${theme.spacing(1.5)}px)`,
        bottom: theme.spacing(1),
        height: `calc(50vh - ${theme.spacing(1.5)}px)`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1)
    },
}));

function Stream({d}) {
    const classes = useStyles();
    const {min, max, categories, stream} = d.stream;

    const getOption = () => {
        return {
            animationDuration: 100,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        color: 'rgba(0,0,0,0.2)',
                        width: 1,
                        type: 'solid'
                    }
                }
            },
            legend: {
                data: categories,
            },
            singleAxis: {
                top: 50,
                bottom: 50,
                type: 'value',
                min,
                max,
                axisPointer: {
                    label: {
                        show: true
                    }
                },
            },
            series: [
                {
                    type: 'themeRiver',
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 20,
                            shadowColor: 'rgba(0, 0, 0, 0.2)'
                        }
                    },
                    data: stream,
                    label: {
                        show: false,
                    }
                }
            ]
        }
    }

    return <div className={classes.root}>
        <ReactEcharts style={{
            width: '100%',
            height: '100%',
        }} option={getOption()}/>
    </div>
}

export default inject('d')(observer(Stream));
