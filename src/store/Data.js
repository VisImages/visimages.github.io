import { action, computed, observable } from "mobx";
import { GroupedCategories } from "./Categories";

class Data {
    constructor(root) {
        this.root = root;
    }

    init() {
        this.initPapers();
        this.initImages();
    }

    @observable.shallow papers = [];
    @action updatePapers = papers => {
        this.papers = papers;
    }
    initPapers = (cb = null) => {
        this.updatePapers(this.root.apiV1.filterPapersByCondition({}));
        this.extractFilters();
    }
    getPaperInfo = pid => {
        for (const paper of this.papers)
            if (paper.pid === pid) return paper;
        return {};
    }

    @computed get filteredPapers() {
        return this.papers.filter(p => {
            if (this.filterConferences.length > 0 && !this.filterConferences.includes(p.conference)) return false;
            if (this.filterYears.length > 0 && (p.year < this.filterYears[0] || p.year > this.filterYears[1])) return false;
            if (this.filterAuthors.length > 0) {
                let flag = false;
                for (let author of p.authors)
                    if (this.filterAuthors.includes(author)) {
                        flag = true;
                        break;
                    }
                if (!flag) return false;
            }
            return true;
        })
    }

    @observable.shallow allConferences = [];
    @observable.shallow allAuthors = [];
    @observable.shallow allYears = [];
    @observable.shallow paperConf = {};
    @observable.shallow yearCount = {};
    paperYear = {};
    extractFilters = (certainPapers = null) => {
        const papers = certainPapers || this.papers;

        const allConferences = new Set();
        const allAuthors = new Set();
        const allYears = new Set();
        papers.forEach(p => {
            allConferences.add(p.conference);
            this.paperConf[p.pid] = p.conference;
            for (const aut of p.authors) allAuthors.add(aut);
            allYears.add(p.year);
            this.paperYear[p.pid] = p.year;
        });
        this.allConferences = [...allConferences];
        this.allAuthors = [...allAuthors].sort();
        this.allYears = [...allYears].sort();
    }

    @observable.shallow filterConferences = [];
    @observable.shallow filterAuthors = [];
    @observable.shallow filterYears = [];
    @observable.shallow filterCaption = [];
    @action updateFilter = (key, value) => {
        this.initClickWord();
        // console.log(key, value, this.filterAuthors, this.filterConferences, this.filteredPapers);
        if (key === 'search') {
            const res = this.root.apiV1.filterPapersByCondition({
                search: value,
            })
            this.updatePapers(res);
            this.initImages();
            // this.extractFilters();
        }

        // this.root.apiV1.getPapers({
        //     search: value.split(' '),
        // }, res => {
        // })
        else if (key == 'Years') {
            this[`filter${key}`] = value;
            this.updateWords();
        }
        else {
            if (key == "Caption")
                this[`filter${key}`] = this.root.apiV1.tokenizeAndStem(value);
            else
                this[`filter${key}`] = value;
            this.updateImageCounts();
            if (!this.clickOnWord)
                this.updateWords();
        }
    }

    @observable.shallow images = [];
    initImages = () => {
        const papers = this.papers;
        const pids = papers.map(p => p.pid);
        this.images = this.root.apiV1.getImages(pids);
        this.updateImageCounts();
        this.updateWords();
    }

    @action updateImageCounts = () => {
        const yearCount = {};
        this.filteredPapers.forEach(p => {
            if (!yearCount[p.year])
                yearCount[p.year] = {
                    InfoVis: 0,
                    VAST: 0,
                }
            yearCount[p.year][this.paperConf[p.pid]] += 1;
        });

        // this.showedImages.forEach(img => {
        //     const year = this.paperYear[img.pid];
        //     yearCount[year][img.conference] += 1;
        // })
        this.yearCount = JSON.parse(JSON.stringify(yearCount));
    };
    getImageInfo = (pid, iid) => {
        for (const image of this.images)
            if (image.pid === pid && image.iid === iid) return image;
        return {};
    }

    @observable.shallow allCategories = [
        'line_chart',
        'scatterplot',
        'tree',
        'heatmap',
        'treemap',
        'graph',
        'map',
        'bar_chart',
        'small_multiple',
        'matrix',
        'flow_diagram',
        'table',
        'sunburst_icicle',
        'parallel_coordinate',
        'box_plot',
        'error_bar',
        'glyph_based',
        'area_chart',
        'pie_chart',
        'sector_chart',
        'word_cloud',
        'proportional_area_chart',
        'unit_visualization',
        'donut_chart',
        'sankey_diagram',
        'hierarchical_edge_bundling',
        'chord_diagram',
        'stripe_graph',
        'polar_plot',
        'storyline',
        'NoVis'
    ];
    @observable.shallow filterCategories = [];
    // [
    //     'line_chart',
    //     'scatterplot',
    //     'tree',
    //     'heatmap',
    //     'treemap',
    //     'graph',
    //     'map',
    //     'bar_chart',
    //     'small_multiple',
    //     'matrix',
    //     'flow_diagram',
    //     'table',
    //     'sunburst_icicle',
    //     'parallel_coordinate',
    //     'box_plot',
    //     'error_bar',
    //     'glyph_based',
    //     'area_chart',
    //     'pie_chart',
    //     'sector_chart',
    //     'word_cloud',
    //     'proportional_area_chart',
    //     'unit_visualization',
    //     'donut_chart',
    //     'sankey_diagram',
    //     'hierarchical_edge_bundling',
    //     'chord_diagram',
    //     'stripe_graph',
    //     'polar_plot',
    //     'storyline',
    //     'NoVis'
    // ];
    @action updateFilterCategories = filters => {
        this.filterCategories = filters;
        this.updateWords();
    }


    @observable barSelected = false;
    @computed get bars() {
        if (this.allYears.length === 0) return [];
        const minYear = this.allYears[0];
        const maxYear = this.allYears[this.allYears.length - 1];
        return [...new Array(maxYear - minYear + 1)].map((_, i) => {
            const year = minYear + i;
            if (!this.yearCount[year]) return {
                year,
                VAST: 0,
                InfoVis: 0,
            }
            return {
                year,
                InfoVis: this.yearCount[year].InfoVis,
                VAST: this.yearCount[year].VAST,
            }
        })
    }

    // updateBars = () => {
    //     if (this.allYears.length === 0) return [];
    //     const minYear = this.allYears[0];
    //     const maxYear = this.allYears[this.allYears.length - 1];
    //     return [...new Array(maxYear - minYear + 1)].map((_, i) => {
    //         const year = minYear + i;
    //         if (!this.yearCount[year]) return {
    //             year,
    //             papers: 0,
    //             images: 0,
    //         }
    //         return {
    //             year,
    //             papers: this.yearCount[year].papers,
    //             images: this.yearCount[year].images,
    //         }
    //     })
    // }

    @computed get showedImages() {
        const pids = this.filteredPapers.map(p => p.pid);
        // console.log(this.filterCaption, this.filterCaption.length);
        return this.images
            .filter(img => {
                if (!pids.includes(img.pid)) return false;
                if (this.clickOnWord)
                    if (img.captionStat[this.clickedWord] == undefined)
                        return false
                if (this.filterCaption.length > 0) {
                    let isFiltered = false;
                    for (const keyword of this.filterCaption) {
                        // console.log(keyword, img.captionStat[keyword])
                        if (img.captionStat[keyword] != undefined) {
                            isFiltered = true;
                            break;
                        }
                    }
                    if (!isFiltered) return false
                }
                let isFiltered = true;
                for (const cat of this.filterCategories)
                    if (!img.categories.includes(cat)) {
                        return false;
                    }
                return isFiltered
            });
    }

    @observable groupedCat = true;
    @observable showOnlySelected = false;
    @observable clickOnWord = false;
    @observable clickedWord = "";

    initClickWord = () => {
        this.clickOnWord = false;
        this.clickedWord = "";
    }

    @computed get stream() {
        let min = 9999, max = 0;
        const categories = new Set();
        const stream = {};

        this.showedImages.forEach(img => {
            const year = this.paperYear[img.pid];
            min = Math.min(min, year);
            max = Math.max(max, year);

            // console.log(img);

            img.categories.forEach(cat => {
                let key = null;
                if (this.groupedCat){
                    categories.add(GroupedCategories[cat]);
                    key = `${year},${GroupedCategories[cat]}`;
                }
                else{
                    categories.add(cat);
                    key = `${year},${cat}`;
                }
                if (!stream.hasOwnProperty(key)) stream[key] = img.nums_of_visualizations[cat]===undefined?1:img.nums_of_visualizations[cat];
                else {stream[key] += img.nums_of_visualizations[cat]===undefined?1:img.nums_of_visualizations[cat];}
            });
        });

        for (let i = min; i <= max; i++)
            for (const cat of [...categories])
                if (!Object.keys(stream).includes(`${i},${cat}`))
                    stream[`${i},${cat}`] = 0;

        return {
            min,
            max,
            categories: [...categories],
            stream: Object.keys(stream).map(key => {
                const [year, type] = key.split(',');
                const count = stream[key];
                return [year, count, type];
            })
        };
    }

    @computed get barSeries() {
        let min = 9999, max = 0;
        const categories = new Set();
        const bars = {};
        const barSeries = [];

        this.showedImages.forEach(img => {
            const year = this.paperYear[img.pid];
            min = Math.min(min, year);
            max = Math.max(max, year);

            img.categories.forEach(cat => {
                let key = null;
                if (this.groupedCat){
                    categories.add(GroupedCategories[cat]);
                    key = `${year},${GroupedCategories[cat]}`;
                }
                else{
                    categories.add(cat);
                    key = `${year},${cat}`;
                }
                if (!bars.hasOwnProperty(key)) bars[key] = img.nums_of_visualizations[cat]===undefined?1:img.nums_of_visualizations[cat];
                else bars[key] += img.nums_of_visualizations[cat]===undefined?1:img.nums_of_visualizations[cat];
            });
        });

        for (const cat of [...categories]) {
            // console.log(this.groupedCat, cat);
            const yearSeries = []
            for (let i = min; i <= max; i++) {
                if (!Object.keys(bars).includes(`${i},${cat}`))
                    yearSeries.push(0);
                else yearSeries.push(bars[`${i},${cat}`]);
            }
            barSeries.push({
                name: cat,
                type: 'bar',
                stack: 'total',
                emphasis: {
                    focus: 'series'
                },
                data: yearSeries,
            })
        }

        return {
            min,
            max,
            categories: [...categories],
            bars: barSeries
        };
    }

    @observable.shallow showedWords = [];

    @action updateWords() {
        const wordFrequencies = {};
        this.showedImages.forEach(img => {
            Object.keys(img.captionStat).forEach(word => {
                if (wordFrequencies.hasOwnProperty(word)) wordFrequencies[word] += img.captionStat[word];
                else wordFrequencies[word] = img.captionStat[word];
            });
        });
        this.showedWords = Object.keys(wordFrequencies).map(word => ({
            text: word,
            value: wordFrequencies[word],
        }));
    }

    @observable boxes = null;
    @action updateBBoxes = boxes => this.boxes = boxes;
}

export default Data;
