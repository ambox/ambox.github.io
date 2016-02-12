define(['scope', 'jquery'], function(scope, $){

	function UI(){
	}

	UI.render = function(ctx, next){
		$.get(ctx.canonicalPath, function(value){
			ctx.template = value;
			next();
		}).fail(function(reason){
			ctx.statusText = reason.statusText;
			ctx.status = reason.status;
			ctx.error = true;
			next();
		});
	};

	return scope.uri('folder.display.UI', UI);
});