# Controller

Extends [Joint]() class.

A controller is a node in the hierarchy that exposes a module.   
A module is a self contained unit that encapsulates a limited set of functionality.
Whenever you want to use a module, you do so by instantiating its controller.

Its main roles are:

- Control the module flow, in terms of what is currently being shown to the user

  This is typically done with controller states, each one maps to an action being shown/performed.
  The controller is free to instantiate the necessary views or even other modules, linking them to itself so that events flow upon the hierarchy.

- Listens for the view events and acts upon them, either transitioning to a new state, requesting data or something else

- Passes the data necessary for its view(s) in order to represent the data (model) visually.

  Note that the data may be manipulated according to what the view expects it to be

Since this class is `abstract` it's meant to be extended and not used directly.
Please read below to know how to extend it.



## controller.initialize()

`constructor`

The controller constructor has no arguments.   
Though, when a controller is responsible for an isolated feature/functionality that requires a DOM element,
it's good practice to declare it in the constructor.

Note that all child classes should call this method.


```js
define(['spoon/Controller'], function (Controller) {
    var MyController = Controller.extend({
        //..
        initialize: function () {
            Controller.call(this);
        },
        //..
    });

    return MyController;
});

// instantiation example
define(['path/to/MyController'], function (MyController) {
    var myCtrl = new MyController();
    //..
});
```


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

**Parameters**

|                    |          |                                                              |
| ------------------ | -------- | ------------------------------------------------------------ |
| state (optional)   | ...mixed | The state name, the state parameter bag or a state instance. |
| params (optional)  | Object   | The state params to be used if the state is a string.        |
| options (optional) | Object   | The options.                                                 |

**Returns**

Controller - The instance itself to allow chaining.


## controller.generateUrl()

`public method` _generateUrl(state, [params])_

Generates an URL for a state.

**Parameters**

|                   |        |                   |
| ----------------- | ------ | ----------------- |
| state             | String | The state name.   |
| params (optional) | Object | The state params. |

**Returns**

String - The generated URL.
