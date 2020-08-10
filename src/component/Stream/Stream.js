import React from 'react';
import {makeStyles} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import {ColorStyles, TextTranslate} from "../../store/Categories";
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
    const allCategories = Object.keys(ColorStyles);
    let {min, max, categories, stream} = d.stream;
    categories = categories.sort((a, b) => allCategories.indexOf(a) - allCategories.indexOf(b));
    stream = stream.sort((a, b) => {
        const ai = categories.indexOf(a[2]), bi = categories.indexOf(b[2]);
        if (ai !== bi) return ai - bi;
        return a[0] - b[0];
    })

    const calCat = new Set();
    stream.forEach(d => calCat.add(d[2]));

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
                formatter: name => TextTranslate[name],
                data: categories,
            },
            color: categories.map(cat => ColorStyles[cat]),
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
