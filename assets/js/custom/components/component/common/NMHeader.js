/* inherit */
import { NMComponent, define } from "/assets/js/core/components/NMComponent.js";
/* common */
import * as util from "/assets/js/core/util/utils.js";
/* component */
/* constant */
import NMConst from "/assets/js/core/constant/NMConstant.js";

export default class NMHeader extends NMComponent {
    static get observedAttributes() {
        return [];
    }

    static get name() {
        return "nm-header";
    }

    get clsName() {
        return NMHeader.name;
    }

    get styles() {
        return `
            .${this.clsName} {
                border: 1px solid black;
            }
        `;
    }

    get template() {
        return `<div class="${this.clsName}" part="${this.clsName}">
                    별 내용 없으며 배경 이미지
                </div>`;
    }
}

define(NMHeader);