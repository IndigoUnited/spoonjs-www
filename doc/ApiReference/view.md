# View

Extends [Joint]() class.

All views need an element to work on.   
This element can be passed in the view constructor. If none is passed, one will generated according to the `_element` property.

**Parameters**

|                    |         |                               |
| ------------------ | ------- | ----------------------------- |
| element (optional) | Element | The DOM element for the view. |


## view._element

`protected property` _element

A CSS selector used to build an element for the view in case one is not passed to the constructor.   
Defaults to `div`.


```js
_element: 'li.item'
```

```js
_element: 'div#main-view[data-foo="bar"]'
```


## view._template

`protected property` _template

A function that generates an HTML string or an Element.   
If set, the `render()` method will call this function with the supplied data.   
Defaults to `null`.


```js
_template: Handlebars.compile('<div>{{name}}</div>')
```

```js
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

- Element - The view's element.


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

- View - The instance itself to allow chaining.


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

**Returns**

- View - The instance itself to allow chaining.


## view.render()

`public method` _render(data)_

Renders the declared template with the supplied data.
Note that if this view is not yet linked to its parent, it will make the view listen to the declared DOM events, and also manage its descendants uplinked DOM events.

**Parameters**

|                 |              |                                   |
| --------------- | ------------ | --------------------------------- |
| data (optional) | Object/Array | The data to pass to the template. |

**Returns**

- View - The instance itself to allow chaining.


## view.clear()

`public method` _clear()_

Clears the view's element.
Note that you must explicitly call unlisten() to remove the DOM event listeners.

**Returns**

- View - The instance itself to allow chaining.


## view._listen()

`protected method` __listen(events)_

Listen to events.

**Parameters**

|        |        |                            |
| ------ | ------ | -------------------------- |
| events | Object | An object with the events. |

**Returns**

- Object - The same object.


## view._unlisten()

`protected method` __unlisten(events)_

Unlistens to events.

**Parameters**

|        |        |                            |
| ------ | ------ | -------------------------- |
| events | Object | An object with the events. |

**Returns**

- Object - The same object.
