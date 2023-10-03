/* inherit */
import NMModel from "/assets/js/core/model/NMModel.js";
/* common */
import * as util from "/assets/js/core/util/utils.js";
/* component */
/* model */
/* constant */
import NMConst from "/assets/js/core/constant/NMConstant.js";

class NMGithubModel extends NMModel {
    static get name() {
        return "github";
    }

    get clsName() {
        return NMGithubModel.name;
    }

}

export default NMGithubModel;
