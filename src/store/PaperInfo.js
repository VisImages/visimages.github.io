import { action, observable, computed } from "mobx";

class PaperInfo {
    @observable info = [];

    constructor(root){
        this.root=root;
        this.info = [];
        fetch('./data/visimage_paper_info.json')
        .then(response => {
            console.log(response);
            return response.json();
        }).then(action(data => {
            this.info = data;
            console.log(data);
        }));
    }
}


export default PaperInfo;