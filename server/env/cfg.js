'use strict';

var environ = require('../utils/environ');

try{
	if(environ.has('HOST_ROLE')){
		var role = environ.get('HOST_ROLE');
		switch(role.toLowerCase()){
			case 'master':module.exports=require('./production');break;
			case 'hml':module.exports=require('./staging');break;
			default:module.exports=require('./development');break;
		}
	}else{
		module.exports=require('./localhost');
	}
}catch(error){
	console.warn('[Environment '+ error.stack +'\n]');
}