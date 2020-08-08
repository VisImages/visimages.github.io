import {computed, observable} from "mobx";
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
            secondary: {main: '#1d2088'}
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
}

export default SystemStatus;
