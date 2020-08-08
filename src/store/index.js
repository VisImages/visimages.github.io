import SystemStatus from "./SystemStatus";
import Data from "./Data";
import APIv1 from './APIv1';

class Store {
    // visImages = new VisImages(this);
    sys = new SystemStatus(this);
    d = new Data(this);
    apiV1 = new APIv1();

    constructor() {
        this.sys.init();
        this.d.init();
    }
}

const store = new Store();

export default store;
