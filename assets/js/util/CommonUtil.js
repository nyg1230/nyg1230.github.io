const CommonUtil = {
	isArray(obj) {
        return Array.isArray(obj);
    },
    isFunction(obj) {
        return typeof obj === "function";
    },
    isObject(obj) {
        return typeof obj === "object";
    },
	isString(obj) {
		return typeof obj === "string";
	},
    isNumber(obj) {
        return typeof obj === "nnumber";
    },
    isNull(obj) {
        return obj === null || obj === undefined;
    },
    isNotNull(obj) {
        return !this.isNull(obj);
    },
    isEmpty(obj) {
        return this.isNull(obj) || this.length(obj) === 0;
    },
    isNotEmpty(obj) {
        !this.isEmpty(obj)
    },
	length(obj) {
        let len = 0;

        if (this.isNull(obj)) {
        } else if (obj.hasOwnProperty("length")) {
            len = obj.length;
        } else if (this.isObject(len)) {
            len = Object.keys(obj).length;
        }

        return len;
    },
	removeAllChild(dom) {
		while(dom.firstElementChild) {
			dom.removeChild(dom.firstElementChild);
		}
	},
	find(obj, key, defaultValue) {
		let result;
		if (this.isString(key)) key = key.split(".");

		if (this.isNull(obj)) {
			obj = result;
		} else {
			result = obj;
			for (let idx = 0; idx < key.length; idx++) {
				const k = key[idx];

				result = result[k];

				if (this.isNull(result)) {
					result = defaultValue;
					break;
				}
			}
		}
		return result;
	},
    getUrlParam(url) {
        url = url.replace(/^\?/, "");
        const p = {};
        url.split("&").forEach((d) => {
            const [k, v] = [...d.split("=")];
            p[k] = v;
        });
        return p;
    },
    setBreadCrumb(txt) {
        const span = `<span class="current">${txt}</span>`;
        const breadcrumb = document.querySelector(".breadcrumb");
        breadcrumb && breadcrumb.insertAdjacentHTML("beforeend", span);
    }
};

export default CommonUtil;