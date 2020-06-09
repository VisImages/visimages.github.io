import { observable, computed } from 'mobx'


class VisImgData {
  @observable data;

  constructor(root){
    this.root=root;
    fetch('./data/visimages_data_with_captions.json')
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(data => {
        this.data = data
      })
  }

  @computed get init(){
    const filterConditions = this.filterConditions;
    // console.log("yearIdx",this.yearIdx)
    filterConditions.year = this.yearIdx.yearInt;
    this.authorList = this.fullAuthorList.list;
    this.paperList = Object.keys(this.paper2Idx.index);
  };

  @computed get filteredImgList(){
    console.log("this",this);
    const filterConditions = this.filterConditions;
    const paperInfo = this.paperInfo;
    const yearIdx = this.yearIdx;
    const visImgData = this.data;
    const paper2Idx = this.paper2Idx;
    this.imgList = []
    this.paperList = []
    // without paper specification
    if(filterConditions.paperName == null){
      for (const paper in visImgData){
        // year condition
        if (filterConditions.year.length == 0 || 
          yearIdx.index[filterConditions.year[0]] <= paper && 
          yearIdx.index[filterConditions.year[1]] > paper){
          {  
            for (let authorIdx = 0;
            authorIdx < paperInfo.info[paper]["authors"].length;
            authorIdx ++){
              if (this.authorList.indexOf(paperInfo.info[paper]["authors"][authorIdx]) !== -1 ){
                this.authorList.push(paperInfo.info[paper]["authors"][authorIdx])
              }
            }
            let authorValid = false;
            if (filterConditions.authorName.length == 0){
              authorValid = true;
            }
            else if (filterConditions.authorNameLogic == "or"){
              for (let authorIdx = 0; 
                authorIdx < filterConditions.authorName.length; 
                authorIdx ++){
                if (paperInfo.info[paper]["authors"].indexOf(filterConditions.authorName[authorIdx]) !== -1){
                  authorValid = true;
                  break
                }
              }
            }
            else if (filterConditions.authorNameLogic == "and"){
              for (let authorIdx = 0; 
                authorIdx < filterConditions.authorName.length; 
                authorIdx ++){
                if (paperInfo.info[paper]["authors"].indexOf(filterConditions.authorName[authorIdx]) === -1){
                  break
                }
              }
            }
            if (authorValid == false){
              continue;
            }
            this.paperList.push(paperInfo.info[paper]['title'])
            for (const img in visImgData[paper]){
              this.imgList.push(visImgData[paper][img]['file_name'])
            }
          }
      }
      }
    }
    else if (paper2Idx.index[filterConditions.paperName] !== undefined){
      let paper = paper2Idx.index[filterConditions.paperName]
      for (const img in visImgData[paper]){
        this.imgList.push(visImgData[paper][img]['file_name'])
      }
    }
  };
};

export default VisImgData;