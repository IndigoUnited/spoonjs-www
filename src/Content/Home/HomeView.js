define([
    'spoon/View',
    'jquery',
    'doT',
    'mout/random/randInt',
    'text!./assets/tmpl/home.html',
    'css!./assets/css/home.css'
], function (View, $, doT, randInt, tmpl) {

    'use strict';

    return View.extend({
        $name: 'HomeView',

        _element: 'div.home',
        _template: doT.template(tmpl),

        /**
         * {@inheritDoc}
         */
        render: function () {
            // Chrome has a bug and we must generate a cache busting for the videos to get around it
            // See: http://stackoverflow.com/questions/14205668/html5-video-dynamically-generated-video-tag-plays-only-first-time
            View.prototype.render.call(this, {
                rand: window.chrome ? '?' + randInt(0) : ''
            });
        }
    });
});