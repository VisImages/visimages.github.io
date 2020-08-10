import {action, computed, observable} from "mobx";
import captionStat from "./captionHandler";

class Data {
    constructor(root) {
        this.root = root;
    }

    init() {
        this.initPapers(() => {
            this.initImages();
        });
    }

    @observable.shallow papers = [];
    @action updatePapers = papers => {
        this.papers = papers;
    }
    initPapers = (cb = null) => {
        this.root.apiV1.getPapers({}, res => {
            this.updatePapers(res);
            this.extractFilters();
            if (cb instanceof Function) cb();
        });
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
    @observable.shallow yearCount = {};
    paperYear = {};
    extractFilters = (certainPapers = null) => {
        const papers = certainPapers || this.papers;

        const allConferences = new Set();
        const allAuthors = new Set();
        const allYears = new Set();
        const yearCount = {};
        papers.forEach(p => {
            allConferences.add(p.conference);
            for (const aut of p.authors) allAuthors.add(aut);
            allYears.add(p.year);
            if (!yearCount[p.year])
                yearCount[p.year] = {
                    papers: 0,
                    images: 0,
                }
            yearCount[p.year].papers += 1;
            this.paperYear[p.pid] = p.year;
        });
        this.allConferences = [...allConferences];
        this.allAuthors = [...allAuthors].sort();
        this.allYears = [...allYears].sort();
        this.yearCount = yearCount;
    }

    search = [];
    @observable.shallow filterConferences = [];
    @observable.shallow filterAuthors = [];
    @observable.shallow filterYears = [];
    @action updateFilter = (key, value) => {
        if (key === 'search')
            this.root.apiV1.getPapers({
                search: value.split(' '),
            }, res => {
                this.updatePapers(res);
                this.extractFilters();
            })
        else {
            this[`filter${key}`] = value;
        }
    }

    @observable.shallow images = [];
    initImages = () => {
        const papers = this.papers;
        const pids = papers.map(p => p.pid);
        this.root.apiV1.getImages(pids, res => {
            this.images = res.map(img => ({captionStat: {}, ...img}));
            this.updateImageCounts();
            this.updateImageCaptionStat();
        });
    }
    @action updateImageCounts = () => {
        const yearCount = this.yearCount;
        this.images.forEach(img => {
            const year = this.paperYear[img.pid];
            yearCount[year].images += 1;
        })
        this.yearCount = JSON.parse(JSON.stringify(yearCount));
    };

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
    @observable.shallow filterCategories = [
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
    @action updateFilterCategories = filters => {
        this.filterCategories = filters;
        this.updateWords();
    }

    @computed get bars() {
        if (this.allYears.length === 0) return [];
        const minYear = this.allYears[0];
        const maxYear = this.allYears[this.allYears.length - 1];
        return [...new Array(maxYear - minYear + 1)].map((_, i) => {
            const year = minYear + i;
            if (!this.yearCount[year]) return {
                year,
                papers: 0,
                images: 0,
            }
            return {
                year,
                papers: this.yearCount[year].papers,
                images: this.yearCount[year].images,
            }
        })
    }

    @computed get showedImages() {
        const pids = this.filteredPapers.map(p => p.pid);
        return this.images
          .filter(img => {
              if (!pids.includes(img.pid)) return false;
              let isFiltered = false;
              for (const cat of img.categories)
                  if (this.filterCategories.includes(cat)) {
                      isFiltered = true;
                      break;
                  }
              if (!isFiltered) return false;
              return true;
          });
    }

    @computed get stream() {
        let min = 9999, max = 0;
        const categories = new Set();
        const stream = {};

        this.showedImages.forEach(img => {
            const year = this.paperYear[img.pid];
            min = Math.min(min, year);
            max = Math.max(max, year);

            img.categories.forEach(cat => {
                categories.add(cat);
                const key = `${year},${cat}`;
                if (!stream.hasOwnProperty(key)) stream[key] = 1;
                else stream[key] += 1;
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

    updateImageCaptionStat = () => {
        this.images.forEach(img => {
            img.captionStat = captionStat(img.caption);
        });
        this.updateWords();
    }
}

export default Data;
