'use strict';
app.directive('cubeTransition', ['$rootScope', '$animate', '$swipe', '$document', 'PPHelper', function($rootScope, $animate, $swipe, $document, PPHelper){
	return {
		restrict: 'A',
		link: function(scope, elem, attr, ctrl) {
			//check if the animation finished
			$animate.on('enter', elem,
				function callback(element, phase) {
					if(phase == 'start'){
						$rootScope.cube_animate = true;
					}else if(phase == 'close'){
						$rootScope.cube_animate = false;
					}
				}
			);

			//bind swipe function
			let startCoords, valid, swipe_direction;
			$swipe.bind(elem, {
				'start': function(coords, event) {
					startCoords = coords;
					valid = true;
				},
				'cancel': function(event) {
					valid = false;
				},
				'end': function(coords, event) {
					swipe_direction = 'none';
					if (!startCoords)
						return false;
					const deltaY = Math.abs(coords.y - startCoords.y);
					const deltaX = (coords.x - startCoords.x);
					if(deltaX > 50)
						swipe_direction = 'right';
					if(deltaX < -50)
						swipe_direction = 'left';
					if(swipe_direction != 'none'){
						$rootScope.arrow_key = swipe_direction;
						if(!$rootScope.cube_animate)
							PPHelper.change_site(swipe_direction);
					}
				}
			}, ['touch']);

			let direction = '';
			let index_old = -1;
			let index_subpage_old = -1;
			//add class to cube for site change to trigger animation
			$rootScope.$on('change_site', function(obj, index){
				//first check for array key
				if($rootScope.arrow_key != undefined && $rootScope.arrow_key != ''){
					direction = 'cube-'+$rootScope.arrow_key;
				}else{
					if(index.length == 1){
						if(index_old >  index[0])
							direction = 'cube-left';
						else
							direction = 'cube-right';
						index_old = index[0];
					}else{
						if(index_subpage_old >  index[1])
							direction = 'cube-up';
						else
							direction = 'cube-down';
						index_subpage_old = index[1];
					}
				}

				$rootScope.arrow_key = '';
				elem.removeClass('cube-up');
				elem.removeClass('cube-down');
				elem.removeClass('cube-left');
				elem.removeClass('cube-right');
				elem.addClass(direction);
			});


			const key_code_list = {
				'37': 'left',
				'38': 'down',
				'39': 'right',
				'40': 'up'
			};
			//add key down for arrow keys
			$document[0].onkeydown = function checkKey(event) {
				let direction = key_code_list[event.keyCode];
				if(direction !== undefined){
					$rootScope.$broadcast('arrow', direction);
					if(!$rootScope.cube_animate){
						$rootScope.arrow_key = direction;
						PPHelper.change_site(direction);
					}
				}
			};
		}
	};
}]);

//helper directive for dom manipulation
app.directive('ppHelper', ['$rootScope', '$timeout', '$animate', function($rootScope, $timeout, $animate){
	return {
		restrict: 'A',
		link: function(scope, elem, attr) {
			let content = angular.element(document.querySelector('#content'));
			content.removeClass('loading');
			content.addClass('loading-removing');
			//check if the animation finished
			$animate.on('enter', content,
				function callback(element, phase) {
					if(phase == 'start'){
						$rootScope.loader = false;
					}else if(phase == 'close'){
						content.removeClass('loading-removing');
					}
				}
			);

			//set the width for arrow pad
			function set_height(){
				const content_children = content.children();
				const navbar_bottom = angular.element(content_children[2]);
				const navbar_bottom_li = navbar_bottom.find('LI');
				const li = angular.element(navbar_bottom_li[1]);
				let height = li.prop('offsetHeight');
				angular.element(li.children()).css('width', height+'px');
			}

			$timeout(function(){
				set_height();
			}, 0);
			//watch for resize event to trigger the set height again
			$rootScope.$on('window_resize', function(obj, index){
				set_height();
			});

			/*
			 * set D-pad animation
			 */
			let debounce = null;
			function cross_set(direction){
				const content_children = content.children();
				const navbar_bottom = angular.element(content_children[2]);
				const navbar_bottom_li = navbar_bottom.find('LI');
				let cross = angular.element(navbar_bottom_li[1]);
				if (debounce !== null) {
					$timeout.cancel(debounce);
				}
				debounce = $timeout(function () {
					cross.removeClass('left right up down');
					debounce = null;
				}, 600);
				debounce.catch(function(){});
				if(cross[0].classList.length == 2){
					cross.removeClass('left right up down');
				}
				cross.addClass(direction);
			}
			$rootScope.$on('arrow', function(obj, direction){
				if($rootScope.mobile === false){
					cross_set(direction);
				}
			});

		}
	};
}]);
//
// app.directive('typing', [function(){
// 	return {
// 		restrict: 'A',
// 		compile: function(elem, attr) {
// 			elem.css('display', 'none');
// 			const children = elem.children();
// 			const children_length = children.length;
// 			for(let i = 0; i < children_length;i++){
// 				const child = angular.element(children[i]);
// 				const content = child.children();
// 				console.log(content);
// 				for(let j = 0; j < content.length; j++){
// 					const element = angular.element(content[j]);
// 					element.css('display', 'none');
// 				}
// 			}
// 			elem.css('display', 'block');
// 			for(let i = 0; i < children_length;i++){
// 				const child = angular.element(children[i]);
// 				const content = child.children();
// 				console.log(content);
// 				for(let j = 0; j < content.length; j++){
// 					const element = angular.element(content[j]);
// 					element.css('display', 'none');
// 				}
// 			}
// 		}
// 	};
// }]);

app.directive('typing', [function(){
	return {
		restrict: 'A',
		compile: function(elem, attr) {

		}
	};
}]);