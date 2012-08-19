View = require 'views/base/view'
template = require 'views/templates/form'

module.exports = class FormView extends View
	template: template
	container: "#form"
	autoRender: true

	initialize: ->
		@_modelBinder = new Backbone.ModelBinder()
		@model.on "change", @logChange, @

	render: ->
		dogs = new Backbone.Collection {model: Backbone.model}
		dogs.add {id: 1, name: 'smith', collar: 'yellow' }
		dogs.add {id: 2, name: 'biff', collar: 'red' }
		dogs.add {id: 3, name: 'candy', collar: 'green' }

		bindings =
			first_name: '[name=first_name]'  #Only binding with the name attribute in the markup
			#height: '[name=height]'
			motorcycle_license:'[name=motorcycle_license]'
			graduated:'[name=graduated]'
			eyeColor:'[name=eyeColor]'
			phone:{selector:'[name=phone]', converter: @phoneConverter}
			dog:{selector:'[name=dog]', converter:(new Backbone.ModelBinder.CollectionConverter(dogs)).convert}
			bigText:'[name=bigText]'

		@$el.html template
		@_modelBinder.bind @model, @el, bindings
		@$el.find("#viewContent").html "Form Data:<br><p>" +  JSON.stringify(@model.toJSON()) + "</p>"
		@

	logChange: ->
		@$el.find("#viewContent").html "Form Data:<br><p>" +  JSON.stringify(@model.toJSON()) + "</p>"

	# Convert the data from Model, to a new formatted value
	phoneConverter: (direction, value)->
		if direction is Backbone.ModelBinder.Constants.ModelToView
			formattedPhone = ''
			if value
				formattedPhone = value.replace(/[^0-9]/g, '') #remove everything not number
				if formattedPhone.length is 7
					formattedPhone = "#{formattedPhone.substring(0,3)}-#{formattedPhone.substring(3,7)}"
				else if formattedPhone.length is 10
					formattedPhone = "(#{formattedPhone.substring(0,3)})-#{formattedPhone.substring(3,6)}-#{formattedPhone.substring(6, 10)}"
				else if formattedPhone.length is 11
					formattedPhone = "1 (#{formattedPhone.substring(1,4)})-#{formattedPhone.substring(4,7)}-#{formattedPhone.substring(7,11)}"
				return formattedPhone
		else
			return value.replace(/[^0-9]/g, '')
