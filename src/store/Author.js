import {observable, action} from "mobx"


class AuthorList {
    @observable list = [];
    constructor(root){
        this.root=root;
        this.list = [];
        fetch('./data/authors.json')
        .then(response => {
            console.log(response);
            return response.json();
        }).then(action(data => {
            this.list = data;
            console.log(data);
        }));
    }

    @observable filteredAuthors = [];
    @action changeFilteredAuthor = authors => this.filteredAuthors = authors;
}

export default AuthorList;