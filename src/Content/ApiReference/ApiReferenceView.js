define([
    '../../Common/DocumentView',
    'text!./assets/tmpl/controller.html',
    'text!./assets/tmpl/view.html',
    'text!./assets/tmpl/joint.html',
    'text!./assets/tmpl/broadcaster.html',
    'text!./assets/tmpl/route.html',
    'text!./assets/tmpl/stateRegistry.html',
    'css!./assets/css/api_reference.css'
], function (DocumentView, controllerTmpl, viewTmpl, jointTmpl, broadcasterTmpl, routeTmpl, stateRegistryTmpl) {

    'use strict';

    return DocumentView.extend({
        $name: 'ApiReferenceView',

        _element: 'div.api-reference.document',

        /**
         * {@inheritDoc}
         */
        render: function () {
            this.setBlocks([controllerTmpl, viewTmpl, jointTmpl, broadcasterTmpl, routeTmpl, stateRegistryTmpl]);

            return DocumentView.prototype.render.call(this);
        }
    });
});