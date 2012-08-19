Model = require 'models/base/model'

module.exports = class Form extends Model
	defaults:
		first_name: "matt"
		phone: "4075555555"
		height: null
		can_drive: null
		text_color: null
		drivers_license: false
		motorcycle_license: false
		dog: null
		bigText: null

