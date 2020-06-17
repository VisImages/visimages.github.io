import { observable, action, computed } from "mobx";


let Minio = require('minio');

var minioClient = new Minio.Client({
  endPoint: 'minio.zjvis.org',
  accessKey: 'ZWUkouAYfWR5ycxc1LL8Mbp0d02yqDnrJHSKh0sN0javzWZ79KcIVY53ns78pCYW',
  secretKey: 'l5sKx2Bmuqv308ZtzkhaPSlgscUezpJrtBOH1mICnKCW6FfrCPZa6KDrV8zp5aAM#'
});

class VisImages {
  @observable filterConditions = {
    year: [],
    paperName: null,
    authorName: [],
    authorNameLogic: "or",
    vizType: [],
  };

  @observable detailOn = false;
  @observable detailurl = "";
  @observable detailInfo = [];

  @observable paperInfo = {};
  @observable fullAuthorList = [];
  @observable yearIdx = {};
  @observable paper2Idx = {};
  @observable visImgData = {};

  @observable showNum = 80;
  @observable showList = [];
  @observable pageNum = 1;

  constructor() {
    this.fetchJson('./data/visimage_paper_info.json', action(data => this.paperInfo = data));
    this.fetchJson('./data/authors.json', action(data => this.fullAuthorList = data));
    this.fetchJson('./data/yearIdx.json', action(data => { this.yearIdx = data; this.init_year() }));
    this.fetchJson('./data/paper2Idx.json', action(data => this.paper2Idx = data));
    this.fetchJson('./data/visimages_data_with_captions.json', action(
      data => {this.visImgData = data; this.init_showList()}));
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
  init_year() {
    this.filterConditions.year =
      [Math.min(...Object.keys(this.yearIdx).map((value) => parseInt(value))),
      Math.max(...Object.keys(this.yearIdx).map((value) => parseInt(value))) - 1];
  }

  @action
  init_showList() {
      let count = 0;
      console.log("init");
      for (let paper in this.visImgData) {
        for (let img in this.visImgData[paper]) {
          this.showList.push(this.visImgData[paper][img]['file_name'].split(".")[0])
          count += 1;
          console.log("add",this.showList);
          if( count >= this.showNum){
            break
          }
        }
        if( count >= this.showNum){
          break
        }
      }
    this.updateFetchUrls();
  }

  @computed get yearInt() {
    console.log(this.yearIdx)
    return [
      Math.min(...Object.keys(this.yearIdx).map(
        (value) => parseInt(value))),
      Math.max(...Object.keys(this.yearIdx).map(
        (value) => parseInt(value))) - 1];
  };

  @observable fetchUrls = [];
  @action changeFetchUrls = urls => this.fetchUrls = urls;
  updateFetchUrls(){
    let urls = [];
    for (let i = 0;
      i < this.showList.length;
      i++) {
      let [paperId, imgId] = this.showList[i].split('_')
      // console.log(paperId, imgId)
      paperId = parseInt(paperId)
      imgId = parseInt(imgId)
      minioClient.presignedUrl('GET', 'visdata', `images/${paperId}/${imgId}.png`, 24 * 60 * 60,
        (err, presignedUrl) => {
          urls.push({
            pid:paperId,
            iid:imgId,
            url:presignedUrl});
          if (urls.length === this.showList.length) this.changeFetchUrls(urls)
        })
    }
  }

  getBoundingBoxes(paperId, imgId){
    let bboxes = [];
    const imgdata = this.visImgData[paperId.toString()][imgId];
    console.log(imgdata);
    for(const visType in imgdata.visualization_bbox){
      for (let i = 0; 
        i < imgdata.visualization_bbox[visType].length;
        i++)
        {
          bboxes.push(
            {
              visType:visType,
              box:imgdata.visualization_bbox[visType][i],
              idx:i+1,
              visibility:"visible",
            }
          )
        }
    }
    return bboxes;
  }

  @computed get filteredList() {
    let imgList = [];
    let paperList = [];
    let authorList = [];
    // without paper specification.
    // console.log(this.filterConditions.paperName === null)
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
      "pageNum":0,
      "pageAmount":20
    }
  };
};

var visImages = new VisImages();

// visImages.init()

export default visImages;
