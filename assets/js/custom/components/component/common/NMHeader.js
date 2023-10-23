/* inherit */
import { NMComponent, define } from "/assets/js/core/components/NMComponent.js";
/* common */
import * as util from "/assets/js/core/util/utils.js";
/* component */
/* constant */
import NMConst from "/assets/js/core/constant/NMConstant.js";

const backgroundUrl = util.CommonUtil.find(NMConst, "env.profile.header.url");
console.log(backgroundUrl);

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
                height: 100%;

                & > div {
                    width: 100%;
                    height: 100%;
                }
            }

            .hBg {
                background-image: url("${backgroundUrl}");
                background-repeat: round;
            }
        `;
    }

    get template() {
        return `<div class="${this.clsName}" part="${this.clsName}">
                    <div class="hBg">
                    </div>
                </div>`;
    }

    afterRender() {
        
    }
}

define(NMHeader);
