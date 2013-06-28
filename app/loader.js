/*global requirejs*/

requirejs.config({
    baseUrl: './dev/src',
    paths: {
        'mout': '../components/mout/src',
        'events-emitter': '../components/events-emitter/src',
        'address': '../components/address/src',
        'jquery': '../components/jquery/jquery',
        'doT': '../components/doT/doT',
        'text': '../components/requirejs-text/text',
        'has': '../components/has/has',
        'bootstrap': '../components/bootstrap/js/bootstrap',
        'bootstrap-css': '../components/bootstrap/css',
        'normalize-css': '../components/normalize-css',
        'rainbow': '../components/rainbow',
        'jquery.scrollTo': '../components/jquery.scrollTo/jquery.scrollTo'
    },
    shim: {
        'handlebars': {
            exports: 'Handlebars'
        },
        'jquery.scrollTo': {
            deps: ['jquery'],
            exports: '$'
        },
        'rainbow': {
            exports: 'Rainbow'
        },
        'rainbow/js/language/generic': {
            deps: ['rainbow/js/rainbow'],
            exports: 'Rainbow'
        },
        'rainbow/js/language/javascript': {
            deps: ['rainbow/js/language/generic'],
            exports: 'Rainbow'
        }
    },
    map: {
        '*': {
            // App config (defaults to dev but changes during build)
            'app-config': '../app/config/config_dev',

            // Spoon
            'spoon': '../components/spoonjs/src/index',

            // Spoon aliases
            'spoon/Controller': '../components/spoonjs/src/core/Controller',
            'spoon/View': '../components/spoonjs/src/core/View',

            // Spoon services
            'services/broadcaster': '../components/spoonjs/src/core/Broadcaster/BroadcasterFactory',
            'services/address': '../components/spoonjs/src/core/Address/AddressFactory',
            'services/state': '../components/spoonjs/src/core/StateRegistry/StateRegistryFactory'
        }
    },
    packages: [
        // CSS plugin
        {
            name: 'css',
            location: '../components/require-css',
            main: 'css'
        }
    ]
});
