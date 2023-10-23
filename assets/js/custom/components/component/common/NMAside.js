/* inherit */
import { NMComponent, define } from "/assets/js/core/components/NMComponent.js";
/* common */
import * as util from "/assets/js/core/util/utils.js";
/* component */
/* constant */
import NMConst from "/assets/js/core/constant/NMConstant.js";

export default class NMAside extends NMComponent {
    static get observedAttributes() {
        return [];
    }

    static get name() {
        return "nm-aside";
    }

    get clsName() {
        return NMAside.name;
    }

    get styles() {
        return `
            .${this.clsName} {
                height: 100%;
            }

            .banner {
                border: 1px solid var(--plein-air);
                height: 600px;
                background-size: contain;
                background-repeat: no-repeat;
                background-image: url(/assets/image/side/banner_v.png);
            }
            `;
    }

    get template() {
        return `<div class="${this.clsName}" part="${this.clsName}">
                    <div class="banner"></div>
                </div>`;
    }
}

define(NMAside);
