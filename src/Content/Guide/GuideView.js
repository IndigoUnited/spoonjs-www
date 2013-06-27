define([
    '../../Common/DocumentView',
    'text!./assets/tmpl/getting_started.html',
    'text!./assets/tmpl/folder_structure.html',
    'css!./assets/css/guide.css'
], function (DocumentView, gettingStartedTmpl, folderStructureTmpl) {

    'use strict';

    return DocumentView.extend({
        $name: 'GuideView',

        _element: 'div.guide.document',

        /**
         * {@inheritDoc}
         */
        render: function () {
            this.setBlocks([gettingStartedTmpl, folderStructureTmpl]);

            return DocumentView.prototype.render.call(this);
        }
    });
});