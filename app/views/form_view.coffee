View = require 'views/base/view'
template = require 'views/templates/form'

module.exports = class FormView extends View
	template: template
	container: "#form"
	autoRender: true
