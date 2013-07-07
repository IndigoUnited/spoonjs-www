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

1 - The `CLI` has scaffolded a new project based on [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD). If you are not familiar with it, we advice to read it to be able to understand some parts of this guide.

2 - A server running the `dev` environment has been spawned. Under the hood, `spoon project run` executed the `automaton`[1] task located in `tasks/server`. This gives you freedom to tweak that task to fulfill your project needs.

3 - When you opened the link, the application has been bootstrapped by the `ApplicationController`. If you check out its code, you easily see that it started in the `home` state that simply renders the the `HomeView` which has the congratulations message you have seen.


## Home screen

To ease out the process of having some styles and UI components, we will include [Bootstrap](http://twitter.github.io/bootstrap/) from twitter. `SpoonJS` advices you to work with [Bower](http://bower.io) to manage your dependencies. You can install it with `npm install -g bower`. Then, type `bower install --save components-bootstrap`. The `save` flag will save the dependency into the `bower.json` file located in your project root folder. Afterwards, lets include `bootstrap` it in our `AMD` loader configuration by opening the `app/loader.js` file and adding:

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

    <div class="input-append">
        <input class="input-xlarge" type="text" placeholder="git://github.com/org/repo.git">
        <button class="btn" type="button">Go!</button>
    </div>
</div>
```

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

The `_upcast` function allows you to emit events upwards the hierarchy chain. If you open up your browser console, you should see an unhandled event reported by the framework. This occurs because no one is handling the `go` event yet. Note that we access `this._element` to to look for the input. That property is a reference to the `jquery` element of the view.

```
User clicked go! HomeView.js:21
Unhandled upcast event "go".
```

To listen for the `go` event, lets attach a listener to the view instance in the `ApplicationController`.

```js
//.. code inside the index state handler..
this._content.render();

this._content.on('go', function (target) {
    this.setState('inner', { org: target.org, repo: target.repo });
}.bind(this));
```

In this case, we want to transition to another state which we will name `inner`. This state will be responsible for initializing the interface you see in the second mockup. If you click on the `Go` button now you should see a warning:

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
To create a module, you can also use the `CLI` by executing `spoon module create <name>`. For the name field, type in `content`. The generated module comes with a controller, a view and a few assets.

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

Now lets setup the `ContentController` to do what as been described above:

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

Note that we are using the `$url` helper that `SpoonJS` provides to generate an URL for a state. For other template engines, a `$url` function is also provided that does exactly the same. For `Handlebars`, there's a `url` helper that does the same:

```html
<li class="issues"><a href="{{url "issues" }}">Issues</a></li>
```

While we haven't yet associated any state to an URL, the application still works. One of the advantages of mapping URL to states is to make `back` and `forward` browser buttons work. Later we will learn how to do that.

In the html code above, there's a special meaining for the `/home` state. When prefixed with a `/`, it means that we are referencing the a state absolutely. In this case, the root home state.


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


Note that we are calling two functions from the `ContentView`: `getContentElement()` and `selectMenu()`.
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
Note that you must require it in the `define` statement at the top of the file.

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

Note that we call the `delegateState` on the child controller. We are basically saying to `ContentController` that we are done handling this part of the state and it's up to him to handle the rest. We have also extracted the `org` and `repo` parameters from the state parameters and passed them the constructor.

And thats it! We easily scaffolded, bootstrapped and connected quite a few modules of our application in a very rapid way. But most importantly you got a feeling of organisation and separation of concerns thanks to the modular approach of the framework.


## Issues list

Next, we will work on the list of issues of a repository. As such, we will work on the isolated `Issues` module we created before.
Since you are getting familiar with `SpoonJS`, you should spot that the `IssuesController` will have two states: one for listing the issues and another to show the details of a particular issues. More states could be implemented later, for instance, a search state in case we had the functionality to search the list of issues.

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

The `index` state instantiates the `IssuesView`, putting it into loading state. Afterwards, the issues from the repository are fetched through an `AJAX` call. Note that we advise users to create a `model` layer that is responsible to do these kind of requests but we will skip that for the sake of simplicity. When the request is done and succeeds, we call render with the array of issues, otherwise we put the `IsusesView` into the error state.

As seen above, we need to implement the `loading()` and `error()` methods in the `IssuesView` as well its template and some styles to make the list look like the mockups:

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
        $name: 'IssuesListView',

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
            <div class="title"><a href="{{! it.$url('show') }}">{{! issue.title }}</a> <span class="nr">(#{{! issue.number }})</span></div>
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

Note that for the `loading` style, we are using an animated gif downloaded from [ajaxload](http://www.ajaxload.info/). Feel free to download one of these animated gifs and adjust the `issues.loading` css class.   
The gif is located within the `img` folder within the module. If for some reason, this asset is shared across the application, you can locate it whenever you feel appropriate (e.g.: in the Application `assets/img` folder).


## Issues details


[1] Sublime!
[2]