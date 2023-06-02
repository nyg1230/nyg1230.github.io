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
	}

	get info() {
		return {
			totalCount: this.#totalCount,
			totalPage: this.#totalPage,
			currentPage: Number(this.#page)
		}
	}

	#setOption({ target, template, fileName, max = 10 }) {
		this.#container = target;
		this.#template = template;
		this.#fileName = fileName;
		this.#max = max;
		this.#getAllList();
	}

	async #getAllList() {
		try {
			const res = await fetch(this.#fileName);
			this.#list.all = await res.json();
			this.#totalCount = this.#list.all.length;
			this.#totalPage = Math.ceil(this.#totalCount / this.#max);
		} catch {}
	}

	#getTemplate() {
		const { search } = { ...this.#list };
		const list = search.slice(this.#page, this.#page + this.#max);
	}	

	#render() {
		const template = this.#getTemplate();
		this.#container;
		this.#container.insertAdjacentHTML("beforeend", template);
	}

	search() {
		const { all, search }  = { ...this.#list };
		const list = all.filter((post) => post);
		search.splice(0, search.length, ...list);
		this.#page = 0;
		this.#render();
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