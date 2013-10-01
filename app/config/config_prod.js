define(['./config', 'mout/object/merge'], function (config, merge) {

    'use strict';

    return merge(config, {
        env: 'prod',
        version: 2,

        // Address overrides
        address: {
            html5: true         // Setup prettier URLs by enabling HTML5
                                // If changed to true, the server needs to be able to rewrite URLs to the front controller
        }
    });
});
