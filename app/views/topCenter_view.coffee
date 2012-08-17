View = require 'views/base/view'
mediator = require 'mediator'
template = require 'views/templates/topCenter'

module.exports = class TopCenterView extends View
	template: template
	container: '.top-center-panel'
	tagName: 'form'
	autoRender: true
	obj: null

	initialize: ->
		@on "change", @getChangeResult, @

	events:
		'click button': "fireEvent"
		'blur input': 'checkValidate'

	fireEvent: (e)->
		e.preventDefault()

		first_val = @getFirstValue()
		second_val = @getSecondValue()

		@model.set
			"first_number": first_val or 0
			"second_number": second_val or 0

		console.log @model.isValid()

		if @model.isValid(['first_number', 'second_number'])
			mediator.publish "updateValue"

	checkValidate: (e)->
		validator = ($ e.target).attr('name')
		console.log @model.isValid(validator)
		#console.log @model.isValid(validator)

	getFirstValue: ->
		first = ($ "#first_num").val()

	getSecondValue: ->
		second = ($ "#second_num").val()

	getChangeResult: ->
		console.log @model.attributes


