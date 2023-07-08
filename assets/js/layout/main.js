import * as util from "/assets/js/util/utils.js"
import PieChart from "/assets/js/chart/PieChart.js"
import BarChart from "/assets/js/chart/BarChart.js"

const githubApiUtil = util.GithubApiUtil.getBuilder({ owner: "nyg1230", repo: "nyg1230.github.io" });

const init = () => {
    setCommitList();
    drawChart();
    window.removeEventListener("load", init);
};

const drawChart = () => {
    drawPieChart();
    drawBarChart();
};

const setCommitList = async () => {
    const commitList = document.querySelector(".commit-list");
    const template = (date, username, message) => `
        <div class="row">
            <div class="item date">${date}</div>
            <div class="item user">${username}</div>
            <div class="item message ellipsis">${message}</div>
        </div>
    `;
    const option = {
        per_page: 5
    };
    githubApiUtil.callApi("commit.list", option).then((p) => {
        const { data } = { ...p };
        let html = "";
        data.forEach((d) => {
            const { commit } = { ...d };
            const { author, message } = { ...commit }
            const { name, date: _date } = { ...author };
            const date = new Date(_date);
            html += template(date.toDateString(), name, message);
        });
        commitList.insertAdjacentHTML("beforeend", html);
    });
}

const drawPieChart = async () => {
    const res = await githubApiUtil.callApi("repo.languages");
    const { data } = { ...res };
    const pieData = Object.entries(data).map(([k, v]) => {
        return {
            name: k,
            value: v
        }
    });

	const target = util.DomUtil.querySelector(document, ".pie-area .chart-area");
	const rect = util.StyleUtil.getBoundingClientRect(target);
	const { width, height } = rect;
	const pieChart = new PieChart(target, { data: pieData, option: {} }, { attr: { width, height } });
};

const drawBarChart = async () => {
    const res = await githubApiUtil.callApi("commit.count.weekly");
    const { data } = { ...res };
    const { all, owner }= { ...data };
    const len = all.length;
    const chartData = [];

    const arr = all.reverse();
    for (let idx = 0; idx < 12; idx++) {
        const count = all[idx];
        let text;

        if (idx === 0) text = "이번주";
        else if (idx === 1) text = "저번주"
        else text = `${idx}주전`;
        
        chartData.push({ name: text, value: count });
    }
    const target = util.DomUtil.querySelector(document, ".bar-area .chart-area");
	const rect = util.StyleUtil.getBoundingClientRect(target);
    const { width, height } = rect;
    const barChart = new BarChart(target, { data: chartData, option: {} }, { attr: { width, height } });
};

window.addEventListener("load", init);
