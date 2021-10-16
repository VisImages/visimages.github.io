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
    let {min, max, categories, bars} = d.barSeries;
    categories = categories.sort((a, b) => allCategories.indexOf(a) - allCategories.indexOf(b));
    bars = bars.sort((a, b) => {
        const ai = categories.indexOf(a.name), bi = categories.indexOf(b.name);
        if (ai !== bi) return ai - bi;
        return 0;
    })
    // stream = stream.sort((a, b) => {
    //     const ai = categories.indexOf(a[2]), bi = categories.indexOf(b[2]);
    //     if (ai !== bi) return ai - bi;
    //     return a[0] - b[0];
    // })

    // const calCat = new Set();
    // stream.forEach(d => calCat.add(d[2]));
    // console.log(stream);
    console.log(bars);
    let years = Array.from({length: max-min+1}, (_, i) => i + min);

    const getOption = () => {
        return {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
                formatter: name => TextTranslate[name],
                data: categories,
                x: 'center',
                y: 'bottom'
            },
            color: categories.map(cat => ColorStyles[cat]),
            grid: {
              top: '3%',
              left: '3%',
              right: '4%',
              bottom: '25%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data: years,
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: bars
          };
    }

    return <div className={classes.root}>
        <ReactEcharts style={{
            width: '100%',
            height: '100%',
        }} option={getOption()}/>
    </div>
}

export default inject('d')(observer(Stream));
