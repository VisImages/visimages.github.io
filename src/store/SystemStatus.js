import {action, computed, observable} from "mobx";
import {createMuiTheme, darken, fade, lighten} from "@material-ui/core";

class SystemStatus {
    constructor(root) {
        this.root = root;
    }

    init() {
    }

    scrollbar = '#888b8b';
    @observable.shallow themeOption = {
        spacing: 10,
        palette: {
            primary: {main: '#dadbdc'},
            secondary: {main: '#1f5886'}
        },
        overrides: {
            MuiCssBaseline: {
                '@global': {
                    '*::-webkit-scrollbar': {
                        width: 10,
                    },
                    '*::-webkit-scrollbar-track': {
                        display: 'none',
                    },
                    '*::-webkit-scrollbar-corner': {
                        display: 'none',
                    },
                    '*::-webkit-scrollbar-thumb': {
                        backgroundColor: fade(this.scrollbar, 0.1),
                        borderRadius: 10,
                    },
                    '*:hover::-webkit-scrollbar-thumb': {
                        backgroundColor: lighten(this.scrollbar, 0.2),
                    },
                    '*::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: this.scrollbar,
                    },
                    '*::-webkit-scrollbar-thumb:active': {
                        backgroundColor: darken(this.scrollbar, 0.2),
                    }
                }
            }
        }
    }

    @computed get theme() {
        return createMuiTheme(this.themeOption);
    }

    @observable detailView = false;
    detailedImg = [-1, -1, ''];
    @action showDetail = (pid, iid, url) => {
        this.detailView = true;
        if (this.detailedImg[0] !== pid || this.detailedImg[1] !== iid) {
            this.detailedImg = [pid, iid, url];
            this.root.d.updateBBoxes(null);
            this.root.d.updateBBoxes(this.root.apiV1.getBBox(pid, iid))
            // this.root.apiV1.getBBox(pid, iid, res => {
            //     this.root.d.updateBBoxes(res.bboxes);
            // })
        }
    }
    @action closeDetail = () => {
        this.detailView = false;
    }
}

export default SystemStatus;
