import NMMain from "/assets/js/custom/components/view/common/NMMain.js";
import NMBody from "/assets/js/custom/components/view/common/NMBody.js";
import NMHome from "/assets/js/custom/components/view/home/NMHome.js";
import NMPostContent from "/assets/js/custom/components/view/post/NMPostContent.js";
import NMBoardList from "/assets/js/custom/components/view/post/NMPostList.js";
import NMDoodle from "/assets/js/custom/components/view/doodle/NMDoodle.js";

const route = {
    "main": NMMain,
    "main/body": NMBody,
    "main/body/home": NMHome,
    "main/body/post": NMPostContent,
    "main/body/posts": NMBoardList,
    "main/body/doodle": NMDoodle
    // "main/body/baord-category-list": ""
    // "main/body/boards": NMBoardList,
    // "main/body/board": NMBoard,
    // "main/body/statistics": NMStatistics
    // "main/modal"
};

export default route;
