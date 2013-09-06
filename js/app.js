var app = app || {};

Util = {
  unencodeHTML: function(html) {
	  return html.replace('&lt;', "<").replace('&gt;', ">");
  }
};

Array.prototype.max = Array.prototype.max || function() {
	return Math.max.apply(null, this);
};

Array.prototype.min = Array.prototype.min || function() {
	return Math.min.apply(null, this);
};

$(function () {
	'use strict';

	new app.AppView();
});
