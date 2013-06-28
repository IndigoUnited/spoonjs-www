# Broadcaster

Broadcaster class.


## broadcaster.on()

`public method` _on(event, fn, [context])_

Adds a new event listener.
If the listener is already attached, it won't get duplicated.

**Parameters**

|                    |          |                                                                               |
| ------------------ | -------- | ----------------------------------------------------------------------------- |
| event              | String   | The event name.                                                               |
| fn                 | Function | The listener.                                                                 |
| context (optional) | Object   | The context in which the function will be executed, defaults to the instance. |

**Returns**

- Broadcaster - The instance itself to allow chaining.

## broadcaster.once()

`public method` _once(event, fn, [context])_

Adds a new event listener that is removed automatically afterwards.
If the listener is already attached, it won't get duplicated.

**Parameters**

|                    |          |                                                                               |
| ------------------ | -------- | ----------------------------------------------------------------------------- |
| event              | String   | The event name.                                                               |
| fn                 | Function | The listener.                                                                 |
| context (optional) | Object   | The context in which the function will be executed, defaults to the instance. |

**Returns**

- Broadcaster - The instance itself to allow chaining.

## broadcaster.off()

`public method` _off([event], [fn], [context])_

Removes an existent event listener.
If no fn and context is passed, removes all event listeners of a given name.
If no event is specified, removes all events of all names.

**Parameters**

|                    |          |                                        |
| ------------------ | -------- | -------------------------------------- |
| event (optional)   | String   | The event name.                        |
| fn (optional)      | Function | The listener.                          |
| context (optional) | Object   | The context passed to the on() method. |

## broadcaster.broadcast()

`public method` _broadcast(event, [args])_

Emits a broadcast event.

**Parameters**
event:String - The event name.
args:...mixed (optional) - The arguments to pass to each listener.

|                  |          |                 |
| ---------------- | -------- | --------------- |
| event (optional) | String   | The event name. |
| args (optional)  | ...mixed | The listener.   |

**Returns**

- Broadcaster - The instance itself to allow chaining.