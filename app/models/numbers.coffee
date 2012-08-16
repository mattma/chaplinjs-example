Model = require 'models/base/model'

module.exports = class Numbers extends Model
	defaults:
		first_number: 0
		second_number: 0

	validation:
		first_number:
			required: true
			range: [1, 10]
			msg: 'Please enter a number'

		second_number:
			required: true
			range: [1, 10]
			msg: 'Please enter a number'

