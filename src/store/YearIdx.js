import {observable, action} from "mobx"


class YearIndex {
    @observable index = [];
    @observable yearInt = [0,10000];
    constructor(root){
        this.root=root;
        console.log(this.yearInt)
        fetch('./data/yearIdx.json')
        .then(response => {
            // console.log(response);
            return response.json();
        }).then(action(data => {
            this.index = data;
            this.yearInt = [1995,2010];
            console.log(data)
            console.log(this.yearInt)
            console.log(this.index)
        }));
    }
}

export default YearIndex;