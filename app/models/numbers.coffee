Model = require 'models/base/model'

module.exports = class Numbers extends Model
	defaults:
		first_number: 0
		second_number: 0

	validation:
		first_number:
			required: true
			pattern: "number"
			range: [1,15]
			msg: 'Enter a valid number'

		second_number:
			required: true
			pattern: "number"
			range: [1,10]
			msg: 'Enter a valid number'

