import { observable, action, computed } from "mobx";

class VisImages {
  @observable filterConditions = {
    year: [],
    paperName: null,
    authorName: [],
    authorNameLogic: "or",
    vizType: [],
  };

  @observable paperInfo = {};
  @observable fullAuthorList = [];
  @observable yearIdx = {};
  @observable paper2Idx = {};
  @observable visImgData = {};


  constructor() {
    this.fetchJson('./data/visimage_paper_info.json', action(data => this.paperInfo = data));
    this.fetchJson('./data/authors.json', action(data => this.fullAuthorList = data));
    this.fetchJson('./data/yearIdx.json', action(data => { this.yearIdx = data; this.init() }));
    this.fetchJson('./data/paper2Idx.json', action(data => this.paper2Idx = data));
    this.fetchJson('./data/visimages_data_with_captions.json', action(data => this.visImgData = data));
  }

  fetchJson = (url, cb) => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        cb(data);
      });
  };

  @action
  init() {
    this.filterConditions.year =
      [Math.min(...Object.keys(this.yearIdx).map((value) => parseInt(value))),
      Math.max(...Object.keys(this.yearIdx).map((value) => parseInt(value))) - 1];
  }

  @computed get yearInt() {
    console.log(this.yearIdx)
    return [
      Math.min(...Object.keys(this.yearIdx).map((value) => parseInt(value))),
      Math.max(...Object.keys(this.yearIdx).map((value) => parseInt(value))) - 1];
  };

  @computed get filteredList() {
    let imgList = []
    let paperList = []
    let authorList = []
    // without paper specification.
    console.log(this.filterConditions.paperName === null)
    if (this.filterConditions.paperName === null) {
      for (let paper in this.visImgData) {
        if (this.paperInfo[paper]["paperType"] !== "VAST" && 
          this.paperInfo[paper]["paperType"] !== "InfoVis"){
            continue
          }
        if (this.filterConditions.year.length === 0 ||
          (this.yearIdx[this.filterConditions.year[0]] <= paper &&
            this.yearIdx[this.filterConditions.year[1] + 1] > paper)) {
          {
            for (let authorIdx = 0;
              authorIdx < this.paperInfo[paper]["authors"].length;
              authorIdx++) {
              if (authorList.indexOf(
                this.paperInfo[paper]["authors"][authorIdx]) === -1) {
                authorList.push(this.paperInfo[paper]["authors"][authorIdx])
              }
            }
            let authorValid = false;
            if (this.filterConditions.authorName.length === 0) {
              authorValid = true;
            }
            else if (this.filterConditions.authorNameLogic === "or") {
              for (let authorIdx = 0;
                authorIdx < this.filterConditions.authorName.length;
                authorIdx++) {
                if (this.paperInfo[paper]["authors"].indexOf(
                  this.filterConditions.authorName[authorIdx]) !== -1) {
                  authorValid = true;
                  break
                }
              }
            }
            else if (this.filterConditions.authorNameLogic === "and") {
              for (let authorIdx = 0;
                authorIdx < this.filterConditions.authorName.length;
                authorIdx++) {
                if (this.paperInfo[paper]["authors"].indexOf(
                  this.filterConditions.authorName[authorIdx]) === -1) {
                  break
                }
              }
            }
            if (authorValid === false) {
              continue;
            }
            paperList.push(this.paperInfo[paper]['title'])
            for (let img in this.visImgData[paper]) {
              imgList.push(this.visImgData[paper][img]['file_name'].split(".")[0])
            }
          }
        }
      }
    }
    else if (this.paper2Idx[this.filterConditions.paperName] !== undefined) {
      let paper = this.paper2Idx[this.filterConditions.paperName]
      authorList = this.paperInfo[paper]["authors"];
      for (let img in this.visImgData[paper]) {
        imgList.push(this.visImgData[paper][img]['file_name'].split(".")[0])
      }
    }
    return {
      "imgList": imgList,
      "paperList": paperList,
      "authorList": authorList,
    }
  };
};

var visImages = new VisImages();

// visImages.init()

export default visImages;
