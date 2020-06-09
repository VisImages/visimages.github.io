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

};

export default VisImgData;