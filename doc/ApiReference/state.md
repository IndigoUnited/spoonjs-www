# State

State class.   
Special parameters can be prefixed with $.
Those will not be taken into account in the comparisons.

**Parameters**

|                   |        |                       |
| ----------------- | ------ | --------------------- |
| name              | String | The state name.       |
| params (optional) | Object | The state parameters. |


## state.getFullName()

`public method` _getFullName()_

Get the full state name.

**Returns**

- String - The full state name.


## state.setFullName()

`public method` _setFullName(name)_

Sets the full state name.

**Parameters**

|      |        |                      |
| ---- | ------ | -------------------- |
| name | String | The full state name. |

**Returns**

- State - The instance itself to allow chaining.


## state.getName()

`public method` _getName()_

Get the state name (the name imediatly after the current cursor position).

**Returns**

- String - The name.


## state.getParams()

`public method` _getParams()_

Get the state parameters.

**Returns**

- Object - The state parameters.


## state.setParams()

`public method` _setParams(params)_

Set the state parameters.

**Parameters**

|        |        |                       |
| ------ | ------ | --------------------- |
| params | Object | The state parameters. |

**Returns**

- State - The instance itself to allow chaining.


## state.next()

`public method` _next()_

Advance the cursor position.
Note that the cursor is allowed to move forward to the last position, so that getName() returns null.

**Returns**

- State - The instance itself to allow chaining.


## state.previous()

`public method` _previous()_

Recede the cursor position.

**Returns**

- State - The instance itself to allow chaining.


## state.getCursor()

`public method` _getCursor()_

Get the current cursor position.

**Returns**

- Number - The cursor position.


## state.setCursor()

`public method` _setCursor(cursor)_

Sets the current cursor position.

**Parameters**

|        |        |                      |
| ------ | ------ | -------------------- |
| cursor | Number | The cursor position. |

**Returns**

- State - The instance itself to allow chaining.


## state.isEqual()

`public method` _isEqual(state, [stateParams])_

Compares the instance to another one.
The state is considered to the same if the name and parameters are the same.
If parameter names are passed, those will be compared.
If no parameter names are passed, all parameters are compared.

**Parameters**

|                        |       |                                             |
| ---------------------- | ----- | ------------------------------------------- |
| state                  | State | The state.                                  |
| stateParams (optional) | Array | An array of parameter names to be compared. |

**Returns**

- Boolean - True if the state is the same, false otherwise.


## state.isFullyEqual()

`public method` _isFullyEqual(state)_

Compares the instance to another one.
The state is considered to be fully equal if the full state name and parameters are the same.

**Parameters**

|            |        |           |
| ---------- | ------ | --------- |
| state      | State  | The state |

**Returns**

- Boolean - True if the state is fully equal, false otherwise.


## state.state.clone()

`public method` _clone()_

Clones the state.

**Returns**

- State - The cloned state.


## state._compareObjects()

`protected method` __compareObjects(obj1, obj2)_

Compares two objects loosely and not recursively.

**Parameters**

|            |        |                                   |
| ---------- | ------ | --------------------------------- |
| obj1       | Object | The first object to be compared.  |
| obj2       | Object | The second object to be compared. |

**Returns**

- Boolean - True if they are loosely equal, false otherwise.


## State.isValid()

`public static method` _State.isValid(name)_

Checks if a given state name is valid.

**Parameters**

|            |        |                |
| ---------- | ------ | -------------- |
| name       | String | The state name |

**Returns**

- Boolean - True if valid, false otherwise.