# View

Extends [Joint]() class.

A view is a node in the hierarchy that has the role to display data (model) visually.   
The view is free to instantiate other sub-views and link them to itself so that events flow upon the hierarchy.


## view.initialize()

`constructor`

All views need an DOM element to work on.   
This element can be passed in the view constructor.
If none is passed, one will generated according to the `_element` property.

Note that all child classes should call this method.

Since this class is `abstract` it's meant to be extended and not used directly.
Please read below to know how to extend it.

**Parameters**

|                    |         |                               |
| ------------------ | ------- | ----------------------------- |
| element (optional) | Element | The DOM element for the view. |



```js
define(['spoon/View'], function (MyView) {
    var MyView = View.extend({
        //..
        initialize: function () {
            View.call(this);
        },
        //..
    });

    return MyView;
});

// Instantiation example
define(['path/to/MyView'], function (MyView) {
    var myView = new MyView();
    //..
});
```


## view._element

`protected property` _element

A CSS selector used to build an element for the view in case one is not passed to the constructor.   
Defaults to `div`.


```js
_element: 'li.item'

// More complex element
_element: 'div#main-view[data-foo="bar"]'
```


## view._template

`protected property` _template

A function that generates an HTML string or an Element.   
If set, the `render()` method will call this function with the supplied data.   
Defaults to `null`.


```js
// Handlebars example
_template: Handlebars.compile('<div>{{name}}</div>')

// doT example
_template: doT.template('<div>{{=name}}</div>')
```


## view._events

`protected property` _events

An object where keys are event selectors and values the functions to run when the event occurs.

```js
_events: {
    'click .delete': '_onDeleteClick',
    'submit form': '_onSubmit',
    'mouseenter .pic': function (event, element) {
        // event is the jquery event
        // element is the jquery wrapped element
    }
}
```


## view.getElement()

`public method` _getElement()_

Returns the view's element.

**Returns**

Element - The view's element.


## view.appendTo()

`public method` _appendTo(target, [within])_

Convenience method to append the element's view to a target.
The target can be another view, a DOM element or a CSS selector.
If the target is another view, an additional selector can be passed to specify the element where it will get appended.

**Parameters**

|                   |                     |                                            |
| ----------------- | ------------------- | ------------------------------------------ |
| target            | Element/String/View | The target.                                |
| within (optional) | String              | The selector in case the target is a view. |

**Returns**

View - The instance itself to allow chaining.


```js
// Append to an element referenced by a CSS selector
var myView = new MyView();
myView.appendTo('#content');

// Append to another view
// parentView is a reference to another view
var childView = new ListItemView();
myView.appendTo(parentView);

// Append to another view, inside a specific element of it
var childView = new ListItemView();
myView.appendTo(parentView, '.container');
```

## view.prependTo()

`public method` _prependTo(target, [within])_

Convenience method to prepend the element's view to a target.
The target can be another view, a DOM element or a CSS selector.
If the target is another view, an additional selector can be passed to specify the element where it will get appended.

**Parameters**

|                   |                     |                                            |
| ----------------- | ------------------- | ------------------------------------------ |
| target            | Element/String/View | The target.                                |
| within (optional) | String              | The selector in case the target is a view. |


Please read the [appendTo()]() example as its signature is the same.


**Returns**

View - The instance itself to allow chaining.


## view.render()

`public method` _render(data)_

Renders the declared template with the supplied data.   
The passed data will be feed into the template function.

**Parameters**

|                 |              |                                                      |
| --------------- | ------------ | ---------------------------------------------------- |
| data (optional) | Object/Array | The data to pass to the template (defaults to `{}`). |

**Returns**

View - The instance itself to allow chaining.


```js
var myView = new MyView();
myView.appendTo('#content');
myView.render({
    name: 'Indigo United',
    email: 'hello@indigounited.com'
});
```


## view.clear()

`public method` _clear()_

Clears the view's element.   
Note that you must explicitly call [_unlisten()]() to remove the DOM event listeners.

**Returns**

View - The instance itself to allow chaining.


## view._listen()

`protected method` __listen(events)_

Listen to a set of events.


**Parameters**

|        |        |                                                                 |
| ------ | ------ | --------------------------------------------------------------  |
| events | Object | An object with the events (defaults to the declared `_events`). |

**Returns**

Object - The same object.

```js
define(['spoon/View'], function (MyView) {
    var MyView = View.extend({
        //..
        _events: {
            'click .btn-enable': '_onEnableClick',
            'click .btn-disable': '_onDisableClick'
        },

        _enabledEvents: {
            'click .btn-save': '_onSave',
        },

        _onEnableClick: function () {
            this._listen(this._enabledEvents);
        },

        _onDisableClick: function () {
            this._unlisten(this._enabledEvents);
        },

        _onSave: function () {
            this._upcast('save', { /*.. */ });
        }
    });

    return MyView;
});


```

## view._unlisten()

`protected method` __unlisten(events)_

Unlistens to events.   
Note that the exact same object reference passed to [_listen()]() must be used.

**Parameters**

|        |        |                            |
| ------ | ------ | -------------------------- |
| events | Object | An object with the events. |

**Returns**

Object - The same object.

Please read the [_listen()]() for an usage example.
