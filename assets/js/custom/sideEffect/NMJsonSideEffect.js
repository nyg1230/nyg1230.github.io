/* inherit */
import NMSideEffect from "/assets/js/core/sideEffect/NMSideEffect.js";
/* common */
import * as util from "/assets/js/core/util/utils.js";
// import { Octokit, App } from "octokit";
import { Octokit } from "https:///esm.sh/@octokit/core";
/* component */
/* model */
import NMJsonModel from "/assets/js/custom/model/NMJsonModel.js";
/* constant */
import NMConst from "/assets/js/core/constant/NMConstant.js";

const baseUrl = "/assets/json";

const url = {
    boardList: `${baseUrl}/boardList.json`,
    categoryList: `${baseUrl}/categoryList.json`,
    board: `${baseUrl}/boardList.json`
}

class NMJsonSideEffect extends NMSideEffect {
    constructor(...arg) {
        super(...arg);
    }

    getRecentBoardList(p) {
        const { size = 5 } = { ...p };

        fetch(url.boardList)
            .then((res) => res.json())
            .then((json) => {
                const recentList = json.sort((a, b) => a.date > b.date).splice(0, size);
                NMJsonModel.set("recentBoardList", recentList);
            });
    }

    #getBoareList() {
        return fetch(url.boardList).then((res) => res.json())
    }

    getBoareList(p) {
        const { keyword, size, page, sort, order } = { ...p };
    }

    #getBoard(oid) {
        return this.#getBoareList().then((json) => json.find((d) => `${d.oid}` === `${oid}`));
    }

    getBoard(p) {
        const { oid } = { ...p }
        this.#getBoard(oid)
            .then((board) => {
                NMJsonModel.set("board", board);
            });
    }

    async getBoardWithContent(p) {
        const { oid } = { ...p };
        const board = await this.#getBoard(oid);
        const { url } = { ...board };
        const detail = await fetch(url).then((res) => res.text());
        NMJsonModel.set("board", { ...board, content: detail });
    }

    getCategoryList(p) {
        const { keyword } = { ...p };
        let fn;

        if (util.CommonUtil.isString(keyword)) {
            fn = (cat) => cat.indexOf(keyword) > -1
        } else {
            fn = () => true;
        }

        fetch(url.categoryList)
            .then((res) => res.json())
            .then((json) => {
                const catList = json.filter(fn);
                NMJsonModel.set("categoryList", catList);
            })
    }
}

const JsonEffect = new NMJsonSideEffect();

export default JsonEffect;
