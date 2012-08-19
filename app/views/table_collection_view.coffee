View = require 'views/base/view'
TableView = require 'views/table_view'
Tables = require 'models/tables'
require 'lib/plugins/backbone.collectionBinder'

module.exports = class TableCollectionView extends View

	initialize: ->
		collection = new Tables [
			{ _id: 0, first: 'Adam', last: 'Zebra'}
			{ _id: 1, first: 'Bob', telephone: '1234567'}
		]

		_.bindAll 'createModel',@

		viewCreator = (model) -> return new TableView {model: model}

		#The managerFactory helps to generate element managers - an el manager creates/removes elements when models are added to a collection
		elManagerFactory = new Backbone.CollectionBinder.ViewManagerFactory viewCreator

		collectionBinder = new Backbone.CollectionBinder elManagerFactory

		#similar to the ModelBinder.bind() function but the collectionBinder will also create nested element views
		collectionBinder.bind collection, $('tbody')

		collectionBinder.on 'elCreated', (model, view) ->
			console.log model
			console.log view

			elManager = collectionBinder.getManagerForEl view.el

			console.log elManager
			console.log elManager.getModel()

		collectionBinder.on 'elRemoved', (model, view) ->
			console.log model
			console.log view

		modelCreateCount = 2

		$("#createModel").on 'click', (e) ->
			obj =
				_id: modelCreateCount
				first: $('#createFirst').val()
				last: $('#createLast').val()
				telephone: $('#createTelephone').val()
				price: $('#createPrice').val()

			collection.add obj
			modelCreateCount++

			$('#createFirst').val ''
			$('#createLast').val ''
			$('#createTelephone').val ''
			$('#createPrice').val ''


		$('body').delegate '.remove', 'click', (e) ->
			modelNum = ($ e.target).closest('tr').find('.order').text()
			collection.remove collection.at(modelNum)
			#modelCreateCount--

		($ "#removeAllModel").on 'click', (e) ->
			collection.reset()
			modelCreateCount = 0
