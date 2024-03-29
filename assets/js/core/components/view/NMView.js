/* inherit */
import { NMComponent, define } from "/assets/js/core/components/NMComponent.js";
/* common */
import * as util from "/assets/js/core/util/utils.js";
/* component */
/* model */
/* constant */
import NMConst from "/assets/js/core/constant/NMConstant.js";

class NMView extends NMComponent {
    modelList = [];

    constructor() {
        super();
    }

    static get name() {
        return "nm-view";
    }

    get clsName() {
        return NMView.name;
    }

    #observeModel() {
        this.modelList.forEach((model) => {
            model.subscribe(this);
        });
    }

    #disconnectModel() {
        this.modelList.forEach((model) => {
            model.removeView(this);
        });
    }

    #disconnectAllModel() {

    }

    addEvent() {
        this.#addEvent();
    }

    #addEvent() {
        this.bindEvent(this, NMConst.eventName.MODEL_CHANGE, this.onModelChange);
        this.bindEvent(this, NMConst.eventName.VALUE_CHANGE, this.onValueChange);
    }

    afterRender() {
        this.#observeModel();
        super.afterRender();
    }

    onModelChange() {}

    destroy() {
        this.#disconnectModel();
        super.destroy();
    }
}

define(NMView);

export { NMView, define };
