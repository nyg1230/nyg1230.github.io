import * as util from "/assets/js/util/utils.js";

const init = () => {
    util.CommonUtil.setBreadCrumb("Categories");
    window.removeEventListener("load", init);
}

window.addEventListener("load", init);