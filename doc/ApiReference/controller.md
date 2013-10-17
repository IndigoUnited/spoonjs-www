# Controller

Extends [Joint]() class.

A controller is a node in the hierarchy that exposes a module.   
A module is a self contained unit that encapsulates a limited set of functionality.
Whenever you want to use a module, you do so by instantiating its controller.

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

// Instantiation example
define(['path/to/MyController'], function (MyController) {
    var myCtrl = new MyController();
    //..
});
```


## controller._states

`protected property` *_states*

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

`protected property` *_defaultState*

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

When the `state` is a string, you can reference ancestors states relatively and absolutely.   
Note that this will work work if those states are registered in the `StateRegistry`.   
Read the example below.

**Parameters**

|                    |          |                                                              |
| ------------------ | -------- | ------------------------------------------------------------ |
| state (optional)   | String   | The state name.                                              |
| params (optional)  | Object   | The state params to be used if the state is a string.        |
| options (optional) | Object   | The options.                                                 |

**Returns**

Controller - The instance itself to allow chaining.


```js
define(['spoon/Controller'], function (Controller) {
    var MyController = Controller.extend({
        _states: {
            'index': 'index',
            'show(id)': 'show'
        },

        index: function () {
            //..
        },

        show: function (state) {
            console.log('To be done');

            // Change the state referencing a local state
            this.setState('index');

            // You can also reference a state relatively or absolutely
            // While this might be useful in some situations, avoid using it since your module
            // is no longer self contained and easily reusable

            // Will change the global state to the parent's home state
            this.setState('../home');
            // Will change the global state to the root controller's home state
            this.setState('/home');
        }
    });

    return MyController;
});
```

## controller.delegateState()

`public method` _delegateState(state)_

Delegates a state to be handled by the controller.


**Parameters**

|                    |          |                                                              |
| ------------------ | -------- | ------------------------------------------------------------ |
| state (optional)   | ...mixed | The state parameter bag or instance                          |

**Returns**

Controller - The instance itself to allow chaining.


```js
define(['spoon/Controller'], function (Controller) {
    var MyController = Controller.extend({
        _states: {
            'index': 'index',
            'edit(id)': 'edit'
        },

        index: function () {
            //..
        },

        edit: function (state) {
            if (this._editModule) {
                this._editModule.destroy();
            }

            this._editModule = new EditModuleController();
            // Delegate the state to to the child controller
            // Note that the state argument is the state parameter bag that
            // contains not only the state parameters but also additional data
            // about the state itself used internally by the framework
            this._editModule.delegateState(state);
        }
    });

    return MyController;
});
```


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


```js
define(['spoon/Controller'], function (Controller) {
    var MyController = Controller.extend({
        _states: {
            'show(id)': 'show'
        },

        show: function (state) {
            console.log('URL for my state is:', this.generateUrl('show', { id: state.id }));
            //..
        }
    });

    return MyController;
});
```
