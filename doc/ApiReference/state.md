# State

State class.

## State()
`constructor` _State(name, [params])_

Special parameters can be prefixed with $.
Those will not be taken into account in the comparisons.

**Parameters**
name:String - The state name.
params:Object (optional) - The state parameters.


## getFullName()
`public method` _getFullName()_

Get the full state name.

**Returns**
String - The full state name.


## setFullName()
`public method` _setFullName(name)_

Sets the full state name.

**Parameters**
name:String - The full state name.

**Returns**
State - The instance itself to allow chaining.


## getName()
`public method` _getName()_

Get the state name (the name imediatly after the current cursor position).

**Returns**
String - The name.


## getParams()
`public method` _getParams()_

Get the state parameters.

**Returns**
Object - The state parameters.


## setParams()
`public method` _setParams(params)_

Set the state parameters.

**Parameters**
params:Object - The state parameters.

**Returns**
State - The instance itself to allow chaining.


## next()
`public method` _next()_

Advance the cursor position.
Note that the cursor is allowed to move forward to the last position, so that getName() returns null.

**Returns**
State - The instance itself to allow chaining.


## previous()
`public method` _previous()_

Recede the cursor position.

**Returns**
State - The instance itself to allow chaining.


## getCursor()
`public method` _getCursor()_

Get the current cursor position.

**Returns**
Number - The cursor position.


## setCursor()
`public method` _setCursor(cursor)_

Sets the current cursor position.

**Parameters**
cursor:Number - The new position.

**Returns**
State - The instance itself to allow chaining.



