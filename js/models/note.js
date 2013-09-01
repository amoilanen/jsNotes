var app = app || {};

(function () {
	'use strict';

	app.Note = Backbone.Model.extend({
		defaults: {
			title: '',
			contents: '',
			left: 0,
			top: 0,
			width: 150,
			height: 150,
			zIndex: 0
		},
	});
})();