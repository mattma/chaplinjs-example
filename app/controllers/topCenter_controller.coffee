Controller = require 'controllers/base/controller'
Numbers = require 'models/numbers'
TopCenterView = require 'views/topCenter_view'
TopLeftView = require 'views/top_left_view'

module.exports = class TopCenterController extends Controller
	initialize: ->
		super
		@model = new Numbers()
		@centerView = new TopCenterView {@model}
		@leftView = new TopLeftView {@model}
