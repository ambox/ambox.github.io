var mongodb = require('mongodb')
exports.Client = mongodb.MongoClient
exports.ObjectId = mongodb.ObjectID
module.exports = exports.Client