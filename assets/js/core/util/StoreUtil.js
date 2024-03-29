/* inherit */
/* common */
import * as util from "/assets/js/core/util/utils.js";
/* component */
/* model */
/* constant */
import NMConst from "/assets/js/core/constant/NMConstant.js";

class StoreUtil {
    #store;

    constructor() {
        this.#store = {};
        this.init();
    }

    init() {}

    get(target = "", key = "") {
        return util.CommonUtil.find(this.#store, `${target}.${key}`);
    }

    set(target, key, value) {
        key = !util.CommonUtil.isArray(key) ? key.split(".") : key;
        const last = key.pop();

        util.CommonUtil.isNull(this.#store[target]) && (this.#store[target] = {});

        let p = this.#store[target];

        key.forEach((k) => {
            util.CommonUtil.isNull(p[k]) && (p[k] = {});
            p = p[k];
        });

        p[last] = value;
    }

    getLocalStorage(key, defaultValue = null) {
        let result = localStorage.getItem(key);

        if (util.CommonUtil.isNull(result)) {
            this.setLocalStorage(key, defaultValue);
            result = defaultValue;
        }

        return result;
    }

    setLocalStorage(key, value) {
        localStorage.setItem(key, value);
    }

    getSessionStorage(key, defaultValue = null) {
        const result = sessionStorage.getItem(key);

        if (util.CommonUtil.isNotNull(result)) {
            this.setSessrionStorage(key, defaultValue);
        }

        return result;
    }

    setSessrionStorage(key, value) {
        return sessionStorage.setItem(key, value);
    }
}

const store = new StoreUtil();

export default store;