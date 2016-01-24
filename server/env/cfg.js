'use strict';

try{
	var environ = require('./environ');
	if(environ.has('NODE_ENV')){
		var role = environ.get('NODE_ENV');
		switch(role.toLowerCase()){
			case 'master':module.exports=require('./production');break;
			case 'hml':module.exports=require('./staging');break;
			default:module.exports=require('./localhost');break;
		}
	}else{
		module.exports=require('./localhost');
	}
}catch(error){
	console.warn('[Environment '+ error.stack +'\n]');
}