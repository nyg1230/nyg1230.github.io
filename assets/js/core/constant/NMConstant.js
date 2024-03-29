/* inherit */
/* common */
import * as util from "/assets/js/core/util/utils.js";
/* component */
/* model */
/* constant */
import NMCustomConstant from "/assets/js/custom/constant/NMCustomConstant.js";

const NMConstant = {
    actionName: {
        INSERT: "insert",
        UPDATE: "update",
        DELETE: "delete"
    },
    eventName: {
        CLICK: "click",
        MOUSE_MOVE: "mousemove",
        MOUSE_OUT: "mouseout",
        MOUSE_OVER: "mouseover",
        MOUSE_ENTER: "mouseenter",
        MOUSE_LEAVE: "mouseleave",
        MOUSE_DOWN: "mousedown",
        MOUSE_UP: "mouseup",
        TOUCH_START: "touchstart",
        TOUCH_MOVE: "touchmove",
        TOUCH_END: "touchend",
        CHART_COMPLETE: "chartComplete",
        POP_STATE: "popstate",
        HASH_CHANGE: "hashchange",
        CHANGE_LANGUAGE: "changeLanguage",
        SCROLL: "scroll",
        LIST_ROW_CLICK: "listRowClick",
		SCROLL_TO: "scrollTo",
        SELECT_MENU: "selectMenu",
        IMAGE_ERROR: "imageError",
        VALUE_CHANGE: "valueChange"
    },
    mimeType: {
        TEXT__HTML: "text/html",
        TEXT__XML: "text/xml",
        APP__XML: "application/xml",
        APP__XHTML_XML: "application/xhtml+xml",
        IMG__SVG_XML: "image/svg+xml"

    },
    method: {
        GET: "get",
        POST: "post",
        PUT: "put",
        DELETE: "delete"
    },
    env: {
        baseUrl: "",
        github: {
            apiVersion: "2022-11-28"
        }
    }
};

util.CommonUtil.deepMerge(NMConstant, NMCustomConstant);

export default NMConstant;
