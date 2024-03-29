/* inherit */
import { NMComponent, define } from "/assets/js/core/components/NMComponent.js";
/* common */
import * as util from "/assets/js/core/util/utils.js";
/* component */
/* constant */
import NMConst from "/assets/js/core/constant/NMConstant.js";

export default class NMMenu extends NMComponent {
    #fragment;
    #data;

    static get name() {
        return "nm-menu";
    }

    get clsName() {
        return NMMenu.name;
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

    addEvent() {
        this.bindEvent(this, NMConst.eventName.CLICK, this.onClick);
    }

    onClick(e) {
        const path = e.composedPath();
        
        const row = util.EventUtil.getDomFromEvent(e, "row", "class");

        if (row) {
            util.EventUtil.dispatchEvent(this, NMConst.eventName.SELECT_MENU, { data: row.data });

            e.preventDefault();
			e.stopPropagation();
        }
    }

    setData(data) {
        this.clear();
        this.#fragment = document.createDocumentFragment();

        if (util.CommonUtil.isEmpty(data)) return;

        data.forEach((d) => {
            const div = util.DomUtil.createElement("div", { class: "row" });
            const { data, ...params } = { ...d };
            div.data = d;
            
            const row = this.renderRow(params);
            div.appendChild(row);

            if (util.CommonUtil.isNotEmpty(data)) {
                const submenu = this.renderSubMenu(data);
                div.appendChild(submenu);
            }

            this.#fragment.appendChild(div);
            d.node = div;
        });

        this.#data = data;
        this.appendChild(this.#fragment);
    }

    renderRow(params) {
        const label = util.DomUtil.createElement("nm-label", params);
        return label;
    }

    renderSubMenu(data) {
        const menu = util.DomUtil.createElement(this.clsName, { class: "sub-menu" });
        menu.setData(data);

        return menu;
    }

    clear() {}
}

define(NMMenu);
