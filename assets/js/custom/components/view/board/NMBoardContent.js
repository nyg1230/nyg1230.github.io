/* inherit */
import { NMView, define } from "/assets/js/core/components/view/NMView.js";
/* common */
import * as util from "/assets/js/core/util/utils.js";
import router from "/assets/js/core/router/NMRouter.js";
/* component */
/* model */
import NMJsonModel from "/assets/js/custom/model/NMJsonModel.js";
/* intent */
import jsonItent from "/assets/js/custom/intent/NMJsonIntent.js";
/* constant */
import NMConst from "/assets/js/core/constant/NMConstant.js";

export default class NMBoardContent extends NMView {
    modelList = [NMJsonModel];

    static get name() {
        return "nm-board";
    }

    get clsName() {
        return NMBoardContent.name;
    }

    get styles() {
        return ``;
    }

    get template() {
        return `
        <div class="${this.clsName}" part="${this.clsName}">
            <slot></slot>
        </div>`;
    }

    afterRender() {
        super.afterRender();
        this.getBoard();
    }

    getBoard() {
        const qs = router.getPathParam();
        jsonItent.getBoardWithContent(qs);
    }

    setBoardContent(data) {
        console.log(data);
    }

    onModelChange(e) {
        const { detail } = e;
        const { data, name, property } = { ...detail };

        if (name === NMJsonModel.name) {
            if (property === "board") {
                this.setBoardContent(data);
            }
        }
    }
}

define(NMBoardContent);
