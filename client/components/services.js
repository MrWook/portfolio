'use strict';
//helper service to store some fundamental functions
app.service('PPHelper', ['$rootScope', '$location', 'PPconfig', '$translate', function($rootScope, $location, PPconfig, $translate) {
	let PPHelper = {};
	const menu = PPconfig.menu;

	PPHelper.page_get = function(menu, current, next){
		const menu_length = menu.length;
		for(let i = 0; i < menu_length; i++){
			if(menu[i].name === current){
				if(next == 0){
					return i;
				}else if(next == 1)
					return i++;
				else if(next == 2)
					return i--;
			}
		}
	};

	PPHelper.get_indexes = function(direction){
		let return_val = {};
		const path_array = $rootScope.path.split('/');
		if(path_array[0].indexOf(PPconfig.menu_special) === -1){
			const index = PPHelper.page_get(menu, path_array[0], 0);
			return_val['index'] = index;
			return_val['menu_length'] = menu.length;
			const menu_sub = menu[index]['subpages'];
			if(menu_sub != undefined){
				const subpage = path_array[1];
				let index_subpage = -1;
				if(subpage != undefined)
					index_subpage = PPHelper.page_get(menu_sub, subpage, 0);
				return_val['index_sub'] = index_subpage;
				return_val['submenu_length'] = menu_sub.length;
			}
		}else{
			return_val = {
				index: -1,
				menu_length: menu.length
			}
		}

		return return_val;
	};

	PPHelper.change_site = function(direction){
		let indexes = PPHelper.get_indexes();
		let submenu;
		if(indexes.index !== -1){
			submenu = menu[indexes.index]['subpages'];
		}
		if(direction == 'left'){
			if(indexes.index <= 0)
				indexes.index = indexes.menu_length-1;
			else
				indexes.index--;

		}else if(direction == 'right'){
			if(indexes.index == indexes.menu_length-1)
				indexes.index = 0;
			else
				indexes.index++;
		}
		if(direction == 'left' || direction == 'right'){
			$location.path('/'+PPconfig.path+menu[indexes.index].name);
			$rootScope.$apply();
		}
		if(submenu != undefined){
			if(direction == 'up'){
				if(indexes.index_sub == indexes.submenu_length-1)
					indexes.index_sub = -1;
				else
					indexes.index_sub++;
			}else if(direction == 'down'){
				if(indexes.index_sub == -1)
					indexes.index_sub = indexes.submenu_length;
				if(indexes.index_sub == 0)
					indexes.index_sub = -1;
				else
					indexes.index_sub--;
			}
			if(direction == 'up' || direction == 'down'){
				if(indexes.index_sub >= 0)
					$location.path('/'+PPconfig.path+menu[indexes.index].name+'/'+submenu[indexes.index_sub].name);
				else
					$location.path('/'+PPconfig.path+menu[indexes.index].name);
				$rootScope.$apply();
			}
		}
	};

	PPHelper.change_language = function(language){
		//switch language
		$translate.use(language).then(function (key) {
			localStorage.setItem('language',language);
		}, function (key) {
			console.log("unable so switch to: " + key);
		});
	};

	return PPHelper;
}]);