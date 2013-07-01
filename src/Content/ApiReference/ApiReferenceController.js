define([
    'spoon/Controller',
    './ApiReferenceView'
], function (Controller, ApiReferenceView) {

    'use strict';

    return Controller.extend({
        $name: 'ApiReferenceController',

        _defaultState: 'index',
        _states: {
            'index': '_indexState',
            'topic(*)': '_topicState'
        },

        /**
         * Constructor.
         *
         * @param {Element} element The element in which the module will work on
         */
        initialize: function (element) {
            Controller.call(this);

            this._view = this._link(new ApiReferenceView());
            this._view.appendTo(element);
        },

        /**
         * Index state handler.
         */
        _indexState: function () {
            this._renderView();
        },

        /**
         * Topic state handler.
         *
         * @param {Object} state The state parameter bag
         */
        _topicState: function (state) {
            this._renderView();
            this._view.scrollTo(state.name);
        },

        /**
         * Renders the view once.
         */
        _renderView: function () {
            if (!this._rendered) {
                this._view.render();
                this._rendered = true;
            }
        }
    });
});
