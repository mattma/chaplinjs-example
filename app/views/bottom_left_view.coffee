View = require 'views/base/view'
template = require 'views/templates/bottom_left'
Handlebar = require 'lib/view_helper'

module.exports = class BottomLeftView extends View
	template: template
	container: '.bottom-left-panel'
	#autoRender: true

	initialize: ->
		@render()
		@subscribeEvent "updateValue", @updateValue

	updateValue: ->
		console.log "get updateValue event"
		@render()

	render: ->
		super


