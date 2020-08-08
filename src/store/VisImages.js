import { observable, action} from "mobx";

class VisImages {
    @observable filterConditions = {
        year: [],
        paperName: null,
        authorName: [],
        authorLogic: "or",
        visType: [],
        allTypes: false,
        allAnnotated: true
    };

    @observable fetchedData = {
        imgList: [],
        paperList: [],
        authorList: [],
        year: [1995, 2020],
        minYear: 1995,
        maxYear: 2020,
    }

    @observable detailOn = false;
    @observable detailurl = "";
    @observable detailInfo = [];

    @observable yearInt = []
    @observable showNum = 40;
    @observable showList = [];
    @observable pageNum = 1;

    @observable fetchUrls = []

    constructor() {
        this.fetchFilteredData();
    }

    getBoundingBoxes(pid, iid) {
        fetch(`http://127.0.0.1:5000/bbox/${pid}/${iid}`)
          .then(response => response.json())
          .then(data => {
              console.log(data);
              this.detailInfo = data.bboxes;
          })
    }

    @action setUrls = (urls) => this.fetchUrls = urls;

    @action
    updateFetchUrls() {
        let urls = [];
        const showList = this.showList;
        for (let i = 0; i < showList.length; i++) {
            fetch(`http://127.0.0.1:5000/img_src/${showList[i].pid}/${showList[i].iid}`)
              .then(response => response.json())
              .then(data => {
                  // console.log(data);
                  urls.push({
                      pid: showList[i].pid,
                      iid: showList[i].iid,
                      url: data.url
                  })
                  if (urls.length === showList.length) this.setUrls(urls);
              })
        }
    }

    @action
    fetchFilteredData(yearControl = false) {
        fetch('http://127.0.0.1:5000/filtering', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.filterConditions),
        }).then(response => response.json())
          .then(data => {
                console.log(data);
                this.fetchedData = data;
                if (!yearControl) {
                    this.yearInt = data.year;
                }
                this.pageNum = 1;
                this.showList = this.fetchedData.imgList.slice(
                  0, Math.min(this.fetchedData.imgList.length,
                    this.showNum));
                this.updateFetchUrls();
            }
          );
    }
}

export default VisImages;
