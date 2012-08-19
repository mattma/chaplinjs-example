Model = require 'models/base/model'

module.exports = class Form extends Model
	defaults:
		first_name: "matt"
		phone: "407-555-5555"
		height: null
		graduated: null
		eyeColor: null
		motorcycle_license: null
		dog: null
		bigText: null

