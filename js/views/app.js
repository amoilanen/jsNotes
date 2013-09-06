var app = app || {};

(function ($) {
	'use strict';

	/*
	 * http://www.colourlovers.com/palette/2370514/Remember_Dusk
	 * http://www.colourlovers.com/palette/2806895/SimologyA
	 * http://www.colourlovers.com/palette/2729584/lenabi_1LP
	 */
	var colors = [
	    '#FFE032', /* paper note */
	    '#F8ECC2', /* old paper */
	    '#EDE3BB', /* edith */
	    '#AF6816', /* reflection caramel */
	    '#FF9900', /* vitamin c */
	    '#FFCC00', /* bee */
	    '#D8BC69', /* golden beige */
	    '#E7D943', /* oker eye */
	    '#E6F9BF', /* svetla zelena */
	    '#BDDAB0', /* sweet day green */
	    '#ACE3D6' /* sweet ice color */
	];
	
	function randomColor() {
		var randomIndex = (Math.random() * (colors.length - 1)).toFixed(0);
		
		return colors[randomIndex];
	};
	
	app.AppView = Backbone.View.extend({

		el: 'body',

		events: {
			'click #notes-container': 'createNote'
		},

		initialize: function () {
			this.$container = this.$('#notes-container');

			this.listenTo(app.notes, 'add', this.addOne);

			app.notes.fetch();

			this.initializeDragAndDrop();
		},

		initializeDragAndDrop: function () {
			$('[draggable=true]').bind("dragstart", function(event) {
				var noteView = event.target,
				viewRect = noteView.getBoundingClientRect(),
				dragData = {
					modelId: noteView._backboneModelId,
					relativeX: event.originalEvent.pageX - viewRect.left,
					relativeY: event.originalEvent.pageY - viewRect.top
				};
			
				event.originalEvent.dataTransfer.setData('Text', JSON.stringify(dragData));
			});			
			this.$el.bind('dragover', function (event) {
				event.originalEvent.dataTransfer.dropEffect = 'move';
				event.preventDefault();
				return true;
			});
			this.$el.bind('drop', function (event) {
				var dragData = JSON.parse(event.originalEvent.dataTransfer.getData('Text')),
					relativeX = dragData.relativeX,
					relativeY = dragData.relativeY,
					left = event.originalEvent.pageX - relativeX,
					top = event.originalEvent.pageY - relativeY,
					modelId = dragData.modelId,
					model = app.notes.get(modelId);
				
				console.log("Dropped model with id = ", modelId);
				
				model.save({
					top: top,
					left: left
				});
				
				app.notes.moveToFront(model);
				event.preventDefault();
			});

		},

		addOne: function (note) {
			console.log("app.AppView.addOne", note);

			var view = new app.NoteView({ model: note });
			this.$container.append(view.render().el);
		},
		
		createNote: function (e) {
			console.log("app.AppView.createNote");
			console.log("event", e);
			console.log(e.pageX, e.pageY);

			app.notes.create({
				title: 'New title',
				contents: 'New contents',
				left: e.pageX,
				top: e.pageY,
				backgroundColor: randomColor(),
				zIndex: app.notes.maxZIndex() + 1
			});
		}
	});
})(jQuery);
