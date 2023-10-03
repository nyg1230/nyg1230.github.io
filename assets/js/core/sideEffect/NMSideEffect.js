/* inherit */
/* common */
import * as util from "/assets/js/core/util/utils.js";
/* component */
/* model */
import NMModel from "/assets/js/core/model/NMModel.js";
/* constant */
import NMConst from "/assets/js/core/constant/NMConstant.js";

class NMSideEffect {
    get model() {
        return NMModel; 
    }
}

export default NMSideEffect;
