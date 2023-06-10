import * as util from "/assets/js/util/utils.js";

window.onload = (e) => {
	const builder = getSearchBuilder();
	setBreadCrumb();
};

const getSearchBuilder = () => {
	const container = document.querySelector(".post-list");
	const template = postListTemplate;
	const pagination = document.querySelector(".pagination");

	const param = util.CommonUtil.getUrlParam(location.search);
	const { cat, page = 1, keyword = "" } = { ...param };
	const target = "categories";

	const option = {
		container: container,
		template: template,
		fileName: "/assets/json/test.json",
		page: page,
		keyword: keyword,
		condition: (d) => {
			let result = false;
			try {
				result = d[target].includes(cat);
			} catch {}
			return result;
		},
		max: 10
	};

	const builder = util.SearchUtil.getBuilder(option);
	return builder;
}

const setBreadCrumb = () => {
	const param = util.CommonUtil.getUrlParam(location.search);
	const { cat = "All" } = { ...param };

	const span = `<span class="current">${cat}</span>`;
	const breadcrumb = document.querySelector(".breadcrumb");
	breadcrumb && breadcrumb.insertAdjacentHTML("beforeend", span);
};

const postListTemplate = `
<div class="post">
	<div class="thumbnail">
		<img src="{{thumbnail}}" onerror='this.src="/assets/img/empty/no_thumbnail.png"'>
	</div>
	<div class="content">
		<div class="title ellipsis">{{title}}</div>
		<div class="summary ellipsis">
			{{ categories }}
			{{content}}
		</div>
		<div class="footer">
			<a href="{{url}}">more</a>
		</div>
	</div>
</div>`;