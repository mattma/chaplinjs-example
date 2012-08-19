Model = require 'models/base/model'

module.exports = class Form extends Model
	defaults:
		firstName: null
		lastName: null
		phone: null
		height: null
		graduated: null
		eyeColor: null
		driversLicense: null
		motorcycle_license: null
		dog: null
		bigText: null
