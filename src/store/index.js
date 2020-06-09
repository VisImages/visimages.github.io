import PaperInfo from "./PaperInfo"
import AuthorList from "./Author"
import YearIdx from "./YearIdx"
import Paper2Idx from "./Paper2Idx"
import VisImgData from "./VisImgData"
import {observable, action, computed} from "mobx";

class VisImages {
    @observable filterConditions = {
        year:[],
        paperName:null,
        authorName:[],
        authorNameLogic:"or",
        vizType:[],
    };
    @observable imgList = [];
    @observable paperList = [];
    @observable authorList = [];
    // paperInfo = new PaperInfo(this);
    // fullAuthorList = new AuthorList(this);
    // yearIdx = new YearIdx(this);
    // paper2Idx = new Paper2Idx(this);
    // visImgData = new VisImgData(this);

    
    @observable paperInfo;
    @observable fullAuthorList = [];
    @observable yearIdx;
    @observable paper2Idx = {};
    @observable visImgData;
    @observable yearInt = [];
    // visImgData.init();

    
    constructor(){
        this.fetchJson('./data/visimage_paper_info.json', this.paperInfo);
        this.fetchJson('./data/authors.json', this.fullAuthorList);
        this.fetchJson('./data/yearIdx.json', this.yearIdx);
        this.fetchJson('./data/paper2Idx.json', this.paper2Idx);
        this.fetchJson('./data/visimages_data_with_captions.json', this.visImgData);
        this.init();
    }

    fetchJson = (url, variable) => {
        fetch(url).then(response => {
            console.log(response);
            return response.json();
        }).then(action(data => {
            variable = data;
            // if(typeof)
            console.log(data);
        }));
    };

    init(){
        const filterConditions = this.filterConditions;
        // console.log("yearIdx",this.yearIdx)
        // filterConditions.year = this.yearIdx.yearInt;
        this.authorList = this.fullAuthorList;
        this.paperList = Object.keys(this.paper2Idx);
        console.log(this.yearIdx)
        this.yearInt = [1995, 2010];
      };
};

var visImages = new VisImages();
// visImages.init()

export default visImages;
