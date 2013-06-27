define([
    'spoon/View',
    'jquery',
    'doT',
    'text!./assets/tmpl/app.html',
    'css!normalize-css/normalize.css',
    'css!http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700',
    'css!./assets/css/app.css',
    'css!./assets/css/header.css'
], function (View, $, doT, tmpl) {

    'use strict';

    return View.extend({
        $name: 'ApplicationView',

        _element: 'div#app',
        _template: doT.template(tmpl),

        /**
         * {@inheritDoc}
         */
        initialize: function (element) {
            View.call(this, element);

            this._onScroll = this._onScroll.bind(this);
        },

        /**
         * {@inheritDoc}
         */
        render: function () {
            View.prototype.render.call(this);

            this._headerHeight = this._element.find('.app-header').height();

            // Listen to the scroll in order to update the active topic
            $(document).on('scroll', this._onScroll);
        },

        /**
         * Sets the active menu.
         *
         * @param {String} menu The menu item name
         */
        setActiveMenu: function (menu) {
            if (this._lastActiveEl) {
                this._lastActiveEl.removeClass('active');
            }

            this._lastActiveEl = this._element.find('.menu-' + menu).addClass('active');

            document.body.scrollTop = 0;
        },

        /**
         * Handles the scroll event.
         */
        _onScroll: function () {
            if ($(window).scrollTop() > this._headerHeight) {
                this._element.addClass('scroll');
            } else {
                this._element.removeClass('scroll');
            }
        },

        /**
         * {@inheritDoc}
         */
        _onDestroy: function () {
            $(document).off('scroll', this._onScroll);
        }
    });
});