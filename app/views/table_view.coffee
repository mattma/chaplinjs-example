View = require 'views/base/view'
template = require 'views/templates/table'
Tables = require 'models/tables'

module.exports = class TableCollectionView extends View
	template: template
	tagName: 'tr'
	autoRender: false

	initialize: ->
		@_modelBinder = new Backbone.ModelBinder()

	render: ->
		@$el.html template
		@_modelBinder.bind @model, @el, Backbone.ModelBinder.createDefaultBindings(@el, 'data-name')
		@
