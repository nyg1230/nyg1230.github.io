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
                display: block;
                border: 1px solid var(--plein-air);
                height: 600px;

                &.horizon {}
            }

            
            `;
    }

    get #banner() {
        return {
            horizon: "/assets/image/side/banner_h.png",
            vertical: "/assets/image/side/banner_v.png"
        }
    }

    get template() {
        return `<div class="${this.clsName}" part="${this.clsName}">
                    <nm-image class="banner" src="/assets/image/side/banner_v.png"></nm-image>
                </div>`;
    }

    afterRender() {
        this.resizeBanner()
    }
    
    resizeBanner() {
        const image = util.DomUtil.querySelector(this, `.banner`);

        const fn = (entry) => {
            const { contentRect } = entry;
            const { width } = contentRect;

            if (width <= 860) {
                image.src = this.#banner.horizon;
            } else {
                image.src = this.#banner.vertical;
            }
        }

        util.ObserverUtil.resizeObserver(this, [document.body], fn);
    }
}

define(NMAside);
