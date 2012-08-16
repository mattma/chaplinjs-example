View = require 'views/base/view'
template = require 'views/templates/top_left'
Handlebar = require 'lib/view_helper'

module.exports = class TopLeftView extends View
	template: template
	container: '.top-left-panel'
	#autoRender: true

	initialize: ->
		@render()
		@subscribeEvent "updateValue", @updateValue

	updateValue: ->
		console.log "get updateValue event"
		@render()

	render: ->
		super


