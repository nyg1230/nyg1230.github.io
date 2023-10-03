/* inherit */
/* common */
import * as util from "/assets/js/core/util/utils.js";
import router from "/assets/js/core/router/NMRouter.js";
/* component */
import "/assets/js/core/components/element/elements.js";
/* constant */
import NMConst from "/assets/js/core/constant/NMConstant.js";

window.onload = (e) => {
    const body = util.DomUtil.querySelector(document, "body");
    const option = {
        mode: "hash"
    };
    router.setOption(option);
    router.setContainer(body);
    router.init();
}
