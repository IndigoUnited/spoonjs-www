# Sample application

The following guide aims to implement an application partially. The application is named `repo-browser` and is a tool to browse `GitHub` repositories.
While some areas of the application won't be implemented, they will still be scaffolded and left empty.

Below are the mock ups of the application that we will implement:

![Home](http://f.cl.ly/items/021T130I1W0E2A353X17/home.png)

The user types in `org/repo` clicks the arrow button and enters the repo-browser of the specified directory.
By default, the selected menu should be `CODE`.


![Issues](http://f.cl.ly/items/0K0q1y2t0U21330S2q1u/issues.png)

If the user selects issues, a list of the repository issues is listed. If one gets clicked the issue details is shown.


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
], function (View, $, Handlebars, tmpl) {
    //..
});
```


As explained above, the `ApplicationController` is already rendering a `HomeView`.
If you open it in your favorite editor[2], you will see that its rendering a `Handlebars` template. While this is the default template engine chosen for the scaffold process, you can change it to whatever you want. The `_template` property expects a function that outputs an HTML string or a DOM element.

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
To create a module, you can also use the `CLI` with `spoon module create <name>`. For the name field, type in `content`. The generated module comes with a controller, a view and a few assets.

If you analyse the second mockup carefully, you can identify two separate areas: the menu on the left and the current menu item being shown on the right.
We can easily structure our app thanks to the hierarchical states. In this case, our generated `ContentController` will have a state for each menu on the left.
In each state, we will ensure that the selected menu is the correct use a view or another module to setup the selected content on the right side.

In this case, we will create a module for each menu item:

- `spoon module create Content/Code`
- `spoon module create Content/Issues`
- `spoon module create Content/Tags`
- `spoon module create Content/History`

Now lets setup the `ContentController` states as describe above:



Before handling the upcast event lets create the state that will be used to show the `inner` application interface that has the menu and the content.

To create a module, you can also use the `CLI` with `spoon module create <name>`. For the name field, type in `Content/Issues`. This will create a module named `Issues` in the `src/Content` folder. The generated module comes with a controller, a view and a few assets.

If you open up the `IssuesController` in your editor, you will see that it comes with just one state, the `index` one. It simply instantiates and renders the `IssuesView`, that is associated with the `assets/tmpl/issues.html`.

First, open up the `issues.html` template and type something there so we can see some stuff being rendered. Next, let's connect the `ApplicationController` to this new module.

[1] Sublime!
[2]