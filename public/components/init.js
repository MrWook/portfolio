'use strict';
const app = angular.module('portfolio', [
	'ngAnimate',
	'ngRoute',
	'ngResource',
	'ngTouch',
	'oc.lazyLoad',
	'pascalprecht.translate'
]);
if(localStorage.PP_portfolio === undefined){
	const language = navigator.language;
	let request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (this.readyState === 4) {
			angular.element(document).ready(function() {
				let response = JSON.parse(request.responseText);
				response.config.menu_special = ['contact'];
				app.constant("PPconfig", response.config);
				localStorage.PP_portfolio = JSON.stringify(response.config);
				angular.bootstrap(document, ["portfolio"]);
			});
		}
	};
	request.open("POST", "config", true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.send("language="+language);

}else{
	app.constant("PPconfig", JSON.parse(localStorage.PP_portfolio));
	angular.element(document).ready(function() {
		angular.bootstrap(document, ["portfolio"]);
	});
}
