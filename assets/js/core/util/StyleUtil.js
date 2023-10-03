/* common */
import * as util from "/assets/js/core/util/utils.js";

let styleSheet;

(async function () {
    const response = await fetch("/assets/css/common.css");
    const text = await response.text();
    const styles = new CSSStyleSheet();
    styles.replaceSync(text);

    styleSheet = styles;
})();

const StyleUtil = {
    setGlobalStyles(component) {
        if (!styleSheet) {
            window.setTimeout(() => {
                this.setGlobalStyles(component);
            }, 1000);
        } else {
            component.adoptedStyleSheets.push(styleSheet);
        }
    },
    setStyles(target, styles, replace = true) {
        const sheet = util.DomUtil.createElement("style");
        let str = "";
        Object.entries(styles).forEach(([selector, rule]) => {
            str += `${selector} {${rule}}`;
        });

        util.DomUtil.insertAdjacentHTML(sheet, str);
        target.prepend(sheet);
    },
    getBoundingClientRect(dom) {
        let rect;
        if (!dom) {
        } else {
            rect = dom.getBoundingClientRect();
        }

        return rect;
    },
    getHexColorToDecimal(hex) {
        hex = hex.replace(/^\#/, "");
        const [r0, r1, g0, g1, b0, b1] = [...hex];
        const r = parseInt(`${r0}${r1}`, 16);
        const g = parseInt(`${g0}${g1}`, 16);
        const b = parseInt(`${b0}${b1}`, 16);
        const rgb = `${r}, ${g}, ${b}`;
        return rgb
    }
}

export default StyleUtil;
