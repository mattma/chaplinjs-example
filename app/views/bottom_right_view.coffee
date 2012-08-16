View = require 'views/base/view'
template = require 'views/templates/bottom_right'
Handlebar = require 'lib/view_helper'

module.exports = class BottomRightView extends View
	template: template
	container: '.bottom-right-panel'
	#autoRender: true

	initialize: ->
		@render()
		@subscribeEvent "updateValue", @updateValue

	updateValue: ->
		console.log "get updateValue event"
		@render()

	render: ->
		super


