define([
    'spoon/View',
    'jquery',
    'doT',
    'mout/string/slugify',
    'mout/array/map',
    'rainbow/js/language/javascript',
    'text!./assets/tmpl/document.html',
    'text!./assets/tmpl/document_topics.html',
    'css!./assets/css/general.css',
    'css!./assets/css/document.css',
    'css!rainbow/themes/github.css',
    'jquery.scrollTo'
], function (View, $, doT, slugify, map, Rainbow, tmpl, topicsTmpl) {

    'use strict';

    return View.extend({
        $name: 'DocumentView',

        _element: 'div.document',
        _template: doT.template(tmpl),
        _topicsTemplate: doT.template(topicsTmpl),

        _events: {
            'click .go-top': '_onGoTopClick'
        },

        /**
         * {@inheritDoc}
         */
        initialize: function () {
            View.call(this);

            this._onScroll = this._onScroll.bind(this);
        },

        /**
         * Sets the blocks.
         *
         * @param {Array} blocks The blocks
         */
        setBlocks: function (blocks) {
            this._blocks = blocks || [];
            this._headings = [];

            return this;
        },

        /**
         * {@inheritDoc}
         */
        render: function () {
            var x,
                block;

            View.prototype.render.call(this);

            this._leftEl = this._element.find('.content-left');
            this._rightEl = this._element.find('.content-right');

            // Render each block
            for (x = 0; x < this._blocks.length; x += 1) {
                block = $('<section></section>');
                block.append($(this._blocks[x]));
                this._leftEl.append(block);
            }

            // Parse and render the topics
            this._renderTopics();

            // Listen to the scroll in order to update the active topic
            $(document).on('scroll', this._onScroll);

            // HighlighT code
            // Add data-language="javascript" because Rainbow needs it
            this._element.find('.lang-js').attr('data-language', 'javascript');
            Rainbow.color(this._element.get(0));

            return this;
        },

        /**
         * Scrolls to a given topic.
         *
         * @param {String} topic The topic
         *
         * @return {DocumentView} Chaining!
         */
        scrollTo: function (topic) {
            $.scrollTo('.' + this._generateTopicClass(topic), 300, { offset: -70 });

            return this;
        },

        /**
         * Sets the active topic.
         *
         * @param {String} topic The topic
         *
         * @return {DocumentView} Chaining!
         */
        setActive: function (topic) {
            var parent;

            topic = topic.replace(/\(\)$/g, '');

            if (this._activeTopicEl) {
                this._activeTopicEl.removeClass('active');
                parent = this._activeTopicEl.parent().parent();
                if (parent.is('li')) {
                    parent.removeClass('active');
                }
            }

            this._activeTopicEl = this._rightEl.find('.topic_' + this._generateTopicClass(topic));
            this._activeTopicEl.addClass('active');
            parent = this._activeTopicEl.parent().parent();
            if (parent.is('li')) {
                parent.addClass('active');
            }

            return this;
        },

        /**
         * Renders the topics on the right.
         */
        _renderTopics: function () {
            var currTopic,
                topics = [],
                subtopics = {},
                headings,
                menuData,
                that = this;

            // Find all headings
            headings = this._element.find('.content-left').find('h1, h2');
            headings.each(function (index, topicEl) {
                var $topicEl = $(topicEl),
                    name = $topicEl.text();

                if (topicEl.nodeName.toLowerCase() === 'h1') {
                    currTopic = name;
                    topics.push(name);
                    subtopics[name] = [];
                } else {
                    subtopics[currTopic].push(name);
                }

                $topicEl.addClass(that._generateTopicClass(name));

                // Store information about the position
                that._headings.push({
                    top: $topicEl.offset().top - 80,
                    topic: name
                });
            });

            // Render the menu
            menuData = {
                topics: topics,
                subtopics: subtopics,
                normalizeTopic: this._normalizeTopic,
                generateTopicClass: this._generateTopicClass
            };
            this._rightEl.append(this._renderTemplate(this._topicsTemplate, menuData));
        },

        /**
         * Normalizes a topic.
         *
         * @param {String} topic The topic to normalize
         *
         * @return {String} The normalized topic
         */
        _normalizeTopic: function (topic) {
            // If it's an API topic, simply remove parentheses
            if (topic.indexOf('.') !== -1) {
                return topic.replace(/\(\)$/, '');
            }

            return slugify(topic);
        },

        /**
         * Generates a class name for a topic.
         *
         * @param {String} topic The topic
         *
         * @return {String} The class name
         */
        _generateTopicClass: function (topic) {
            return slugify(topic);
        },

        /**
         * Handles the scroll event.
         */
        _onScroll: function () {
            if (this._activeTopicEl) {
                this._activeTopicEl.removeClass('active');
            }

            // Find the closest heading
            var heading,
                top = $(window).scrollTop(),
                x;

            for (x = this._headings.length - 1; x >= 0; x -= 1) {
                heading = this._headings[x];
                if (top >= heading.top) {
                    this.setActive(heading.topic);
                    return;
                }
            }

            // Fallback to the first one
            this.setActive(this._headings[0].topic);
        },

        /**
         * Handles the go top click event.
         */
        _onGoTopClick: function () {
            $.scrollTo({ top: 0, left: 0 }, 300);
        },

        /**
         * {@inheritDoc}
         */
        _onDestroy: function () {
            View.prototype._onDestroy.call(this);

            $(document).off('scroll', this._onScroll);
        }
    });
});
