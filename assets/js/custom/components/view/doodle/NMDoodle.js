/* inherit */
import { NMView, define } from "/assets/js/core/components/view/NMView.js";
/* common */
import * as util from "/assets/js/core/util/utils.js";
import router from "/assets/js/core/router/NMRouter.js";
/* component */
/* constant */
import NMConst from "/assets/js/core/constant/NMConstant.js";

export default class NMDoodle extends NMView {
    #doodle;
    #ctx;
    #option = {
        isDraw: false,
        status: {
            mode: "pen",
            style: {}
        }
    };
    #history = [];
    #canvasRect;
    #curPoint;

    static get observedAttributes() {
        return [];
    }

    static get name() {
        return "nm-doodle";
    }

    get clsName() {
        return NMDoodle.name;
    }

    get styles() {
        return `
            .${this.clsName} {
                padding: 12px 4px;
            }

            .canvas-area {
                // border: 1px solid red;
                width: 100%;
                height: 100%;
                text-align: center;
                overflow: hidden;
            }

            .doodle {
                // border: 1px solid blue;
                background-color: white;
            }
            `;
    }

    get template() {
        return `<div class="${this.clsName}" part="${this.clsName}">
                    <div class="canvas-area">
                        <canvas class="doodle" height="600"></canvas>
                    </div>
                </div>`;
    }

    get doodle() {
        this.#doodle = util.DomUtil.querySelector(this, ".doodle");
        this.#ctx = this.#doodle.getContext("2d");
        return this.#doodle;
    }

    get hist() {
        return this.#history;
    }

    addEvent() {
        super.addEvent();

        this.bindEvent(this, NMConst.eventName.MOUSE_DOWN, this.onMouseDown);
        this.bindEvent(this, NMConst.eventName.MOUSE_UP, this.onMouseUp);
        this.bindEvent(this, NMConst.eventName.MOUSE_MOVE, this.onMouseMove);
    }

    onMouseDown(e) {
        const { left, top } = this.#canvasRect;
        const { clientX, clientY } = e;
        this.#curPoint = [clientX - left, clientY - top];
        this.#option.isDraw = true;
    }

    onMouseUp(e) {
        this.#option.isDraw = false;
    }

    onMouseMove(e) {
        const { isDraw, status } = { ...this.#option };

        if (!isDraw) return;

        const { mode } = { ...status };

        if (mode !== "pen") return;

        const { left, top } = this.#canvasRect;
        const { clientX, clientY } = e;
        const prevPoint = this.#curPoint;
        this.#curPoint = [clientX - left, clientY - top];

        const points = [prevPoint, this.#curPoint];
        const line = util.CanvasUtil.line(points)
        line.draw(this.#ctx);
        this.setHistory("line", points);
    }

    afterRender() {
        window.qqq = this;
        this.initHistory();
        this.setResize();
    }

    setResize() {
        const wrapper = util.DomUtil.querySelector(this, ".canvas-area");

        if (!wrapper) return;

        util.ObserverUtil.resizeObserver(this, [wrapper], (entry) => {
            util.CommonUtil.debounce(this, "resize", [entry]);
        });
        util.CommonUtil.debounce(this, "resize");

        if (!this.doodle) return;
        this.bindEvent(this.doodle, NMConst.eventName.MOUSE_LEAVE, (e) => {
            this.#option.isDraw = false;
        });
    }

    resize(entry) {
        if (!this.doodle) return;

        let rect;

        if (entry) {
            const { contentRect } = entry;
            rect = contentRect;
        } else {
            rect = this.getBoundingClientRect
        }

        const { width } = rect;

        const w = util.CommonUtil.floor(width, 0);
        
        this.doodle.setAttribute("width", w);
        this.#canvasRect = util.StyleUtil.getBoundingClientRect(this.doodle);

        this.callHistory();
    }

    callHistory() {
        this.#history.forEach((hist) => {
            this.exec(hist);
        });
    }

    exec(history) {
        const { type, content } = { ...history };
        const style = util.CommonUtil.find(this.#option, "status.style", {})

        if (type === "line") {
            const line = util.CanvasUtil.line(content, { style });
            line.draw(this.#ctx);
        }
    }

    initHistory() {
        const params = router.getPathParam();
        const { history } = { ...params };

        try {
            if (history) {
                const parseHistory = JSON.parse(atob(history));
                util.CommonUtil.isArray(parseHistory) && (this.#history = parseHistory);
            } else {
                this.#history = [];
            }
        } catch (e) {
            console.error(e);
        }
    }

    setHistory(type, content) {
        this.#history.push({ type, content });
        util.CommonUtil.debounce(this, "setHistoryUrl");

    }

    setHistoryUrl() {
        const str = btoa(JSON.stringify(this.hist));
        router.pushState(`main/body/doodle?history=${str}`);
    }
}

define(NMDoodle);
