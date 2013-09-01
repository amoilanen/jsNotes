var app = app || {};

(function () {
	'use strict';

	var NotesList = Backbone.Collection.extend({
		model: app.Note,

		localStorage: new Backbone.LocalStorage('backbone-notes'),
		
		maxZIndex: function() {
			return this.models.map(function (model) {
				return model.get("zIndex");
			}).max();
		},
		
		//TODO: Cover with unit tests, many corner cases here
		moveToFront: function(model) {
			console.log("Moving a model to front", model);
			
			var modelZIndex = model.get("zIndex"),
				maxZIndex = this.maxZIndex(),
				modelId = model.cid;
			
			this.models.forEach(function (m) {
				var currentZIndex = m.get("zIndex");
				
				if ((currentZIndex >= modelZIndex) && (m.cid != modelId)) {
					m.save({"zIndex": currentZIndex - 1});
				};
			});
			model.save({"zIndex": maxZIndex});
		}
	});

	app.notes = new NotesList();
})();
