/*jshint node:true, es5:true*/

'use strict';

var fs    = require('fs');
var path  = require('path');
var md    = require('marked');
var glob  = require('glob');
var async = require('async');

module.exports = function (task) {
    task
    .id('doc')
    .name('Build doc')
    .author('Indigo United')
    .description('Translate docs from Markdown to HTML')

    .setup(function (options, ctx, next) {
        // Set default options for marked
        md.setOptions({
            gfm: true,
            pedantic: false,
            sanitize: true
        });

        next();
    })

    .do(function (options, ctx, next) {
        var docsDir = __dirname + '/../doc/ApiReference',
            templatesDir = __dirname + '/../src/Content/ApiReference/assets/tmpl';

        glob('*.md', { cwd: docsDir }, function (err, files) {
            if (err) {
                return next(err);
            }

            async.forEach(files, function (file, next) {
                fs.readFile(docsDir + '/' + file, function (err, contents) {
                    var html;

                    if (err) {
                        return next(err);
                    }

                    html = md(contents.toString());
                    fs.writeFile(templatesDir + '/' + path.basename(file, '.md') + '.html', html);
                });
            }, next);
        });
    }, {
        description: 'Generate API Reference'
    });
};
