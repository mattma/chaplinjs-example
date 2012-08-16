Controller = require 'controllers/base/controller'
Numbers = require 'models/numbers'
TopLeftView = require 'views/top_left_view'

module.exports = class TopLeftController extends Controller
	initialize: ->
		super
		@model = new Numbers()
		@view = new TopLeftView {@model}
