# Controller

Controller abstract class.
Extends Joint abstract class.



## getState()
`public method` _getState()_

Get the current state or null if none is set.

**Returns**   
State - The state.


## setState()
`public method` _setState([state], [params], [options])_

Sets the current state.
If the state is the same, nothing happens.

**Parameters**:
state:...mixed (optional) - The state name, the state parameter bag or a state instance.   
params:Object (optional) - The state params to be used if the state is a string.   
options:Object (optional) - The options.

**Returns**   
Controller - The instance itself to allow chaining.


## generateUrl()
`public method` _generateUrl(state, [params])_

Generates an URL for a state.

**Parameters**   
state:String - The state name.   
params:Object (optional) - The state params.

**Returns**   
String - The generated URL.
