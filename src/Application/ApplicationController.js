define([
    'spoon/Controller',
    './ApplicationView',
    '../Content/Home/HomeView',
    '../Content/ApiReference/ApiReferenceController',
    '../Content/Guide/GuideController'
], function (Controller, ApplicationView, HomeView, ApiReferenceController, GuideController) {

    'use strict';

    return Controller.extend({
        $name: 'ApplicationController',

        _defaultState: 'home',
        _states: {
            'home': '_homeState',
            'api': '_apiState',
            'guide': '_guideState'
        },

        /**
         * {@inheritDoc}
         */
        initialize: function () {
            Controller.call(this);

            // Instantiate and render the application view
            this._view = this._link(new ApplicationView());
            this._view
                .appendTo(document.body)
                .render();
        },

        /**
         * Home state handler.
         */
        _homeState: function () {
            this._destroyContent();

            this._view.setActiveMenu('home');
            this._content = this._link(new HomeView());
            this._content
                .appendTo(this._view, '.app-content')
                .render();
        },

        /**
         * Api state handler.
         *
         * @param {Object} state The state parameter bag
         */
        _apiState: function (state) {
            this._destroyContent();

            this._view.setActiveMenu('api');
            this._content = this._link(new ApiReferenceController('.app-content'));
            this._content.delegateState(state);
        },

        /**
         * Guide state handler.
         *
         * @param {Object} state The state parameter bag
         */
        _guideState: function (state) {
            this._destroyContent();

            this._view.setActiveMenu('guide');
            this._content = this._link(new GuideController('.app-content'));
            this._content.delegateState(state);
        },


        /**
         * Destroys the current content if any.
         */
        _destroyContent: function () {
            if (this._content) {
                this._content.destroy();
                this._content = null;
            }
        }
    });
});