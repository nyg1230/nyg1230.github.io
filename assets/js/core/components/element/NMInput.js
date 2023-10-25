/* inherit */
import { NMComponent, define } from "/assets/js/core/components/NMComponent.js";
/* common */
import * as util from "/assets/js/core/util/utils.js";
/* component */
/* constant */
import NMConst from "/assets/js/core/constant/NMConstant.js";

export default class NMInput extends NMComponent {
    #input;

    static get observedAttributes() {
        return ["value", "type"];
    }

    static get name() {
        return "nm-input";
    }

    get clsName() {
        return NMInput.name;
    }

    get styles() {
        return `
            .${this.clsName} {
                --width: 50px;
                display: block;
                width: 100%;

                &:hover {
                    background-color: red;
                }

                &input {
                    width: var(--width);
                }
            }
        `;
    }

    get template() {
        return `
        <div class="${this.clsName}" part="${this.clsName}">
            <input type="text" part="input" value="${this.value}"/>
        </div>`;
    }

    get input() {
        !this.#input && (this.#input = util.DomUtil.querySelector(this, "input"));
        return this.#input;
    }

    get value() {
        return this.getAttribute("value");
    }

    set value(value) {
        this.setAttribute("value", value);
    }

    get type() {
        return this.getAttribute("type");
    }

    set type(type) {
        this.setAttribute("type", type);
    }

    addEvent() {}

    afterRender() {
        this.bindEvent(this.input, "change", this.onChange);
        this.bindEvent(this.input, "input", this.onInput);
    }

    // onChange(e) {
    //     console.log(e);
    //     const { target } = e;
    //     this.value = target.value;
    // }

    onInput(e) {
        const { target } = e;
        this.value = target.value;
    }

    onChangeAttr(name, old, value) {
        
        if (old !== value) {
            if (name === "value") {
                this.input && (this.input.value = value);
                let type;

                if (util.CommonUtil.isNull(old)) {
                    type = NMConst.actionName.INSERT;
                } else if (util.CommonUtil.isNull(value)) {
                    type = NMConst.actionName.DELETE;
                } else {
                    type = NMConst.actionName.UPDATE;
                }

                const p = { name: this.name, old, value, type, target: this }
                util.EventUtil.dispatchEvent(this, NMConst.eventName.VALUE_CHANGE, p);
            }
        }
    }
}

define(NMInput);
