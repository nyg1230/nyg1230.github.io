/* inherit */
import { NMView, define } from "/assets/js/core/components/view/NMView.js";
/* common */
import * as util from "/assets/js/core/util/utils.js";
import router from "/assets/js/core/router/NMRouter.js";
/* component */
import { NMChart } from "/assets/js/core/components/chart/NMChart.js";
import { NMList, NMRow } from "/assets/js/core/components/component/NMList.js"
import NMGrid from "/assets/js/core/components/component/NMGrid.js"
/* model */
import NMGithubModel from "/assets/js/custom/model/NMGithubModel.js";
import NMJsonModel from "/assets/js/custom/model/NMJsonModel.js";
/* intent */
import githubIntent from "/assets/js/custom/intent/NMGithubIntent.js";
import jsonIntent from "/assets/js/custom/intent/NMJsonIntent.js";
/* constant */
import NMConst from "/assets/js/core/constant/NMConstant.js";

const weeklyLimit = 10;

export default class NMHome extends NMView {
    modelList = [NMGithubModel, NMJsonModel];

    static get name() {
        return "nm-home";
    }

    get clsName() {
        return NMHome.name;
    }

    get styles() {
        return `
            .${this.clsName} {
                padding-top: 12px;
                --title-padding: 8px;
                width: 100%;
                height: 100%;
                display: grid;
                grid-template-areas:
                    "col col col"
                    "pie com com"
                    "rec rec rec"
                    "tag tag tag";
                grid-template-columns: calc(100% / 3);
                grid-template-rows:
                    minmax(25vh, 25vh)
                    minmax(20vh, 20vh)
                    minmax(20vh, 20vh)
                    minmax(20vh, 20vh);
            }

            .title-area {
                padding-bottom: var(--title-padding);
            }

            @media screen and (max-width: 860px) {
                .${this.clsName} {
                    grid-template-areas: "col" "pie" "com" "rec" "tag";
                    grid-template-columns: minmax(0, 100vw);
                    grid-template-rows: repeat(auto, minmax(20vh, 30vh));

                    & > div {
                        margin-bottom: 20px;
                    }
                }
            }

            .${this.clsName} > div {
                // border: 1px solid black;
            }

            .column-chart-area {
                grid-area: col;
                padding: 0px 8px;
            }

            .pie-chart {
                grid-area: pie;
            }

            .commit-list-area {
                grid-area: com;
                --title-height: 20px;
                
                & .title-area {
                    height: var(--title-height);
                    padding-bottom: var(--title-padding);
                }

                & .list-area {
                    padding: 0px 4px;
                    overflow-y: scroll;
                    height: calc(100% - var(--title-height) - var(--title-padding));
                }

            }

            .recent-list-area {
                grid-area: rec;
            }

            .tag-list-area {
                grid-area: tag;
            }

            .commit-list {
                --template-columns: minmax(auto, 15%) minmax(auto, 30%) auto;

                & .row {
                    .commit-name {
                        text-align: center;
                    }

                    .commit-date {
                        padding-left: 4px;
                    }

                    .commit-msg {
                        padding: 0px 4px;
                    }
                }
            }

            .commit-list-grid::part(nm-grid) {
                --content-height: 150px;
            }

            .recent-board-list-area {
                & .recent-board-list {
                    --template-columns: 100%;

                    & .row {
                        padding: 4px 8px;
                    }
                }
            }

        `;
    }

    get template() {
        return `
        <div class="${this.clsName}" part="${this.clsName}">
            <div class="column-chart-area">
                <nm-chart class="column-chart commit-count-chart"></nm-chart>
            </div>
            <div class="pie-chart-area">
                <nm-chart class="pie-chart commit-kind-chart"></nm-chart>
            </div>
            <div class="commit-list-area">
                <div class="title-area">
                    <nm-label class="sub-title large" value="commit.list" range="git" param="1,23"></nm-label>
                </div>
                <div class="list-area">
                    <nm-grid class="commit-list-grid"></nm-grid>
                </div>
            </div>
            <div class="recent-list-area">
                <div class="title-area">
                    <nm-label class="sub-title large" value="recent.post.list" range="post"></nm-label>
                </div>
				<div class="recent-board-list-area">
                    <nm-list class="recent-board-list">
                        <template>
                            <nm-row click="true">
                                <div class="row hover">
                                    <div class="board-title-area ellipsis">
                                        <nm-label class="title-label title medium" data-title="value" tooltip="true"></nm-label>
                                    </div>
                                    <div class="write-date-area">
                                        <nm-label class="date-lagel sub-title medium" data-date="value" type="date" format="$Y-$M-$d $h:$m:$s"></nm-label>
                                    </div>
                                </div>
                            </nm-row>
                        </template>
                    </nm-list>
				</div>
            </div>
        </div>
        `;
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
        this.getChartDatas();
        this.getBoardList();
    }

    onModelChange(e) {
        const { detail } = e;
        const { name, property, data } = { ...detail };

        if (name === NMGithubModel.name) {
            if (property === "commitLanguages") {
                this.setCommitLanguages(data);
            } else if (property === "commitList") {
                this.setCommitList(data);
            } else if (property === "weeklyCommitLists") {
                this.setWeeklyCommitLists(data);
            }
        } else if (name === NMJsonModel.name) {
            if (property === "recentBoardList") {
                this.setRecentBoards(data);
            }
        }
    }

    setCommitLanguages(data) {
        const pieChart = util.DomUtil.querySelector(this, ".pie-chart");

        try {
            const pieData = {
                palette: "2023",
                type: "pie",
                title: {
                    text: "언어별 커밋량"
                },
                dataLabel: {
                    position: "inner",
                    minHideRatio: 0.1,
                    param: {
                        style: {
                            fillStyle: "white"
                        }
                    }
                },
                data: {
                    ...data
                }
            };
            pieChart.setChart(pieData);
            pieChart.draw();
        } catch(e) {
            console.log(e);
        }
    }

    setWeeklyCommitLists(data) {
        const columnChart = util.DomUtil.querySelector(this, ".column-chart");
        try {
            const tooltipText = [];
            const chartData = [];
            
            data.forEach((d) => {
                const { name, data } = { ...d };
                const parseData = {};
                for (let idx = 0; idx < weeklyLimit; idx++) {
                    const text = `${idx}주 전`;
                    parseData[text] = data[idx];
                }

                tooltipText.push(name);
                chartData.push(parseData);
            });

            const columnData = {
                palette: "2023",
                type: "column",
                title: { text: "주간 커밋 횟수" },
                axis: {
                    x: {
                        title: { text: "커밋 주차" },
                        tooltip: { text: tooltipText },
                    },
                    y: {
                        title: {
                            text: "횟수"
                        }
                    }
                },
                data: chartData
            };
            columnChart.setChart(columnData);
            columnChart.draw();
        } catch (e) {
            console.log(e);
        };
    }

    setCommitList(data) {
        const grid = util.DomUtil.querySelector(this, ".commit-list-grid");
        const [d] = [...data];
        const { commitList } = { ...d };
        const gridData = {
            data: {
                columns: [
                    { key: "name", name: "writer", width: 75 },
                    { key: "date", name: "date", width: 150 },
                    { key: "message", name: "message", width: "auto" }
                ],
                list: commitList
            }
        };

        grid.$data = gridData;
    }

    setRecentBoards(data) {
        const list = util.DomUtil.querySelector(this, ".recent-board-list");
		list.$data = data;
    }

    getChartDatas() {
        githubIntent.getCommitLanguages([{ owner: "nyg1230", repo: "vanillaFE" }]);
        githubIntent.getWeeklyCommitCount([
            { owner: "nyg1230", repo: "vanillaFE", ext: { name: "repo: FE-js" } },
            { owner: "nyg1230", repo: "pythonBE", ext: { name: "repo: BE-py" } },
            { owner: "nyg1230", repo: "nyg1230.github.io", ext: { name: "repo: git.io" } }
        ]);
        githubIntent.getCommitLists([{ owner: "nyg1230", repo: "vanillaFE", ext: { name: "fe", limit: 5 } }]);
    }

    getBoardList() {
        jsonIntent.getRecentBoardList({ size: 5 });
    }
}

define(NMHome);