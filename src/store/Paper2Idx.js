import {observable, action} from "mobx"


class Paper2Index {
    @observable.shallow index = [];
    constructor(root){
        this.root=root;
        fetch('./data/paper2Idx.json')
        .then(response => {
            // console.log(response);
            return response.json();
        }).then(action(data => {
            this.index = data;
        }));
    }
}

export default Paper2Index;