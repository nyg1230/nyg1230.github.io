/* inherit */
/* common */
import * as util from "/assets/js/core/util/utils.js";
import language from "/assets/js/config/language/language.js";
/* component */
/* constant */
import NMConst from "/assets/js/core/constant/NMConstant.js";

const store = util.store;
let lang = store.getLocalStorage("language", "ko");
let pack;

const TranslateUtil = {
    translate(key, range = "common", data = []) {
        const target = util.CommonUtil.find(pack, range);

        let text;
        if (util.CommonUtil.isNotEmpty(target)) {
            text = target[key];
            
            if (util.CommonUtil.isArray(data)) {
                data.forEach((d, idx) => {
                    const reg = new RegExp(`\\{${idx}\\}`);
                    text = text.replace(reg, d);
                });
            }
        }

        return text;
    },
    changeLanguage(lang) {
        store.setLocalStorage("language", lang);
        this.getLanguagePack(lang);

        util.EventUtil.dispatchEvent(window, NMConst.eventName.CHANGE_LANGUAGE);
    },
    async getLanguagePack(key) {
        pack = language[key];
    }
};

TranslateUtil.getLanguagePack(lang);

export default TranslateUtil;
