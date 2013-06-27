define(['./config', 'mout/object/merge', 'has'], function (config, merge, has) {

    'use strict';

    has.add('debug', true); // Set debug to true

    return merge(config, {
        env: 'dev',
        version: 0

        // ...
    });
});