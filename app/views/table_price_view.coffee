View = require 'views/base/view'
template = require 'views/templates/table_price'

module.exports = class TablePriceView extends View
	template: template
	tagName: 'li'
	container: '#priceUpdate'
	autoRender: true

	# initialize: ->
	# 	@_modelBinder = new Backbone.ModelBinder()

	# render: ->
	# 	@$el.html template

	# 	bindings =
	# 		first: '.first'
	# 		price: '.price'
	# 		_id: ".id"

	# 	@_modelBinder.bind @model, @el, bindings
	# 	@
