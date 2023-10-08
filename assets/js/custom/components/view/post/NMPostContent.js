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

export default class NMPostContent extends NMView {
    modelList = [NMJsonModel];

    static get name() {
        return "nm-board";
    }

    get clsName() {
        return NMPostContent.name;
    }

    get styles() {
        return `
		.${this.clsName} {
            padding-top: 18px;
		}

        .header {
            padding: 0px 12px;

            & .title-area {}

            & .title-area {}

            & .title-area {}

        }
		`;
    }

    get template() {
        return `
        <div class="${this.clsName}" part="${this.clsName}">
            <div class="header">
                <div class="area title-area">
                    <nm-label class="title large"></nm-label>
                </div>
                <div class="date-area">
                    <nm-label class="sub-title medium" value="write.date" range="board"></nm-label>
                    <nm-label class="sub-title medium write-date"></nm-label>
                </div>
                <div class="writer-area">
                    <nm-label class="sub-title medium" value="wirter" range="board"></nm-label>
                    <nm-label class="sub-title medium writer"></nm-label>
                </div>
			</div>
			<div class="content">
			</div>
        </div>`;
    }

    get #content() {
        return util.DomUtil.querySelector(this, ".content");
    }

    get #title() {
        return util.DomUtil.querySelector(this, ".title");
    }

    get #writeDate() {
        return util.DomUtil.querySelector(this, ".write-date");
    }

    get #writer() {
        return util.DomUtil.querySelector(this, ".writer");
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
		const { title, date, author, content } = { ...data };

        this.#content.innerHTML = "";
        this.#title.value = title;
        this.#writeDate.value = date;
        this.#writer.value = author;

		util.DomUtil.insertAdjacentHTML(this.#content, content);
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
		const anchor = util.EventUtil.getDomFromEvent(e, "a");
		if (anchor) {
			let href = anchor.getAttribute("href");

			const target = util.DomUtil.querySelector(this, `${href}`);
			
			if (target) {
				const rect = target.getBoundingClientRect();
				const { top } = rect;

				util.EventUtil.dispatchEvent(this, NMConst.eventName.SCROLL_TO, { top });
			}
			e.preventDefault();
			e.stopPropagation();
		}
	}
}

define(NMPostContent);
