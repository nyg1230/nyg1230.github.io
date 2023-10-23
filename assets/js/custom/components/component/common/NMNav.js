/* inherit */
import { NMView, define } from "/assets/js/core/components/view/NMView.js";
/* common */
import * as util from "/assets/js/core/util/utils.js";
import router from "/assets/js/core/router/NMRouter.js";
/* component */
import NMMenu from "/assets/js/core/components/component/NMMenu.js"
import { NMList } from "/assets/js/core/components/component/NMList.js"
/* model */
import NMJsonModel from "/assets/js/custom/model/NMJsonModel.js";
/* intent */
import jsonItent from "/assets/js/custom/intent/NMJsonIntent.js";
/* constant */
import NMConst from "/assets/js/core/constant/NMConstant.js";

const avatarUrl = util.CommonUtil.find(NMConst, "env.profile.avatar.url");

export default class NMNav extends NMView {
    modelList = [NMJsonModel];

    static get name() {
        return "nm-nav";
    }

    get clsName() {
        return NMNav.name;
    }

    get styles() {
        return `
            .${this.clsName} {
                border: 1px solid rgba(236, 213, 184, 0.5);
            }

            .avatar {
                display: block;
                max-width: 200px;
                max-height: 200px;
            }

            .link-area {
                padding-left: 8px;
                padding-right: 8px;
                padding-bottom: 8px;
            }

            .link-list {
                font-size: 12px;
                font-weight: 700;
                --row-padding: 0px 4px;
            }

            .menu-area {
                padding-left: 8px;
                padding-right: 8px;
                padding-bottom: 8px;
            }

            nm-menu {
                cursor: pointer;
            }

            @media screen and (max-width: 860px) {

            }
        `;
    }

    get template() {
        return `<div class="${this.clsName}" part="${this.clsName}">
                    <div class="avatar-area">
                        <nm-image class="avatar" src="${avatarUrl}"></nm-image>
                    </div>
                    <div class="link-area">
                        <nm-list class="link-list">
                            <template>
                                <nm-row>
                                    <nm-label class="" type="text" data-name="value"></nm-label>
                                </nm-row>
                            </template>
                        </nm-list>
                    </div>
                    <div class="menu-area">
                        <nm-menu class="link-menu"></nm-menu>
                    </div>
                </div>`;
    }

    addEvent() {
        super.addEvent();
        this.bindEvent(this, NMConst.eventName.SELECT_MENU, this.onSelectMenu);
    }

    onSelectMenu(e) {
        const { detail } = e;
        const { data } = { ...detail };
        const { url } = { ...data };

        if (url) {
            router.pushState(url);
        }
    }

    onModelChange(e) {
        const { detail } = e;
        const { name, property, data } = { ...detail };
        
        if (name === NMJsonModel.name) {
            if (property === "categoryList") {
                this.setMenu(data);
            }
        }
    }

    afterRender() {
        super.afterRender();

        const linkList = util.DomUtil.querySelector(this, ".link-list");
        const linkDatas = Object.values(NMConst.env.profile.url);
        linkList && linkList.setData(linkDatas);

        this.getCategorise();
    }

    getCategorise() {
        jsonItent.getCategoryList();
    }

    setMenu(data) {
        const menu = util.DomUtil.querySelector(this, ".link-menu");
        data = data.map((d) => {
            const { category } = { ...d };
            return {
                value: category,
                url: `main/body/posts?categoryOid=${category}`
            }
        });

        const menuData = [
            {
                value: "home",
                range: "common",
                url: "main/body/home"
            },
            {
                value: "post",
                range: "post",
                url: "main/body/posts"
            },
            {
                value: "category",
                range: "common",
                url: "main/body/categories",
                data: [...data]
            }
        ];

        menu.setData(menuData);
    }
}

define(NMNav);
