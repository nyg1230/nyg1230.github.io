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
                position: relative;
                width: 100%;
                height: 100%;
                overflow: hidden;

                & .image-title {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }

                & .header-image {
                    display: contents;
                    position: relative;
                    
                    &::part(nm-image) {
                        position: absolute;
                    }

                    &::part(image) {
                        opacity: 0.1;
                    }
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
                    <nm-image class="header-image" src="${backgroundUrl}"></nm-image>
                    <div class="image-title title large">누군가의 개인 블로그...</div>
                </div>`;
    }

    afterRender() {
        
    }
}

define(NMHeader);
