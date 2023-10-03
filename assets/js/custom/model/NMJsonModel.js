/* inherit */
import NMModel from "/assets/js/core/model/NMModel.js";
/* common */
import * as util from "/assets/js/core/util/utils.js";
/* component */
/* model */
/* constant */
import NMConst from "/assets/js/core/constant/NMConstant.js";

class NMJsonModel extends NMModel {
    static get name() {
        return "localJson";
    }

    get clsName() {
        return NMJsonModel.name;
    }

}

export default NMJsonModel;
