# StateRegistry

StateRegistry class.

## stateRegistry.setAddress()

`public method` _setAddress([address])_

Sets the address.

**Parameters**

|                    |         |                                         |
| ------------------ | ------- | --------------------------------------- |
| address (optional) | Address | The address to set or null to unset it. |

**Returns**

- StateRegistry - The instance itself to allow chaining.


## stateRegistry.unsetAddress()

`public method` _unsetAddress()_

Unsets the address.

**Returns**

- StateRegistry - The instance itself to allow chaining.


## stateRegistry.parse()

`public method` _parse([route])_

Parses a given route.
If no route is passed, the current address value is used.
If a state is found for the route and is different from the current one, a transition
will occur and the change event will be emitted.

This function is handy to kick-off the state registry.

**Parameters**

|                  |        |                           |
| ---------------- | ------ | ------------------------- |
| route (optional) | String | The route (URL fragment). |

**Returns**

- StateRegistry - The instance itself to allow chaining.


## stateRegistry.register()

`public method` _register(state, [pattern], [constraints])_

Registers a map between a state and a route.
The pattern can have placeholders which will be used to fill a parameters object.
The constraints object is a simple key value object in which the keys are the placeholder names and the values are regular expressions.
An error will be thrown if the state being registered already exists.

**Parameters**

|                        |        |                       |
| ---------------------- | ------ | --------------------- |
| state                  | String | The state.            |
| pattern (optional)     | String | The route pattern.    |
| constraints (optional) | Object | The route contraints. |

**Returns**

- StateRegistry - The instance itself to allow chaining.


## stateRegistry.unregister()

`public method` _unregister(state)_

Unregisters a state.

**Parameters**

|       |        |            |
| ----- | ------ | ---------- |
| state | String | The state. |

**Returns**

- StateRegistry - The instance itself to allow chaining.


## stateRegistry.unregisterAll()

`public method` _unregisterAll()_

Unregisters all the registered states.

**Returns**

- StateRegistry - The instance itself to allow chaining.


## stateRegistry.isRegistered()

`public method` _isRegistered(state)_

Checks if a state is registered.

**Parameters**

|       |        |            |
| ----- | ------ | ---------- |
| state | String | The state. |

**Returns**

- Boolean - True if it is, false otherwise.


## stateRegistry.isRoutable()

`public method` _isRoutable(state)_

Checks if state is registered and has a route associated to it.

**Parameters**

|       |        |            |
| ----- | ------ | ---------- |
| state | String | The state. |

**Returns**

- Boolean - True if it is, false otherwise.


## stateRegistry.isValid()

`public method` _isValid(state)_

Checks if a given state name is valid.

**Parameters**

|       |        |            |
| ----- | ------ | ---------- |
| state | String | The state. |

**Returns**

- Boolean - True if valid, false otherwise.


## stateRegistry.setCurrent()

`public method` _setCurrent(state, [params], [options])_

Sets the current state.
If the state is not the same, the change event will be emited.
Also if the state has a route associated and the routing is enabled, the browser URL will be updated accordingly.

The default implementation should handle these options:

|            |                                                                         |
| ---------- | ----------------------------------------------------------------------- |
| - force:   | true to force the value to be changed even if the value is the same     |
| - route:   | false to not change the address value                                   |
| - replace: | true to replace the address value instead of adding a new history entry |

**Parameters**

|                    |              |                                                 |
| ------------------ | ------------ | ----------------------------------------------- |
| state              | String/State | The state name or the state object.             |
| params (optional)  | Object       | The state parameters if the state was a string. |
| options (optional) | Object       | The options                                     |

**Returns**

- Boolean - True if the transition was made, false otherwise.


## stateRegistry.getCurrent()

`public method` _getCurrent()_

Returns the current state.

**Returns**

- State - The state.


## stateRegistry.isCurrent()

`public method` _isCurrent(state, [params])_

Check if the current state is the same as the passed one.

**Parameters**

|                    |              |                                                 |
| ------------------ | ------------ | ----------------------------------------------- |
| state              | String/State | The state name or the state object.             |
| params (optional)  | Object       | The state parameters if the state was a string. |

**Returns**

- Boolean - True if it is, false otherwise.


## stateRegistry.generateUrl()

`public method` _generateUrl(state, [params], [absolute])_

Generates an URL for a given state.
If no route is associated with the state, a state:// URL will be generated.

**Parameters**

|                     |              |                                                         |
| ------------------- | ------------ | ------------------------------------------------------- |
| state               | String/State | The state name or the state object.                     |
| params (optional)   | Object       | The state parameters if the state was a string.         |
| absolute (optional) | Boolean      | True to only generate an absolute URL, false otherwise. |

**Returns**

- String - The URL for the state or null if unable to generate one.


## stateRegistry.destroy()

`public method` _destroy()_

Destroys the instance.


## stateRegistry._createStateInstance()

`protected method` __createStateInstance(state, [params])_

Creates a new state instance.

**Parameters**

|                   |        |                                                 |
| ----------------- | ------ | ----------------------------------------------- |
| state             | String | The state name.                                 |
| params (optional) | Object | The state parameters if the state was a string. |

**Returns**

- State - The state instance.


## stateRegistry._postChangeHandler()

`protected method` __postChangeHandler(previousState, options)_

Handles stuff after the state has changed.

**Parameters**

|               |        |                     |
| ------------- | ------ | ------------------- |
| previousState | State  | The previous state. |
| options       | Object | The options.        |


## stateRegistry._onChange()

`protected method` __onChange(obj)_

Handles the address change event.

**Parameters**

|     |        |                                                   |
| --- | ------ | ------------------------------------------------- |
| obj | Object | The address object containing the change details. |


## stateRegistry._handleLinkClick()

`protected method` __handleLinkClick(event, [el])_

Handles the click event on links.

**Parameters**

|               |         |                  |
| ------------- | ------- | ---------------- |
| event         | Event   | The click event. |
| el (optional) | Element | The link tag.    |


## stateRegistry._onDestroy()

`protected method` __onDestroy()_

Releases any listeners and resources.
This method is called only once after a destroy several call.

See [destroy]() method.