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
};

let cacheBoardList;

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

    async #getBoareList() {
        let boardList;

        if (!cacheBoardList) {
            const res = await fetch(url.boardList);
            const json = await res.json();
            cacheBoardList = json;
        }

        boardList = cacheBoardList;

        return boardList;
    }

    async getBoareList(p) {
        const { keyword, category, size, page, sort, order } = { ...p };

        let boardList = await this.#getBoareList();
        let sortFn;
        let filterFn = (b) => true;

        if (order === "asc") sortFn = (a, b) => a[sort] > b[sort] ? 1 : -1;
        else sortFn = (a, b) => a[sort] < b[sort] ? 1 : -1;

        if (util.CommonUtil.isNotEmpty(keyword)) {
            const fn = filterFn.bind(null);
            filterFn = (b) => {
                const bool = fn(b);
                const reuslt = util.CommonUtil.caseSensitiveCompare(b.title, keyword, false);
                
                return reuslt && bool;
            };
        }

        if (util.CommonUtil.isNotEmpty(category)) {
            const fn = filterFn.bind(null);
            filterFn = (b) => {
                const bool = fn(b);
                const reuslt = b.categories.includes(category);
                
                return reuslt && bool;
            };
        }

        const pagingBoardList = [...boardList]
                        .toSorted(sortFn)
                        .filter(filterFn)
                        .splice(size * page, size * (page + 1));

        const pageInfo = {
            totalSize: boardList.length,
            page: page,
            size: size
        };
        
        NMJsonModel.set("boardList", {
            list: pagingBoardList,
            pageInfo: pageInfo
        });
    }

    async #getBoard(oid) {
        return await this.#getBoareList().then((json) => json.find((d) => `${d.oid}` === `${oid}`));
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
