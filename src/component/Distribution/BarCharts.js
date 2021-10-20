import React from 'react';
import { makeStyles } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import { ColorStyles, TextTranslate, GroupedCategoriesColor, GroupedCategories } from "../../store/Categories";
import ReactEcharts from 'echarts-for-react';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    height: '100%'
  },
}));

function BarCharts({ d }) {
  const classes = useStyles();
  const allCategories = d.groupedCat ? Object.keys(GroupedCategoriesColor) : Object.keys(ColorStyles);
  let { min, max, categories, bars } = d.barSeries;
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
  let years = Array.from({ length: max - min + 1 }, (_, i) => i + min);
  let selected = {}
  const mappedGroupedCategories = d.filterCategories.map(cat => GroupedCategories[cat])
  for (const cat of categories) {
    if (d.showOnlySelected) {
      if (d.groupedCat) {
        if (mappedGroupedCategories.includes(cat))
          selected[cat] = true
        else selected[cat] = false
      }
      else {
        if (d.filterCategories.includes(cat))
          selected[cat] = true
        else selected[cat] = false
      }
    }
    else selected[cat] = true
  }


  const getOption = () => {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        formatter: name => d.groupedCat ? name : TextTranslate[name],
        data: categories,
        x: 'center',
        y: 'bottom',
        selected: selected,
      },
      color: categories.map(cat => d.groupedCat ? GroupedCategoriesColor[cat] : ColorStyles[cat]),

      grid: {
        top: '3%',
        left: '3%',
        right: '4%',
        bottom: d.groupedCat ? '14%' : '28%',
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
    }} notMerge option={getOption()} />
  </div>
}

export default inject('d')(observer(BarCharts));
