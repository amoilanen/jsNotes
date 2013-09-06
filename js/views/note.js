var app = app || {};

(function ($) {
	'use strict';

	app.NoteView = Backbone.View.extend({

		tagName:  'div',

		template: _.template($('#note-template').html()),

		events: {
			'click .note-delete': 'noteDelete',
			'click': 'onClick',
			'keyup': 'onKeyup'
		},

		initialize: function () {
			this.$title = null;
			this.$contents = null;

			this.listenTo(this.model, 'change', this.update);
			this.listenTo(this.model, 'destroy', this.remove);
		},

		update: function (event) {
			console.log("Model has been changed... Updating view", JSON.stringify(this.model));
			this.updateView();
		},
		
		render: function () {
			this.$el.html(Util.unencodeHTML(this.template(this.model.toJSON())));
			this.$el.addClass("note");

			this.$el.attr("draggable", "true");
			
			this.$title = $(".note-title", this.$el);
			this.$contents = $(".note-contents", this.$el);
			this.$title[0].contentEditable = "true";
			this.$contents[0].contentEditable = "true";

			this.updateView();
			this.el._backboneModelId = this.model.cid;
			
			return this;
		},
		
		updateView: function() {			
			this.$el.css("top", this.model.get("top") + "px");
			this.$el.css("left", this.model.get("left") + "px");
			this.$el.width(this.model.get("width") + "px");
			this.$el.height(this.model.get("height") + "px");
			this.$el.css("z-index", this.model.get("zIndex"));
			this.$el.css("background-color", this.model.get("backgroundColor"));
			
			//TODO: The update then distorts what just has been typed
			//this.$title.html(this.model.get("title"));
			//this.$contents.html(this.model.get("contents"));
		},

		noteDelete: function (event) {
			console.log("app.NoteView.remove", event);
			event.stopPropagation();
			this.model.destroy();
		},

		onClick: function (event) {
			event.stopPropagation();
			console.log("app.NoteView.onClick", event);
			
			this.noteUpdate();
			app.notes.moveToFront(this.model);
		},
		
		onKeyup: function (event) {
			console.log("app.NoteView.onKeyup", event);
			this.noteUpdate();
		},

		//TODO: Update also when a resize event has occurred on this element
		//TODO: Handle special HTML characters so that no "br" are added
		noteUpdate: function () {
			var title = this.$title.html(),
				contents = this.$contents.html(),
				width = this.$el.width(),
				height = this.$el.height();

			console.log("app.NoteView.noteUpdate");
			console.log("title = ", title);
			console.log("contents = ", contents);

			this.model.save({
				title: title,
				contents: contents,
				width: width,
				height: height
			});
		}
	});
})(jQuery);
