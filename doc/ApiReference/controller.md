# Controller

Extends [Joint]() class.


## controller._states

`protected property` _states

An object where keys are states and values the functions to run for that state.

```js
_states: {
    'home': '_homeState',
    'show(id)': '_showState',
    'filter': function (state) {
        // state is a parameter bag
        // also contains additional information used internally
    }
}
```


## controller._defaultState

`protected property` _defaultState

The default state name of the controller, as a `string`.   
Defaults to `index` if the `index` state is declared in `_states.

```js
_defaultState: 'home'
```


## controller.getState()

`public method` _getState()_

Get the current state or null if none is set.

**Returns**   
State - The state.


## controller.setState()

`public method` _setState([state], [params], [options])_

Sets the current state.   
If the state is the same, nothing happens.

**Parameters**:

- state:...mixed (optional) - The state name, the state parameter bag or a state instance.   
- params:Object (optional) - The state params to be used if the state is a string.   
- options:Object (optional) - The options.

**Returns**   
Controller - The instance itself to allow chaining.


## controller.generateUrl()

`public method` _generateUrl(state, [params])_

Generates an URL for a state.

**Parameters**:

- state:String - The state name.   
- params:Object (optional) - The state params.

**Returns**   
String - The generated URL.
