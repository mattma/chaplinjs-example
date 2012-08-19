Controller = require 'controllers/base/controller'
Footer = require 'models/footer'
FooterView = require 'views/footer_view'
FooterSubView = require 'views/footer_sub_view'

module.exports = class FooterController extends Controller
	initialize: ->
		super
		@model = new Footer()
		@view = new FooterView({@model})
