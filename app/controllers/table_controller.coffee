Controller = require 'controllers/base/controller'
Table = require 'models/table'
TableCollectionView = require 'views/table_collection_view'

module.exports = class TablesController extends Controller
	initialize: ->
		super
		@model = new Table()
		@view = new TableCollectionView {@model}
