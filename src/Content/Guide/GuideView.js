define([
    '../../Common/DocumentView',
    'text!./assets/tmpl/motivation.html',
    'text!./assets/tmpl/concepts.html',
    'text!./assets/tmpl/folder_structure.html',
    'css!./assets/css/guide.css'
], function (DocumentView, motivationTmpl, conceptsTmpl, folderStructureTmpl) {

    'use strict';

    return DocumentView.extend({
        $name: 'GuideView',

        _element: 'div.guide.document',

        /**
         * {@inheritDoc}
         */
        render: function () {
            this.setBlocks([motivationTmpl, conceptsTmpl, folderStructureTmpl]);

            return DocumentView.prototype.render.call(this);
        }
    });
});