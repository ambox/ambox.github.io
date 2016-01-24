define([
	'scope',
	'jquery',
	'folder/main'
], function(scope, $){
	var folder = new scope.folder.Main();
	$(document).ready(folder.startup);
	$(window).resize(folder.resize).trigger('resize');
	return scope.uri('folder', folder);
});