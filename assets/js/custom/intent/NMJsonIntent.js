/* inherit */
import NMIntent from "/assets/js/core/intent/NMIntent.js";
/* common */
import * as util from "/assets/js/core/util/utils.js";
/* component */
/* side effect */
import jsonEffect from "/assets/js/custom/sideEffect/NMJsonSideEffect.js";
/* constant */
import NMConst from "/assets/js/core/constant/NMConstant.js";

class NMJsonIntent extends NMIntent {
    getRecentBoardList(p = {}) {
        jsonEffect.getRecentBoardList(p);
    }

    getBoareList(p) {
        jsonEffect.getBoareList(p);
    }

    getBoard(p) {
        jsonEffect.getBoard(p);
    }

    getBoardWithContent(p) {
        jsonEffect.getBoardWithContent(p);
    }

    getCategoryList(p) {
        jsonEffect.getCategoryList(p);
    }
}

const jsonItent = new NMJsonIntent();

export default jsonItent;
