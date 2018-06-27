'use strict';
angular.module('portfolio-router', [
	'ngAnimate',
	'ngRoute',
	'oc.lazyLoad',
	'portfolio-config'
]);
angular.module('portfolio-router').config(['$locationProvider' ,'$routeProvider', '$httpProvider', 'PPconfig', '$ocLazyLoadProvider',
	function ($locationProvider, $routeProvider, $httpProvider, PPconfig, $ocLazyLoadProvider) {
		$ocLazyLoadProvider.config({
			debug: false
		});
		$routeProvider.when('/'+PPconfig.path+':page/', {
			templateUrl: function(params){
				return PPconfig.path+params.page+'/'+params.page+'.html';
			},
			resolve: {
				loadMyCtrl: ['$ocLazyLoad', '$route', '$rootScope', '$location', '$$animateJs', loadMyCtrl]
			}
		}).when('/'+PPconfig.path+':page/:subpage/', {
			templateUrl: function(params){
				return PPconfig.path+params.page+'/'+params.subpage+'/'+params.subpage+'.html'
			},
			resolve: {
				loadMyCtrl: ['$ocLazyLoad', '$route', '$rootScope', '$location', '$$animateJs', loadMyCtrl]
			}
		}).otherwise('/'+PPconfig.path+'about/');

		function loadMyCtrl($ocLazyLoad, $route, $rootScope, $location, $$animateJs){
			const params = $route.current.params;
			const menu = PPconfig.menu;
			const path = PPconfig.path;
			let load = {
				serie: false,
				files: []
			};
			let page = params.page;
			let subpage = params.subpage;
			$rootScope.path = page;
			let site_index = index_get(menu, page);
			//check if site exist
			if(site_index !== false){
				if(subpage === undefined){
					$rootScope.$broadcast('change_site', [site_index]);
					load.files.push(path+page+'/'+page+'.js');
					if(menu[site_index] !== undefined && menu[site_index].extra == true){
						load.serie = true;
						load.files.push(path+page+'/extra.js');
						load.files.push(path+page+'/extra.css');
					}
					return $ocLazyLoad.load(load);
				}else{
					$rootScope.path += '/'+subpage;
					let subpage_index = index_get(menu[site_index].subpages, subpage);
					$rootScope.$broadcast('change_site', [site_index, subpage_index]);
					$rootScope.path = page+'/'+subpage;
					load.files.push(path+page+'/'+subpage+'/'+subpage+'.js');
					//load extra files
					if(menu[site_index].subpages[subpage_index].extra == true){
						load.files.push(path+page+'/'+subpage+'/extra.js');
						load.files.push(path+page+'/'+subpage+'/extra.css');
					}
					return $ocLazyLoad.load(load)
				}
			}else{
				$location.path('/'+path+'about');
			}
		}

		function index_get(menu, page){
			let menu_length = menu.length;
			if(page == 'contact' || page == 'privacy_policies' || page == 'legal_notice')
				return -1;
			for(let i = 0; i < menu_length; i++){
				if(menu[i].name === page)
					return i;
			}
			return false;
		}

	}
]);
