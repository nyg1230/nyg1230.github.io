import { Octokit } from "https://esm.sh/@octokit/core";
import * as util from "/assets/js/util/utils.js"

class GithubApiUtil {
    #key = "Z2hwX25OeWNrOWVhdmt6N25kNWNodGdGWGpQeklnalVMdTE2dkFqYg==";
    #api_version = "2022-11-28";
    #owner;
    #repo;
    #octokit;

    constructor(p) {
        const { owner, repo } = { ...p };
        this.#owner = owner;
        this.#repo = repo;
        this.#octokit = new Octokit({
            auth: atob(this.#key)
        });
    }

    get url() {
        return {
            commit: {
                list: `GET /repos/${this.#owner}/${this.#repo}/commits`, // 해당 레파지토리의 커밋 리스트 반환
                count: {
                    weekly: `GET /repos/${this.#owner}/${this.#repo}/stats/participation`
                }
            },
            repo: {
                languages: `GET /repos/${this.#owner}/${this.#repo}/languages`, // 레파지토리 내 커밋된 프로그래밍 언어 파일 라인 수
            }
        }
    }

    async #api(url, option) {
        const { owner, repo, headers, ...remain } = { ...option };

        const response = await this.#octokit.request(url, {
            owner: this.#owner,
            repo: this.#repo,
            headers: {
                "X-GitHub-Api-Version": this.#api_version
            },
            ...remain
        });

        return response;
    }

    async callApi(key, option) {
        const url = util.CommonUtil.find(this.url, key);
        return this.#api(`${url}`, option);
    }
}

export default {
    getBuilder: (p) => {
        return new GithubApiUtil(p);
    }
};