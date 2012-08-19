View = require 'views/base/view'
template = require 'views/templates/footer_sub'

module.exports = class FooterSubView extends View
	template: template
	autoRender: true
	container: "#footer_details"
	tagName: "div"

	initialize: ->
		console.log @model
		@_modelBinder = new Backbone.ModelBinder()

	render: ->
		@$el.html template
		@_modelBinder.bind @model, @el
		@
