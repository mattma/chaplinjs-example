View = require 'views/base/view'
template = require 'views/templates/footer'

module.exports = class FooterView extends View
	template: template
	autoRender: true
	container: "#footer"
	tagName: "section"
	id: "footer_details"

	initialize: ->
		@_modelBinder = new Backbone.ModelBinder()
		@model.on "change", @consoleModel, @

	render: ->
		@$el.html template
		@$el.find("article").html "Model Data:<br>" +  JSON.stringify(@model.toJSON())

		bindings =
			firstName: [
				{selector: '[name=firstName]' }
				{
					selector: "[name=fullName]"
					converter: @fullname
				}
			]

			lastName: [
				{selector: '[name=lastName]' }
				{
					selector: "[name=fullName]"
					converter: @fullname
				}
			]
			age:
				selector: '[name=age]'

		@_modelBinder.bind @model, @el, bindings
		@

	consoleModel: ->
		@render()
		@$el.find("article").html "Model Data:<br>" + JSON.stringify(@model.toJSON())

	fullname: (direction, value, attributes, model)->
		return model.get("firstName") + ' ' + model.get("lastName")
