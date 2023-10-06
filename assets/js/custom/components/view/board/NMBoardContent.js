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
        return `
		.${this.clsName} {
			border: solid 1px;
		}
		`;
    }

    get template() {
        return `
        <div class="${this.clsName}" part="${this.clsName}">
            <div class="header">
			</div>
			<div class="content">
				<slot><slot>
			</div>
        </div>`;
    }

	addEvent() {
		super.addEvent();
		this.bindEvent(this, NMConst.eventName.CLICK, this.onClick);
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
		const { date, title, content } = { ...data };
		this.innerHTML = "";
		util.DomUtil.insertAdjacentHTML(this, content);
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

	onClick(e) {
		console.log(e);

		const anchor = util.EventUtil.getDomFromEvent(e, "a");
		if (anchor) {
			let href = anchor.getAttribute("href");

			const target = this.querySelector(`${href}`);
			
			if (target) {
				const rect = target.getBoundingClientRect();
				const { top } = rect;
				console.log(top);

				util.EventUtil.dispatchEvent(this, NMConst.eventName.SCROLL_TO, { top });
			}
			e.preventDefault();
			e.stopPropagation();
		}
	}
}

define(NMBoardContent);
