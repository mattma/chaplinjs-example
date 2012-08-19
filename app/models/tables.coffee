Collection = require 'models/base/collection'
Table = require 'models/table'

module.exports = class Tables extends Collection
	model: Table
