import * as util from "/assets/js/util/utils.js"

const githubApiUtil = util.GithubApiUtil.getBuilder({ owner: "nyg1230", repo: "nyg1230.github.io" });

const init = () => {
    
    setCommitList();
    drawChart();
    window.removeEventListener("load", init);
};

const drawChart = () => {
    drawPieChart();
    drawBartChart();
};

const setCommitList = async () => {
    const commitList = document.querySelector(".commit-list");
    const template = (date, username, message) => `
        <div class="row">
            <div class="item date">${date}</div>
            <div class="item user">${username}</div>
            <div class="item message">${message}</div>
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
    console.log(pieData);
};

const drawBartChart = () => {};

window.addEventListener("load", init);
