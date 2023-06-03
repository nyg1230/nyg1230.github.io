import * as util from "/assets/js/util/utils.js"

class SearchBuilder {
	#container;
	#template;
	#fileName;
	#max;
	#page = 0;
	#totalCount;
	#totalPage;
	#list = {
		all: [],
		search: []
	};

	constructor(p) {
		this.#setOption(p);
		this.#setTemplate(this.#template);
	}

	get info() {
		return {
			totalCount: this.#totalCount,
			totalPage: this.#totalPage,
			currentPage: Number(this.#page)
		}
	}

	async #setOption({ container, template, fileName, max = 10, condition, target, page = 0, keyword = "" }) {
		this.#container = container;
		this.#template = template;
		this.#fileName = fileName;
		this.#max = max;
		await this.#getAllList(condition);
		this.search(keyword, target, page);
	}

	async #getAllList(condition) {
		try {
			const res = await fetch(this.#fileName);
			this.#list.all = await res.json();

			if (util.CommonUtil.isFunction(condition)) {
				this.#list.all = this.#list.all.filter(condition);
			}

			this.#totalCount = this.#list.all.length;
			this.#totalPage = Math.ceil(this.#totalCount / this.#max);
		} finally {}
	}

	#getTemplate() {
		const { search } = { ...this.#list };
		window.qqq = search;
		const n = this.#page * this.#max;
		const list = search.slice(n, n + this.#max);
		const html = list.map((d) => this.#template(d)).join("");

		return html;
	}	

	#setTemplate(template) {
		const reg = /\{\{\s*(.*?)\s*\}\}/g;
		this.#template = (d) => {
			return template.replace(reg, (str) => {
				const r = new RegExp(/\{\{\s*(.*?)\s*\}\}/);
				const [_, key] = [...r.exec(str)];
				return util.CommonUtil.find(d, key, "");
			});
		}
	}

	#render() {
		const template = this.#getTemplate();
		util.CommonUtil.removeAllChild(this.#container);
		this.#container.insertAdjacentHTML("beforeend", template);
	}

	search(keyword = "", target = "title", page = 0) {
		const { all, search }  = { ...this.#list };
		const list = util.CommonUtil.isEmpty(keyword) ? all : all.filter((post) => post[target].indexOf(keyword) > 0);
		search.splice(0, search.length, ...list);
		this.#page = page;
		console.log(keyword, target, page)
		this.#render();

		return this.info;
	}

	nextPage() {
		return this.info;
	}

	prevPage() {
		return this.info;
	}
}

export default {
	getBuilder: (p) => {
		const builder = new SearchBuilder(p);

		return {
			search: builder.search.bind(builder),
			nextPage: builder.nextPage.bind(builder),
			prevPage: builder.prevPage.bind(builder)
		}
	}
};