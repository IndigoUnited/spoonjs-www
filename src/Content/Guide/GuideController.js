define([
    'spoon/Controller',
    './GuideView'
], function (Controller, GuideView) {

    'use strict';

    return Controller.extend({
        $name: 'GuideController',

        _defaultState: 'index',
        _states: {
            'index': '_indexState',
            'topic(name)': '_topicState'
        },

        /**
         * Constructor.
         *
         * @param {Element} element The element in which the module will work on
         */
        initialize: function (element) {
            Controller.call(this);

            this._view = this._link(new GuideView());
            this._view.appendTo(element);
        },

        /**
         * Index state handler.
         *
         * @param {Object} state The state parameter bag
         */
        _indexState: function (state) {
            this._view.render();
        },

        /**
         * Topic state handler.
         *
         * @param {Object} state The state parameter bag
         */
        _topicState: function (state) {
            this._view.scrollTo(state.name);
        }
    });
});
