module.exports = function() {
	return  {
		dist:    {
			options: {
				base: 'temp/templates'
			},
			src:  ['temp/templates/**/*.html'],
			dest: 'public/modules/templates.js'
		},
		options: {
			module:       'portfolio-templates',
			rename:       function(moduleName){
				//check for ui-bootstraps template overrides
				if(moduleName.indexOf('uib/') === -1){
					let temp = moduleName.split('/');
					moduleName = temp[temp.length-1];
					return moduleName.replace('.html', '/tpl');
				}else{
					return moduleName;
				}
			},
			indentString: '	',
			singleModule: true
		}
	}
};