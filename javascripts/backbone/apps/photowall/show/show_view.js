Pixlee.module('PhotowallApp.Show', function(Show, App, Backbone, Marionette, $, _) {
    Show.PhotowallLayout = Marionette.Layout.extend({
        template: 'photowall_layout',
        regions:{
            photos_region:"#photos_region",
            pagination_region:"#pagination_region"
        },
        onShow: function () {
            this.photos_region.show(new Show.PhotowallCollectionView({
                collection: this.collection
            }));
        },
        initialize: function () {
            $(window).on('scroll', function () {
                this.checkPosition();
            }.bind(this));
        },
        checkPosition: function () {
            if (!this.isLoading) {
                var triggerPoint = this.el.scrollHeight - 400;
                var yPosition    = window.pageYOffset + window.innerHeight;

                if( yPosition > triggerPoint) {
                    this.loadPhotos();
                }
            }
        },
        loadPhotos: function () {
            this.isLoading = true;

            this.collection.preload(function () {
                this.isLoading = false;
            }.bind(this));
        }
    });

    Show.PhotowallItemView = Marionette.ItemView.extend({
        template: 'photowall_photo',
        tagName: 'img',
        className: 'thumbnail',
        attributes: function () {
            return {
                src: this.model.get('source_url')
            };
        },
        events: {
            'error': 'hideImage',
            'click': 'photoDetails'
        },
        hideImage: function (e) {
            e.target.style.display = 'none';
        },
        photoDetails: function (e) {
            // Popup animated modal
        }
    });

    Show.PhotowallCollectionView = Marionette.CollectionView.extend({
        itemView: Show.PhotowallItemView
    });
});
