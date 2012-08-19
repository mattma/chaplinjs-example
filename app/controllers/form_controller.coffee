Controller = require 'controllers/base/controller'
Form = require 'models/form'
FormView = require 'views/form_view'

module.exports = class FormController extends Controller
	initialize: ->
		super
		@model = new Form()
		@view = new FormView {@model}
