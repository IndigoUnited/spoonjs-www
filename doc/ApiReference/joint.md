# Joint

A Joint is a base class that all components considered a node in the hierarchy extend from.
Its functionality can be resumed to:

- Link and unlink other node to form the hierarchy
- Ability to listen and emit events to/from linked nodes or descendants
- Ability to listen and emit events to/from all nodes in the hierarchy (flood/broadcast)


## join.initialize()

Method called when instantiating a Joint.   
Since this class is `abstract`, it's meant to be extended and not used directly.


## joint.on()

`public method` _on(event, fn, [context])_

Adds a listener for an upcast or broadcast event.   
Duplicate listeners for the same event will be discarded.

**Parameters**

|                    |          |                                                                             |
| ------------------ | -------- | --------------------------------------------------------------------------- |
| event              | String   | The event name.                                                             |
| fn                 | Function | The handler.                                                                |
| context (optional) | Object   | The context to be used to call the handler, defaults to the joint instance. |

**Returns**

- Joint - The instance itself to allow chaining.


## joint.once()

`public method` _once(event, fn, [context])_

Adds a one time listener for an upcast or broadcast event.   
Duplicate listeners for the same event will be discarded.

**Parameters**

|                    |          |                                                                             |
| ------------------ | -------- | --------------------------------------------------------------------------- |
| event              | String   | The event name.                                                             |
| fn                 | Function | The handler.                                                                |
| context (optional) | Object   | The context to be used to call the handler, defaults to the joint instance. |

**Returns**

- Joint - The instance itself to allow chaining.


## joint.off()

`public method` _off(event, fn, [context])_

Removes a previously added listener.

**Parameters**

|                    |          |                                        |
| ------------------ | -------- | -------------------------------------- |
| event              | String   | The event name.                        |
| fn                 | Function | The handler.                           |
| context (optional) | Object   | The context passed to the on() method. |

**Returns**

- Joint - The instance itself to allow chaining.


## joint.destroy()

`public method` _destroy()_

Destroys the instance, releasing all of its resources.   
Note that all downlinks will also be destroyed.

Internally calls `_onDestroy()` only once, even on consecutive calls to `destroy()`.


## joint._link()

`protected method` __link(joint)_

Creates a link between this joint and another one.

**Parameters**

|       |       |                                    |
| ----- | ----- | ---------------------------------- |
| joint | Joint | Another joint to link to this one. |

**Returns**

- Joint - The joint passed in as the argument.


## joint._unlink()

`protected method` __unlink(joint)_

Removes a previously created link between this joint and another one.

**Parameters**

|       |       |                                    |
| ----- | ----- | ---------------------------------- |
| joint | Joint | Another joint to link to this one. |

**Returns**

- Joint - The instance itself to allow chaining.


## joint._upcast()

`protected method` __upcast(event, [args])_

Fires an event upwards the chain.

**Parameters**:

- event:String - The event name.   
- args:...mixed (optional) - The arguments to pass along with the event.

|                 |          |                                             |
| --------------- | -------- | ------------------------------------------- |
| event           | String   | The event name.                             |
| args (optional) | ...mixed | The arguments to pass along with the event. |

**Returns**

- Joint - The instance itself to allow chaining.


## joint._broadcast()

`protected method` __broadcast(event, [args])_

Fires an event to all the joints.

**Parameters**

|                 |          |                                             |
| --------------- | -------- | ------------------------------------------- |
| event           | String   | The event name.                             |
| args (optional) | ...mixed | The arguments to pass along with the event. |

**Returns**

- Joint - The instance itself to allow chaining.


## joint._onDestroy()

`protected method` __onDestroy()_

Method called by `destroy()`.   
Subclasses should override this method to release additional resources.   
The default implementation will also destroy any linked joints.
