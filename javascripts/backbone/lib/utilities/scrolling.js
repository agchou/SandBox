Pixlee.module('Utilities', function(Utilities, App, Backbone, Marionette, $, _) {
    var Scrolling = {};

    el = window;

    _.extend(Scrolling, Backbone.Events);

    Scrolling.trackScroll = function() {
        el.on('scroll', function () {
            alert();
        });
    };
});
