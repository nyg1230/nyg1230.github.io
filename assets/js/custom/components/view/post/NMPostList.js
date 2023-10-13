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
import jsonIntent from "/assets/js/custom/intent/NMJsonIntent.js";
/* constant */
import NMConst from "/assets/js/core/constant/NMConstant.js";

const defaultParams = {
    keyword: "",
    category: "",
    page: 0,
    size: 10,
    sort: "date",
    order: "desc"
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
    modelList = [NMJsonModel];

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

                --template-columns: 200px auto;
            }
        }
        `;
    }

    get template() {
        return `
        <div class="${this.clsName}" part="${this.clsName}">
            <div class="">
                <nm-label class="" value="post.list" range="post"></nm-label>
            </div>
            <div class="post-list-area">
                <nm-list class="post-list">
                    <template>
                        <div class="row">
                            <div class="left">
                                <nm-image src="test"></nm-image>
                            </div>
                            <div class="right">
                                <div class="title">
                                    <nm-label data-title="value" class="title large"></nm-label>
                                </div>
                                <div class="date">
                                    <nm-label data-date="value" class="sub-title medium"></nm-label>
                                </div>
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

    onModelChange(e) {
        const { detail } = e;
        const { name, property, data } = { ...detail };

        if (name === NMJsonModel.name) {
            if (property === "boardList") {
                this.setPostList(data);
            }
        }
    }

    getPostList() {
        const param = router.getPathParam();

        const p = {
            ...defaultParams,
            ...param
        };

        jsonIntent.getBoareList(p);
    }

    setPostList(d) {
        const { list, pageInfo } = { ...d };
        const postList = util.DomUtil.querySelector(this, ".post-list");

        if (postList) {
            postList.setData(list);
        }
    }
}

define(NMPostList);
