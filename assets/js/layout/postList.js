import * as util from "/assets/js/util/utils.js";

window.onload = (e) => {
	const builder = getSearchBuilder();
};

const getSearchBuilder = () => {
	const container = document.querySelector(".post-list");
	const template = postListTemplate;
	const pagination = document.querySelector(".pagination");

	const pathname = location.pathname.replace(/^\/*/, "");
	const [_, target, cond, p1, p2] = pathname.split("/");

	let page;
	let keyword;

	if (util.CommonUtil.isString(keyword)) {
		[keyword, page] = [p1, p2];
	} else {
		[keyword, page] = ["", Number(p1) || 0];
	}

	const option = {
		container: container,
		template: template,
		fileName: "/assets/json/test.json",
		page: page,
		keyword: keyword,
		condition: (d) => {
			let result = false;
			try {
				result = d[target].includes(cond)
			} catch {}
			return result;
		},
		max: 10
	};

	const builder = util.SearchUtil.getBuilder(option);
	return builder;
}

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