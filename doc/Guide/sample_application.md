# Sample application

The following guide aims to implement an application partially. The application is named `repo-browser` and is a tool to browse `GitHub` repositories.
While some areas of the application won't be implemented, they will still be scaffolded and left empty.

Below are the mock ups of the application that we will implement:

![Home](http://f.cl.ly/items/021T130I1W0E2A353X17/home.png)

The user types in `org/repo` clicks the arrow button and enters the repo-browser of the specified directory.
By default, the selected menu should be `CODE`.


![Issues](http://f.cl.ly/items/0K0q1y2t0U21330S2q1u/issues.png)

If the user selects issues, a list of the repository issues is listed. If one gets clicked the issue details are shown.


![Issue details](http://f.cl.ly/items/333V2X2C3A0H2O1W3x3U/issue_details.png)


## Creating the project

The easiest way to get started with a `SpoonJS` project is by installing its `CLI` with `npm install -g spoonjs`.
All available commands as well as help usages can be seen with `spoon -h`.

First, lets create the project by running `spoon project create repo-browser`.
This command might take some seconds to complete since all the necessary dependencies will be installed.   
Afterwards, lets see what the tool generated for us by spawning a server with `spoon project run`. If you open the link, you should
see a congratulations message.


What just happen?

1 - The `CLI` has scaffolded a new project based on [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD). If you are not familiar with it, we advise you to read it to be able to understand some parts of this guide.

2 - A server running the `dev` environment has been spawned. Under the hood, `spoon project run` executed the `automaton`[1] task located in `tasks/server`. This gives you freedom to tweak that task to fulfill your project needs.

3 - When you opened the link, the application has been bootstrapped by the `ApplicationController`. If you check out its code, you can easily see that it started in the `home` state that simply renders the the `HomeView` which has the congratulations message you have seen.


## Home screen

To ease out the process of having some styles and UI components, we will include [Bootstrap](http://twitter.github.io/bootstrap/) from twitter. `SpoonJS` advises you to work with [Bower](http://bower.io) to manage your dependencies. You can install it with `npm install -g bower`. Then, type `bower install --save components-bootstrap`. The `save` flag will save the dependency into the `bower.json` file located in your project root folder. Afterwards, lets include `bootstrap` it in our `AMD` loader configuration by opening the `app/loader.js` file and adding:

```js
    //..
    paths: {
        //..
        'bootstrap': '../components/components-bootstrap'
    },
    shim: {
        //..
        'bootstrap/js/bootstrap': {
            deps: ['jquery'],
            exports: '$'
        }
    }
    //..
```

Then, lets make the `ApplicationView` include the bootstrap css file:

```js
define([
    'spoon/View',
    //..
    'css!./assets/css/app.css',
    'css!bootstrap/css/bootstrap.css'
], function (View, $, doT, tmpl) {
    //..
});
```


As explained above, the `ApplicationController` is already rendering a `HomeView`.
If you open it in your favorite editor[2], you will see that its rendering a `doT` template. While this is the default template engine chosen for the scaffold process, you can change it to whatever you want. The `_template` property expects a function that outputs an HTML string or a DOM element.

Lets change that template to have the initial repository input field and button. Replace `assets/tmpl/home.html`  with:

```html
<div class="wrapper">
    <h1>repo-browser</h1>

    <div class="control-group input-append">
        <input class="input-xlarge" type="text" placeholder="git://github.com/org/repo.git" value="">
        <button class="btn" type="button">Go!</button>
    </div>
</div>
```

**NOTE:** We advise you to place a valid repository in the `value` property when pasting the example above in the home.html. This way you will always have a repository to test every time you reload the page without having to be filling the input every time.

Lets also tweek the appearance by adding the styles below to `assets/css/home.css`.   
Since the `_element` property of the `HomeView` is `div.home` we can style the view easily.

```css
.home {
    display: table;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
}

.home .wrapper {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}

.home h1 {
    margin-bottom: 70px;
    font-size: 64px;
    text-shadow: 1px 1px #999;
}
```

We now want to listen for clicks in the `Go!` button to enter the application. To do so, lets declare the event in the `_events` property of the `HomeView` like so:

```js
//..
_events: {
    'click .btn': '_onBtnClick',
    'focus .input-append': function (e, el) {
        // Remove the error class on focus
        // Note that in this case we are using an inline function
        el.removeClass('error');
    }
},

_onBtnClick: function (e, el) {
    var matches,
        value = this._element.find('input').val();

    console.log('User clicked go!');

    // Validate input value and extract org and repo information
    matches = value.match(/^git:\/\/github\.com\/(\S+?)\/(\S+?)(?:\.git)$/);

    // If it's valid, upcast the event
    if (matches) {
        this._upcast('go', { org: matches[1], repo: matches[2] });
    // Otherwise style with an error
    } else {
        el.closest('.input-append').addClass('error');
    }
}
//..
```

NOTE: Don't forget to get your application running by typing : `spoon project run`. You can optionally give a specific port in which the application will run. To do so, just add the parameter `--port or -p`. Also remind that, to check on browser console, you may have to install `add-ons` or similar in order for that to run. 

The `_upcast` function allows you to emit events upwards the hierarchy chain. If you open up your browser console, you should see an unhandled event reported by the framework. This occurs because no one is handling the `go` event yet. Note that we access `this._element` to to look for the input. That property is a reference to the `jquery` element of the view.

```
User clicked go! HomeView.js:21
Unhandled upcast event "go".
```

To listen for the `go` event, lets attach a listener to the view instance in the `ApplicationController`.

```js
//.. code inside the home state handler..
this._content.render();

this._content.on('go', function (target) {
    this.setState('inner', { org: target.org, repo: target.repo });
}.bind(this));
```

In this case, we want to switch to another state which we will name `inner`. This state will be responsible for initializing the interface you see in the second mockup. If you click on the `Go` button now you should see a warning:

```
Unhandled state "inner" on controller "ApplicationController".
```

This happened because we haven't declared the `inner` state yet. To do so, simply add it to the `_states` object and its handler in the `ApplicationController`:

```js
_states: {
    'home': '_homeState',
    'inner': '_innerState'
},

//..

/**
 * Inner state handler.
 *
 * @param {Object} state The state parameter bag
 */
_innerState: function (state) {
    this._destroyContent();

    console.log('Setup the inner interface!');
}
```

## Inner GUI

In the `inner` state, the user has the ability to browse the repository, checking out the code, issues, tags, etc.

Since this part of the application is somewhat complex, lets do it in a separate module named `Content`.  
To create a module, you can also use the `CLI` by executing `spoon module create <name>`. For the name field, type in `Content`. The generated module comes with a controller, a view and a few assets.

If you analyse the second mockup carefully, you can identify two separate areas: the menu on the left and the current menu item being shown on the right.
We can easily structure our app thanks to the hierarchical states. In this case, our generated `ContentController` will have a state for each menu on the left.
In each state, we must ensure that:

- The current selected menu on the left is the correct one
- Destroy and create the interface to be shown on the right

The content shown on the right can also be somewhat complex, therefore we will generate a separate module for each one:

- `spoon module create Content/Code`
- `spoon module create Content/Issues`
- `spoon module create Content/Tags`
- `spoon module create Content/History`

Now lets setup the `ContentController` to do what has been described above:

```js
define([
    'spoon/Controller',
    './ContentView',
    './Code/CodeController',
    './Issues/IssuesController',
    './Tags/TagsController',
    './History/HistoryController'
], function (Controller, ContentView, CodeController, IssuesController, TagsController, HistoryController) {

    'use strict';

    return Controller.extend({
        $name: 'ContentController',

        _defaultState: 'code',
        _states: {
            'code': '_codeState',
            'issues': '_issuesState',
            'tags': '_tagsState',
            'history': '_historyState'
        },

        /**
         * Constructor.
         *
         * @param {Element} element The element in which the module will work on
         * @param {String}  org     The GitHub org
         * @param {String}  repo    The GitHub repo
         */
        initialize: function (element, org, repo) {
            Controller.call(this);

            this._org = org;
            this._repo = repo;

            this._view = this._link(new ContentView());
            this._view.appendTo(element);

            this.once('link', function () {
                this._view.render();
                this._rightElement = this._view.getContentElement();
            }.bind(this));
        },

        /**
         * Code state handler.
         *
         * @param {Object} state The state parameter bag
         */
        _codeState: function (state) {
            this._view.selectMenu('code');
            this._destroyContent();

            this._content = this._link(new CodeController(this._rightElement, this._org, this._repo));
            this._content.delegateState(state);
        },

        /**
         * Issues state handler.
         *
         * @param {Object} state The state parameter bag
         */
        _issuesState: function (state) {
            this._view.selectMenu('issues');
            this._destroyContent();

            this._content = this._link(new IssuesController(this._rightElement, this._org, this._repo));
            this._content.delegateState(state);
        },

        /**
         * Tags state handler.
         *
         * @param {Object} state The state parameter bag
         */
        _tagsState: function (state) {
            this._view.selectMenu('tags');
            this._destroyContent();

            this._content = this._link(new TagsController(this._rightElement, this._org, this._repo));
            this._content.delegateState(state);
        },

        /**
         * History state handler.
         *
         * @param {Object} state The state parameter bag
         */
        _historyState: function (state) {
            this._view.selectMenu('history');
            this._destroyContent();

            this._content = this._link(new HistoryController(this._rightElement, this._org, this._repo));
            this._content.delegateState(state);
        },

        /**
         * Destroys the current content if any.
         */
        _destroyContent: function () {
            if (this._content) {
                this._content.destroy();
                this._content = null;
            }
        }
    });
});
```

Next lets add some HTML and CSS in the `ContentView` template and css files:

```html
<div class="left">
    <div class="back">
        <a class="btn btn-small" href="{{! it.$url('/home') }}"><i class="icon-chevron-left"></i> Back</a>
    </div>
    <ul class="nav nav-list">
        <li class="nav-header">repo-browser</li>
        <li class="code"><a href="{{! it.$url('code') }}">Code</a></li>
        <li class="issues"><a href="{{! it.$url('issues') }}">Issues</a></li>
        <li class="tags"><a href="{{! it.$url('tags') }}">Tags</a></li>
        <li class="history"><a href="{{! it.$url('history') }}">History</a></li>
    </ul>
</div>
<div class="right"></div>
```

Note that we are using the `$url` helper that `SpoonJS` provides to generate an URL for a state. For other template engines, a `$url` function is also provided that does exactly the same. For `Handlebars`, there's a `url` helper that does the same. It follows just as a reference:

```html
<li class="issues"><a href="{{url "issues" }}">Issues</a></li>
```

While we haven't yet associated any state to an URL, the application still works. One of the advantages of mapping URL to states is to make `back` and `forward` browser buttons work. Later on we will learn how to do that.

In the html code above, there's a special meaning for the `/home` state. When prefixed with a `/`, it means that we are referencing the a state absolutely. In this case, the root home state.

Ok, so let's define css file for the assets/css/content.css :

```css
.content {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
}

.content .left {
    width: 199px;
    position: absolute;
    top: 0;
    bottom: 0;
    background: #EEE;
    border-right: 1px solid #CCC;
}

.content .right {
    float: left;
    position: absolute;
    left: 200px;
    right: 0;
    bottom: 0;
    top: 0;
    padding: 20px;
}

.content .left .nav {
    margin-top: 20px;
}

.content .left .back {
    margin-top: 15px;
    margin-left: 15px;
}

.content .right > * {
    width: 100%;
    height: 100%;
}
```


Note that we will be calling two functions from the `ContentView`: `getContentElement()` and `selectMenu()`.
Lets code them:

```js
define([
    'spoon/View',
    'jquery',
    'doT',
    'text!./assets/tmpl/content.html',
    'css!./assets/css/content.css'
], function (View, $, doT, tmpl) {

    'use strict';

    return View.extend({
        $name: 'ContentView',

        _element: 'div.content',
        _template: doT.template(tmpl),

        /**
         * Returns the element in which the right content will be shown.
         *
         * @return {Object} The jQuery element
         */
        getContentElement: function () {
            return this._element.find('.right');
        },

        /**
         * Sets the active menu.
         *
         * @param {String} item The item to activate, valid ones are "code", "issues", "tags" and "history"
         */
        selectMenu: function (item) {
            this._element.find('.active').removeClass('active');
            this._element.find('.' + item).addClass('active');
        }
    });
});
```

Now that we have our `Content` module pretty much ready, lets instantiate it in the `inner` state of the `ApplicationController`.

**NOTE:** You must require it in the `define` statement at the top of the file.

```js
define([
    'spoon/Controller',
    './ApplicationView',
    './HomeView',
    './../Content/ContentController'
], function (Controller, ApplicationView, HomeView, ContentController) {
 ...
```

```js
/**
 * Inner state handler.
 *
 * @param {Object} state The state parameter bag
 */
_innerState: function (state) {
    this._destroyContent();

    this._content = this._link(new ContentController('#content', state.org, state.repo));
    this._content.delegateState(state);
}
```

Note that we call the `delegateState` on the child controller. We are basically saying to `ContentController` that we are done handling this part of the state and it's up to him to handle the rest. We have also extracted the `org` and `repo` parameters from the state parameters and passed them to the constructor.

And thats it! We easily scaffolded, bootstrapped and connected quite a few modules of our application in a very rapid way. But most importantly you got a feeling of organisation and separation of concerns thanks to the modular approach of the framework.


## Issues list

Next, we will work on the list of issues of a repository. As such, we will work on the isolated `Issues` module we created before.
Since you are getting familiar with `SpoonJS`, you should spot that the `IssuesController` will have two states: one for listing the issues and another to show the details of a particular issue. More states could be implemented later, for instance, a search state in case we had the functionality to search the list of issues.

Having this said, let's create the `index` state:

```js
define([
    'spoon/Controller',
    './IssuesView',
    'jquery'
], function (Controller, IssuesView, $) {

    'use strict';

    return Controller.extend({
        $name: 'IssuesController',

        _defaultState: 'index',
        _states: {
            'index': '_indexState'
        },

        /**
         * Constructor.
         *
         * @param {Element} element The element in which the module will work on
         * @param {String}  org     The GitHub org
         * @param {String}  repo    The GitHub repo
         */
        initialize: function (element, org, repo) {
            Controller.call(this);

            this._element = element;
            this._org = org;
            this._repo = repo;
        },

        /**
         * Index state handler.
         *
         * @param {Object} state The state parameter bag
         */
        _indexState: function (state) {
            this._destroyContent();

            this._content = this._link(new IssuesView());
            this._content.appendTo(this._element);
            this._content.loading();

            $.get('https://api.github.com/repos/' + this._org + '/' + this._repo + '/issues')
            .then(function (data) {
                this._content.render({
                    org: this._org,
                    repo: this._repo,
                    issues: data
                });
            }.bind(this), function () {
                this._content.error();
            }.bind(this));
        },

        /**
         * Destroys the current content if any.
         */
        _destroyContent: function () {
            if (this._content) {
                this._content.destroy();
                this._content = null;
            }
        }
    });
});
```

The `index` state instantiates the `IssuesView`, putting it into loading state. Afterwards, the issues from the repository are fetched through an `AJAX` call. Note that we advise users to create a `model` layer that is responsible to do these kind of requests but we will skip that for the sake of simplicity. When the request is done and succeeds, we call render with the array of issues, otherwise we put the `IsusesView` into error state.

**NOTE:** In order to keep this example simple as it should be, we'll not be dealing with pagination. Since git API returns chuncked data accessible through an offset and a limit, we'll keep our focus into just the first set of data received and we'll be displaying a flat array of elements not going deep into all results that git might have available. 

As seen above, we need to implement the `loading()` and `error()` methods in the `IssuesView` as well as its template and some styles to make the list look like the mockups:

```js
define([
    'spoon/View',
    'jquery',
    'doT',
    'text!./assets/tmpl/issues.html',
    'css!./assets/css/issues.css'
], function (View, $, doT, tmpl) {

    'use strict';

    return View.extend({
        $name: 'IssuesView',

        _element: 'div.issues',
        _template: doT.template(tmpl),

        /**
         * Sets the view state to loading.
         */
        loading: function () {
            this._element.empty();
            this._element.removeClass('error');
            this._element.addClass('loading');
        },

        /**
         * Sets the view state to error.
         */
        error: function () {
            this._element.html('Oops, something went wrong..');
            this._element.removeClass('loading');
            this._element.addClass('error');
        },

        /**
         * {@inheritDoc}
         */
        render: function (data) {
            this._element.removeClass('loading error');

            return View.prototype.render.call(this, data);
        }
    });
});
```

```html
<ul class="breadcrumb">
  <li><a href="{{! it.$url('../code') }}">{{! it.org }}/{{! it.repo }}</a> <span class="divider">/</span></li>
  <li class="active">Issues</li>
</ul>

<ul class="issues-list">
    {{~it.issues :issue}}
    <li class="clearfix">
        <div class="main-info">
            <div class="title"><a href="{{! it.$url('details', { nr: issue.number }) }}">{{! issue.title }}</a> <span class="nr">(#{{! issue.number }})</span></div>
            <div class="by">Open by <span class="user">{{! issue.user.login }}</span> {{! issue.created_at }}</div>
        </div>
        <div class="labels">
            <ul>
                {{~issue.labels :label}}
                <li style="background-color: #{{! label.color }}">{{! label.name }}</li>
                {{~}}
            </ul>
        </div>
    </li>
    {{~}}
</ul>
```

```css
.issues.loading {
    background: url('../img/ajax-loader.gif') no-repeat center center;
}

.issues ul {
    list-style: none;
    margin: 0;
}

.issues .issues-list {
    margin-top: 30px;
}

.issues .issues-list > li {
    border: 1px solid #e7e7e7;
    border-bottom: 1px solid #ddd;
    box-shadow: 0 1px 3px 0 #eee;
    border-radius: 3px;
    padding: 10px;
    margin-top: 10px;
}

.issues .issues-list > li:first-child {
    margin-top: 0;
}

.issues .issues-list .main-info {
    float: left;
}

.issues .issues-list .title {
    font-size: 20px;
}

.issues .issues-list .nr {
    font-size: 15px;
}

.issues .issues-list .by {
    color: #666;
}

.issues .issues-list .user {
    color: #0088CC;
}

.issues .issues-list .labels {
    float: right;
}

.issues .issues-list .labels li {
    float: left;
    border-radius: 3px;
    padding: 10px;
    margin-left: 10px;
}
```

Note that for the `loading` style we are using an animated gif downloaded from [ajaxload](http://www.ajaxload.info/). Feel free to download one of the available animated gifs and adjust the `issues.loading` css class.   
The gif is located within the `img` folder of the module (repo-browser/src/Content/Issues/assets/img). If for some reason, this asset is shared across the application, you can store it where you feel more appropriate (e.g.: in the Application `assets/img` folder).


## Issues details

The `details` state is very similar to what's being done in the `index` state in terms of flow. The only thing that changes is the GitHub API request and the view being rendered.
As such, we will need a new view that will be responsible to render the issue details. To create a view, you can use the `CLI` by executing `spoon view create <name>`. For the name field, type in `Content/Issues/IssueDetails`. This will generate the view as well as its `template` and `css` file.

Let's start by creating the `details` state in the `IssuesController`:

```js
_states: {
    'index': '_indexState',
    'details(nr)': '_detailsState'
},

//..

/**
 * Details state handler.
 *
 * @param {Object} state The state parameter bag
 */
_detailsState: function (state) {
    this._destroyContent();

    this._content = this._link(new IssueDetailsView());
    this._content.appendTo(this._element);
    this._content.loading();

    // Make both details and comments requests
    $.when(
        $.get('https://api.github.com/repos/' + this._org + '/' + this._repo + '/issues/' + state.nr),
        $.get('https://api.github.com/repos/' + this._org + '/' + this._repo + '/issues/' + state.nr + '/comments')
    ).then(function (first, second) {
        this._content.render({
            org: this._org,
            repo: this._repo,
            issue: first[0],
            comments: second[0]
        });
    }.bind(this), function () {
        this._content.error();
    }.bind(this));
}
```

**Don't forget** to require the `IssueDetailsView` at the top of the file.

```js
define([
    'spoon/Controller',
    './IssuesView',
    './IssueDetailsView',
    'jquery'
], function (Controller, IssuesView, IssueDetailsView, $) {
 ... 
```

After, let's code the `IssueDetailsView` and tweak its `template` and `css` file:

```js
define([
    'spoon/View',
    'jquery',
    'doT',
    'text!./assets/tmpl/issue_details.html',
    'css!./assets/css/issue_details.css'
], function (View, $, doT, tmpl) {

    'use strict';

    return View.extend({
        $name: 'IssueDetailsView',

        _element: 'div.issue-details',
        _template: doT.template(tmpl),

        /**
         * Sets the view state to loading.
         */
        loading: function () {
            this._element.empty();
            this._element.removeClass('error');
            this._element.addClass('loading');
        },

        /**
         * Sets the view state to error.
         */
        error: function () {
            this._element.html('Oops, something went wrong..');
            this._element.removeClass('loading');
            this._element.addClass('error');
        },

        /**
         * {@inheritDoc}
         */
        render: function (data) {
            this._element.removeClass('loading error');

            return View.prototype.render.call(this, data);
        }
    });
});
```

```html
<ul class="breadcrumb">
  <li><a href="{{! it.$url('../code') }}">{{! it.org }}/{{! it.repo }}</a> <span class="divider">/</span></li>
  <li><a href="{{! it.$url('index') }}">Issues</a> <span class="divider">/</span></li>
  <li class="active">{{! it.issue.title}}</li>
</ul>

<div class="issue-box">
    <div class="user-avatar"><img src="{{! it.issue.user.avatar_url }}" alt="{{! it.issue.user.login }}" /></div>
    <div class="issue-wrapper">
        <div class="clearfix">
            <div class="main-info">
                <div class="title"><a href="{{! it.$url('details', { nr: it.issue.number }) }}">{{! it.issue.title }}</a> <span class="nr">(#{{! it.issue.number }})</span></div>
                <div class="by">Open by <span class="user">{{! it.issue.user.login }}</span> {{! it.issue.created_at }}</div>
            </div>
            {{ if (it.issue.labels.length) { }}}
            <div class="labels">
                <ul>
                    {{~it.issue.labels :label}}
                    <li style="background-color: #{{! label.color }}">{{! label.name }}</li>
                    {{~}}
                </ul>
            </div>
            {{ } }}
        </div>
        <div class="body">{{! it.issue.body }}</div>
    </div>
</div>

{{ if (it.issue.comments > 0) { }}
<div class="issue-details issue-wrapper comments-total">{{! it.issue.comments}} comment{{ if (it.issue.comments > 1) { }}s{{ } }}</div>
<div>
    {{~it.comments :comment}}
        <div class="issue-box">
            <div class="issue-wrapper">
                <div class="clearfix">
                    <div class="main-info">
                        <div class="by"><span class="user comment">comment by</span> <span class="user">{{! comment.user.login }}</span> {{! comment.created_at }}</div>
                    </div>
                </div>
                <div class="body">{{! comment.body }}</div>
            </div>
        </div>
    {{~}}    
</div>
{{ } }}
```

```css
.issue-details.loading {
    background: url('../img/ajax-loader.gif') no-repeat center center;
}

.issue-details ul {
    list-style: none;
}

.issue-details .issue-box {
    position: relative;
}

.issue-details .issue-wrapper {
    border: 1px solid #e7e7e7;
    border-bottom: 1px solid #ddd;
    box-shadow: 0 1px 3px 0 #eee;
    border-radius: 3px;
    padding: 10px;
    margin-top: 10px;
    margin-left: 60px;
}

.issue-details .user-avatar {
    position: absolute;
    top: 0;
    left: 0;
}

.issue-details .user-avatar img {
    width: 50px;
    height: 50px;
    border-radius: 3px;
}

.issue-details .main-info {
    float: left;
}

.issue-details .labels {
    float: right;
}

.issue-details .labels li {
    float: left;
    border-radius: 3px;
    padding: 10px;
    margin-left: 10px;
}

.issue-details .body {
    margin-top: 10px;
    border-radius: 3px;
    background: #EEE;
    padding: 20px;
}

.user {
    font-size: 13px;
    font-weight: bold;
}

.user.comment {
    color: #0088CC;
    font-weight: normal;
}

.comments-total {
    color: #D96868;
}
```

## State URLs

As mentioned before, you can map states to URLs. This will add support for back & forward buttons, bookmarkable URLs among other things. These mappings can be done in the `app/config/states.js` file.

```js
define(function () {

    'use strict';

    return {
        home: '/',
        inner: {
            $pattern: '/{org}/{repo}',
            code: '/',
            issues: {
                index: '/',
                details: {
                    $pattern: '/{nr}',
                    $constraints: {
                        nr: /\d+/
                    }
                }
            },
            tags: '/tags',
            history: '/history'
        }
    };
});
```

Since states are hierarchical, states in this file are declared with nesting. For instance, the state `inner.issues.index` maps exactly to that object key.

There are some special keywords, prefixed with `$`, that have special meanings:

- `$pattern` - Used to specify a pattern other than the assumed key.
- `$fullPattern` - Used to specify the complete pattern.
- `$constraints` - Adds validation to pattern parameters; If a constraint fails, the state is not matched.
- `$order` - Used to specify the match order, since objects do not ensure order. The higher, the more precende they have.

As we can see, there is a state that depends on 2 parameters `org` and `repo`.
This means that if either one changes, the state handler will be run. 
**NOTE** If a state is transitioned to itself, nothing will be done. 

Now try to run the application and access the issues list. 
_Did it work?_

As you could see in the browser console, the application failed to run, giving an error:

```
Error: Missing param "org".
    throw new Error('Missing param "' + placeholderName + '".');
```

This happened precisely because the inner state depends on those two parameters we previously refered to. So, in order this to run, you'll have to inform your `ApplicationController` state `inner` that it should expect parameters. 

```js
    _states: {
        'home': '_homeState',
        'inner(org, repo)': '_innerState'
    },
```

**NOTE:** As you can recall, in 'Content/assets/tmpl/content.html' when defining the state urls, you did not define any additional parameters to that states, and you shouldn't either. It's up to `SpoonJS` framework to handle the state and understand that, somewhere up in the hierarchy, there are parameters that need to be added to the state (and are part of it) regardless you map or not the state to an URL representation.

# Extras

## Date Plugin

As you could see when you ran the application, the date fields were not very user friendly, so now we're placing a possible solution to overcome that situation. For this example application we'll be using a jquery plugin called `timeago` that will allow us to see dates as time references. e.g. `1 minute ago`. More information can be seen here: [http://timeago.yarp.com/](http://timeago.yarp.com/)

To install the plugin into your application, you should ùse `bower` to install the dependencies. If you're having trouble remembering the full name of the dependency you want to install, you can query `bower` for a specific string by typing `bower search time`, that will outcome :

```
Search results:
    ...
    jquery-timeago git://github.com/rmm5t/jquery-timeago.git
    ...
```

By looking at the results you can see that the plugin we're looking for is available, so let's install it locally into our sample application. Let's also add the `save` option to include the dependency into our project. 

```
bower install jquery-timeago --save
```

Now we have component installed, he have to add it to the application loader `app/loader.js` so it will be avaiable globally to all modules. With this said :

```
paths: {
        ...
        'bootstrap': '../components/components-bootstrap',
        'jquery-timeago': '../components/jquery-timeago/jquery.timeago'
    },
    shim: {
        'bootstrap/js/bootstrap': {
            deps: ['jquery'],
            exports: '$'
        },
        'jquery-timeago': {
            deps: ['jquery'],
            exports: '$'
        }
    },
    ...
```

Notice that, since jquery-timeago needs jquery to be loaded in order for it to work, we have to "shim it", so the shim configuration is needed above where we read that our plugin depends on jquery being loaded and exported as '$' variable. 

Now let's put things to work. We'll start by the issues list. So the new html for the `src/Content/Issues/assets/tmpl/issues.html` will be:

```html
<ul class="breadcrumb">
  <li><a href="{{! it.$url('../code') }}">{{! it.org }}/{{! it.repo }}</a> <span class="divider">/</span></li>
  <li class="active">Issues</li>
</ul>

<ul class="issues-list">
    {{~it.issues :issue}}
    <li class="clearfix">
        <div class="main-info">
            <div class="title"><a href="{{! it.$url('details', { nr: issue.number }) }}">{{! issue.title }}</a> <span class="nr">(#{{! issue.number }})</span></div>
            <div class="by">Open by <span class="user">{{! issue.user.login }}</span> <abbr class="timeago" title="{{! issue.created_at }}">{{! issue.created_at }}</abbr></div>
        </div>
        <div class="labels">
            <ul>
                {{~issue.labels :label}}
                <li style="background-color: #{{! label.color }}">{{! label.name }}</li>
                {{~}}
            </ul>
        </div>
    </li>
    {{~}}
</ul>
```

With this new html, we'll be able to apply the plugin to the date fields. 
**NOTE:** When the plugin is first applied to a field, it starts a timer that fires periodically thus updating the time info seen by the end users. 

We also need to performe some changes in the `IssuesView`. These changes will be responsible for updating the date fields we've defined previously in the html file. Basically, all we need to do is to import the plugin into the view and when rendering the template, apply the plugin to the respective fields. 

```js
define([
    'spoon/View',
    'jquery',
    'doT',
    'text!./assets/tmpl/issues.html',
    'css!./assets/css/issues.css',
    'jquery-timeago'
], function (View, $, doT, tmpl) {
 ...
```

The plugin import is the last in the queue because we chose to and we advise it to be like so. You can also see that we don't require the variable the variable as function parameters. This is because we don't a specific variable to that plugin since it's already bound to jquery, so we only need to use '$' and we have access to the plugin features and functions. 

By now, we only need to update the `render` function in the `IssuesView`.

```js
    /**
     * {@inheritDoc}
     */
    render: function (data) {
        this._element.removeClass('loading error');

        // just render the view, without returning it
        // since we need the view rendered prior to 
        // applying the timeago() function
        View.prototype.render.call(this, data);

        // apply the timeago() function to all data elements
        this._element.find('abbr.timeago').timeago();

        // return this to allow method chaining
        return this;
    }
```

By now, you should be able to run the application and see the effect, so, try it out. 

We're almost done here. You just need to apply this changes to `IssueDetailsView` also. It should be pretty straightforward to you now, so please do so. 

## Markdown Renderer

With this tool applied to issues details, we'll be able to see markdown notation compiled to HTML notation. If you run the application now, you'll see that markdown is not recognized as HTMl being shown as plain text. To give a better style of that tags, let's install this tool:

```
bower install marked --save
```

So, for the tool to be available throughout the application, we have to add the dependency in the `app/loader`. So it comes:

```js
paths: {
        ...
        'jquery-timeago': '../components/jquery-timeago/jquery.timeago',
        'marked': '../components/marked/lib/marked'
    },
```

Now, we're going to apply this tool to all texts in the `IssueDetailsView`. 
This means that all texts with markdown tags will be converted into html thus being rendered normally in the browser. 

```js
    /**
     * {@inheritDoc}
     */
    render: function (data) {
        this._element.removeClass('loading error');

        View.prototype.render.call(this, data);

        // apply the tool to all body texts (comments included)
        $('div .body').each(function () {
            $(this).html(marked($(this).html()));
        });

        this._element.find('abbr.timeago').timeago();

        return this;
    }
```
