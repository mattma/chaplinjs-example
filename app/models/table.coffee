Model = require 'models/base/model'

module.exports = class Table extends Model
	defaults:
		_id: null
		first: null
		last: null
		telephone: null
		price: null
