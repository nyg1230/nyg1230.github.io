import * as util from "/assets/js/util/utils.js"

window.onload = (e) => {
    const githubApiUtil = util.GithubApiUtil.getBuilder({ owner: "nyg1230", repo: "nyg1230.github.io" });
    githubApiUtil.callApi("repo.languages").then((p) => {
        console.log(p);
    });
}