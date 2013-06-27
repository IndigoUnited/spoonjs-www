define([
    '../../Common/DocumentView',
    'text!./assets/tmpl/controller.html',
    'text!./assets/tmpl/view.html',
    'css!./assets/css/api_reference.css'
], function (DocumentView, controllerTmpl, viewTmpl) {

    'use strict';

    return DocumentView.extend({
        $name: 'ApiReferenceView',

        _element: 'div.api-reference.document',

        /**
         * {@inheritDoc}
         */
        render: function () {
            this.setBlocks([controllerTmpl, viewTmpl]);

            return DocumentView.prototype.render.call(this);
        }
    });
});