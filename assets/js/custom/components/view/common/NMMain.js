/* inherit */
import { NMView, define } from "/assets/js/core/components/view/NMView.js";
/* common */
import * as util from "/assets/js/core/util/utils.js";
/* component */
/* model */
/* intent */
import githubIntent from "/assets/js/custom/intent/NMGithubIntent.js";
/* constant */
import NMConst from "/assets/js/core/constant/NMConstant.js";

export default class NMMain extends NMView {
    modelList = [];

    static get name() {
        return "nm-main";
    }

    get clsName() {
        return NMMain.name;
    }

    get styles() {
        return `
            .${this.clsName} {
                width: 100%;
                height: 100%;
                overflow-y: scroll;
            }
        `;
    }

    get template() {
        return `<div class="${this.clsName}" part="${this.clsName}">
                    <slot></slot>
                </div>`;
    }

    afterRender() {}
}

define(NMMain);