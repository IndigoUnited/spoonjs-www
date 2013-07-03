define([
    '../../Common/DocumentView',
    'text!./assets/tmpl/motivation.html',
    'text!./assets/tmpl/concepts.html',
    'text!./assets/tmpl/folder_structure.html',
    'text!./assets/tmpl/sample_application.html',
    'css!./assets/css/guide.css'
], function (DocumentView, motivationTmpl, conceptsTmpl, folderStructureTmpl, sampleAppTmpl) {

    'use strict';

    return DocumentView.extend({
        $name: 'GuideView',

        _element: 'div.guide.document',

        /**
         * {@inheritDoc}
         */
        render: function () {
            this.setBlocks([motivationTmpl, conceptsTmpl, folderStructureTmpl, sampleAppTmpl]);

            return DocumentView.prototype.render.call(this);
        }
    });
});