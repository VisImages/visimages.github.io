import { observable, action, computed } from "mobx";

class VisImages {
  @observable filterConditions = {
    year: [],
    paperName: null,
    authorName: [],
    authorNameLogic: "or",
    vizType: [],
  };
  @observable imgList = [];
  @observable paperList = [];
  @observable authorList = [];

  @observable paperInfo = {};
  @observable fullAuthorList = [];
  @observable yearIdx = {};
  @observable paper2Idx = {};
  @observable visImgData = {};
  // @observable a ={};
  // @observable yearInt = [0, 1999];
  // visImgData.init();


  constructor() {
    this.fetchJson('./data/visimage_paper_info.json', action(data => this.paperInfo = data));
    this.fetchJson('./data/authors.json', action(data => this.fullAuthorList = data));
    this.fetchJson('./data/yearIdx.json', action(data => this.yearIdx = data));
    this.fetchJson('./data/paper2Idx.json', action(data => this.paper2Idx = data));
    this.fetchJson('./data/visimages_data_with_captions.json', action(data => this.visImgData = data));
    this.init();
  }

  fetchJson = (url, cb) => {
    return fetch(url)
    .then(response => response.json())
    .then(data => {
      return cb(data);
      console.log(cb(data));
    });
  };

  init() {
    // console.log("yearIdx",this.yearIdx)
    // filterConditions.year = this.yearIdx.yearInt;
    this.authorList = this.fullAuthorList;
    this.paperList = Object.keys(this.paper2Idx);
    console.log(this.yearIdx)
  };

  @computed get yearInt(){
    console.log(this.yearIdx)
    return [
      Math.min(...Object.keys(this.yearIdx).map((value)=>{
        console.log("check",value)
        return parseInt(value)})),
      Math.max(...Object.keys(this.yearIdx).map((value)=>{return parseInt(value)}))];
  };

  @computed get filteredImgList() {
    this.imgList = []
    this.paperList = []
    // without paper specification
    if (this.filterConditions.paperName == null) {
      for (const paper in this.visImgData) {
        // year condition
        if (this.filterConditions.year.length == 0 ||
          this.yearIdx.index[this.filterConditions.year[0]] <= paper &&
          this.yearIdx.index[this.filterConditions.year[1]] > paper) {
          {
            for (let authorIdx = 0;
              authorIdx < this.paperInfo.info[paper]["authors"].length;
              authorIdx++) {
              if (this.authorList.indexOf(this.paperInfo.info[paper]["authors"][authorIdx]) !== -1) {
                this.authorList.push(this.paperInfo.info[paper]["authors"][authorIdx])
              }
            }
            let authorValid = false;
            if (this.filterConditions.authorName.length == 0) {
              authorValid = true;
            }
            else if (this.filterConditions.authorNameLogic == "or") {
              for (let authorIdx = 0;
                authorIdx < this.filterConditions.authorName.length;
                authorIdx++) {
                if (this.paperInfo.info[paper]["authors"].indexOf(this.filterConditions.authorName[authorIdx]) !== -1) {
                  authorValid = true;
                  break
                }
              }
            }
            else if (this.filterConditions.authorNameLogic == "and") {
              for (let authorIdx = 0;
                authorIdx < this.filterConditions.authorName.length;
                authorIdx++) {
                if (this.paperInfo.info[paper]["authors"].indexOf(this.filterConditions.authorName[authorIdx]) === -1) {
                  break
                }
              }
            }
            if (authorValid == false) {
              continue;
            }
            this.paperList.push(this.paperInfo.info[paper]['title'])
            for (const img in this.visImgData[paper]) {
              this.imgList.push(this.visImgData[paper][img]['file_name'])
            }
          }
        }
      }
    }
    else if (this.paper2Idx.indexOf[this.filterConditions.paperName] !== undefined) {
      let paper = this.paper2Idx.index[this.filterConditions.paperName]
      for (const img in this.visImgData[paper]) {
        this.imgList.push(this.visImgData[paper][img]['file_name'])
      }
    }
  };
};

var visImages = new VisImages();

// visImages.init()

export default visImages;
