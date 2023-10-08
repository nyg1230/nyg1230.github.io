/* inherit */
import { NMView, define } from "/assets/js/core/components/view/NMView.js";
/* common */
import * as util from "/assets/js/core/util/utils.js";
import router from "/assets/js/core/router/NMRouter.js";
/* component */
import NMList from "/assets/js/core/components/component/NMList.js"
/* model */
import NMJsonModel from "/assets/js/custom/model/NMJsonModel.js";
/* intent */
import jsonItent from "/assets/js/custom/intent/NMJsonIntent.js";
/* constant */
import NMConst from "/assets/js/core/constant/NMConstant.js";

const defaultParams = {
    keyword: "",
    category: "",
    page: 0,
    size: 10
};

/**
 * TODO
 *  list 적용 방식 아래와 같이 변경하기
 *  data-{var name}="{target attr}"
 * 
 * 개발해야할 리스트
 * 게시글 리스트 조회
 * 게시글 페이징
 * 게시글 페이지네이션
 * 게시글 카테고리 검색 추가
 * 
 */

export default class NMPostList extends NMView {
    static get name() {
        return "nm-board-list";
    }

    get clsName() {
        return NMPostList.name;
    }

    get styles() {
        return `
        .${this.clsName} {
            border: 1px solid black;
        }

        .post-list {
            & .row {
                display: grid;
            }
        }
        `;
    }

    get template() {
        return `
        <div class="${this.clsName}" part="${this.clsName}">
            <div class="">
                <nm-label class="" value="post list" range=""></nm-label>
            </div>
            <div class="post-list-area">
                <nm-list class="post-list">
                    <template>
                        <div class="row">
                            <div class="thumbnail"></div>
                            <div class="title">
                                <nm-label data-title="value"></nm-label>
                            </div>
                            <div class="date">
                                <nm-label data-date="value"></nm-label>
                            </div>
                        </div>
                    </template>
                </nm-list>
            </div>
        </div>`;
    }

    afterRender() {
        super.afterRender();
        this.getPostList();
    }

    getPostList() {
        const param = router.getPathParam();
        console.log(param);
    }
}

define(NMPostList);
