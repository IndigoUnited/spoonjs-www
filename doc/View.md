# View

View abstract class.
Extends Joint abstract class.

## API

### View()
`constructor`

**Parameters**   
element:Element (optional) - The DOM element for the view, defaults to document.body.

### getElement()
`public method` _getElement()_

Returns the view's element.

**Returns**
Element - The view's element.

### appendTo()
`public method` _appendTo(target, [within])_

Convenience method to append the element's view to a target.
The target can be another view, a DOM element or a CSS selector.
If the target is another view, an additional selector can be passed to specify the element where it will get appended.

**Parameters**
target:Element|String|View - The target.
within:String (optional) - The selector in case the target is a view.

**Returns**
View - The instance itself to allow chaining.

### prependTo()
`public method` _prependTo(target, [within])_

Convenience method to prepend the element's view to a target.
The target can be another view, a DOM element or a CSS selector.
If the target is another view, an additional selector can be passed to specify the element where it will get appended.

**Parameters**
target:Element|String|View - The target.
within:String (optional) - The selector in case the target is a view.

**Returns**
View - The instance itself to allow chaining.

### render()
`public method` _render(data)_

Renders the declared template with the supplied data.
Note that if this view is not yet linked to its parent, it will make the view listen to the declared DOM events, and also manage its descendants uplinked DOM events.

**Parameters**
data:Object|Array (optional) - The data to pass to the template.

**Returns**
View - The instance itself to allow chaining.

### clear()
`public method` _clear()_

Clears the view's element.
Note that you must explicitly call unlisten() to remove the DOM event listeners.

**Returns**
View - The instance itself to allow chaining.

### _listen()
`protected method` __listen(events)_

Listen to events.

**Parameters**
events:Object - An object with the events.

**Returns**
Object - The same object.

### _unlisten()
`protected method` __unlisten(events)_

Unlistens to events.

**Parameters**
events:Object - An object with the events.

**Returns**
Object - The same object.

### _generateUrl()
`protected method` __unlisten(events)_

Generates an URL.

**Parameters**
state:String - The state name.
params:Object (optional) - The state params.

**Returns**
String - The generated URL.

### _getController()
`protected method` __getController()_

Get the controller responsible for the view.
The view will be interpreted as the function context, so call this method with .call(view).

**Returns**
Controller - The view's controller.

### _fillHelpers()
`protected method` __fillHelpers()_

Fills a target with helpers to be used in the templates.

**Parameters**
target:Object|Array - The target to be filled.

**Returns**
Object|Array - The same target with the filled helpers.

### _eventsSplitter
`protected constant` _eventsSplitter

Events splitter regular expression.

## License

Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php).