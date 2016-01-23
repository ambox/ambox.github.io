'use strict';

var environ = require('../utils/environ');

try{
	if(environ.has('HOST_ROLE')){
		var role = environ.get('HOST_ROLE');
		switch(role.toLowerCase()){
			case 'master':require('./production');break;
			case 'hml':require('./staging');break;
			default:require('./development');break;
		}
	}else{
		require('./localhost');
	}
}catch(error){
	console.warn('[Environment '+ error.name +':', error.message +']');
}