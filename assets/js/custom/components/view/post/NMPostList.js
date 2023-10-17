/* inherit */
import { NMView, define } from "/assets/js/core/components/view/NMView.js";
/* common */
import * as util from "/assets/js/core/util/utils.js";
import router from "/assets/js/core/router/NMRouter.js";
/* component */
import { NMList, NMRow } from "/assets/js/core/components/component/NMList.js"
import NMThumbnail from "/assets/js/core/components/component/NMThumbnail.js"
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
            padding: 8px 6px;
        }

        .page-title {
            padding-bottom: 12px;
        }

        .post-list {
            --border-color: var(--gray-lilac);
            --col-template: calc(100% / 3) calc(100% * 2 / 3);
            --row-template: 150px;
            --padding: 0px 8px;

            & .row {
                display: grid;
                grid-template-columns: var(--col-template);
                grid-template-rows: var(--row-template);
                column-gap: 4px;
                padding: var(--padding);

                & .left {
                }

                & .right {
                    padding: 4px 6px;
                }
            }
        }

        @media screen and (max-width: 860px) {
            .post-list {
                --col-template: 100%;
                --row-template: 200px auto;
                --padding: 0px;

                .row {
                    row-gap: 4px;
                }
            }
        }
        `;
    }

    get template() {
        return `
        <div class="${this.clsName}" part="${this.clsName}">
            <div class="page-title">
                <nm-label class="title large" value="post.list" range="post"></nm-label>
            </div>
            <div class="post-list-area">
                <nm-list class="post-list">
                    <template>
                        <nm-row click="true">
                            <div class="row">
                                <div class="left border hover">
                                    <nm-thumbnail data-thumbnail="src"></nm-thumbnail>
                                </div>
                                <div class="right border hover">
                                    <div class="title">
                                        <nm-label data-title="value" class="title large"></nm-label>
                                    </div>
                                    <div class="date">
                                        <nm-label data-date="value" class="sub-title medium"></nm-label>
                                    </div>
                                </div>
                            </div>
                        </nm-row>
                    </template>
                </nm-list>
            </div>
        </div>`;
    }

    addEvent() {
        super.addEvent();
        this.bindEvent(this, NMConst.eventName.LIST_ROW_CLICK, this.onListRowClick);
    }

    onListRowClick(e) {
        const { detail: data } = e;
        const { oid } = { ...data };

        router.pushState(`main/body/post?oid=${oid}`)
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
            console.log(list);
            postList.$data = list;
        }
    }
}

define(NMPostList);
