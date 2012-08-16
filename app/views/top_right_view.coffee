View = require 'views/base/view'
template = require 'views/templates/top_right'
Handlebar = require 'lib/view_helper'

module.exports = class TopRightView extends View
	template: template
	container: '.top-right-panel'
	#autoRender: true

	initialize: ->
		@render()
		@subscribeEvent "updateValue", @updateValue

	updateValue: ->
		console.log "get updateValue event"
		@render()

	render: ->
		super


