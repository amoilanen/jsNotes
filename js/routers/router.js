var app = app || {};

(function () {
	'use strict';

	var Workspace = Backbone.Router.extend({
	});

	app.Router = new Workspace();
	Backbone.history.start();
})();
