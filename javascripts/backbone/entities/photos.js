Pixlee.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
    var _this = this,
        API, _API;

    API = {
        getPhotosCollection: function(bootstrap, options) {
            return new Entities.Photos(bootstrap || [], options || {});
        }
    };

    Entities.Photo = Backbone.Model.extend({

    });

    Entities.Photos = Backbone.Collection.extend({
        model: Entities.Photo,
        page: 2,
        quantity: 20,
        loading: false,
        url: function () {
            return 'http://localhost:3000/photos?page=' +
                this.page + '&quantity=' + this.quantity;
        },
        preload: function (cb) {
            var _this = this;
            this.fetch({ remove: false }).success(function (photos) {
                _this.page++;
                cb();
            });
        }
    });

    App.reqres.setHandlers({
        'get:photos': function(bootstrap, options) {
            return API.getPhotosCollection(bootstrap, options);
        }
    });
});
