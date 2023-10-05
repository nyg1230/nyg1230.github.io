import NMMain from "/assets/js/custom/components/view/common/NMMain.js";
import NMBody from "/assets/js/custom/components/view/common/NMBody.js";
import NMHome from "/assets/js/custom/components/view/home/NMHome.js";
import NMBoardContent from "/assets/js/custom/components/view/board/NMBoardContent.js";

const route = {
    "main": NMMain,
    "main/body": NMBody,
    "main/body/home": NMHome,
    "main/body/board": NMBoardContent
    // "main/body/boards": NMBoardList,
    // "main/body/board": NMBoard,
    // "main/body/statistics": NMStatistics
    // "main/modal"
};

export default route;