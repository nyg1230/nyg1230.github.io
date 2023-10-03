/* inherit */
import NMIntent from "/assets/js/core/intent/NMIntent.js";
/* common */
import * as util from "/assets/js/core/util/utils.js";
/* component */
/* side effect */
import githubSideEffect from "/assets/js/custom/sideEffect/NMGithubSideEffect.js";
/* constant */
import NMConst from "/assets/js/core/constant/NMConstant.js";

class NMGithubIntent extends NMIntent {
    getCommitLanguages(p = []) {
        githubSideEffect.getCommitLanguages(p);
    }

    getWeeklyCommitCount(p = []) {
        githubSideEffect.getWeeklyCommitCount(p);
    }

    getCommitLists(p = []) {
        githubSideEffect.getCommitLists(p);
    }
}

const githubIntent = new NMGithubIntent();

export default githubIntent;
