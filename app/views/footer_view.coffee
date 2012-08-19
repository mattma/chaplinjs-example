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

		@_modelBinder.bind @model, @el
		@

	consoleModel: ->
		@$el.find("article").html "Model Data:<br>" + JSON.stringify(@model.toJSON())
