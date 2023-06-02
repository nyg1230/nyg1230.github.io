import * as util from "/assets/js/util/utils.js";

window.onload = (e) => {
	const container = document.querySelector(".post-list");
	const template = "<div><div>";
	const pagination = document.querySelector(".pagination");
	console.log(pagination);

	const option = {
		container: container,
		template: template,
		fileName: "/assets/json/test.json",
		max: 15
	};
	const builder = util.SearchUtil.getBuilder(option);
	window.qqq = builder;
	console.log(builder);
};