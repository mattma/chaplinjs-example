Controller = require 'controllers/base/controller'
Numbers = require 'models/numbers'

TopCenterView = require 'views/topCenter_view'
TopLeftView = require 'views/top_left_view'
TopRightView = require 'views/top_right_view'
BottomLeftView = require 'views/bottom_left_view'
BottomRightView = require 'views/bottom_right_view'

module.exports = class TopCenterController extends Controller
	initialize: ->
		super
		@model = new Numbers()
		@centerView = new TopCenterView {@model}
		@leftView = new TopLeftView {@model}
		@leftView = new TopRightView {@model}
		@leftView = new BottomLeftView {@model}
		@leftView = new BottomRightView {@model}
