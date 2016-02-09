var Firebase = require('firebase')
var database = new Firebase('https://ambox-voip.firebaseio.com/web/data')
// database.set(number|boolean|string|objects) // definição de valores
// database.push(number|boolean|string|objects) // definição de listas

// @tutorial: https://www.firebase.com/tutorial/#session/lqoaesvql2n
// @events: https://www.firebase.com/docs/web/guide/retrieving-data.html#section-event-types
// @auth: https://www.firebase.com/docs/web/guide/user-auth.html
// @hosting: https://www.firebase.com/docs/hosting/