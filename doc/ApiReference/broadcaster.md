# Broadcaster

`service`

A service responsible to broadcast events.   
Whenever `_broadcast()` on a `Joint` is called, this service will be responsible to deliver it
to every node in the hierarchy.

The service maybe be accessed by requiring `services/broadcaster`.   
You can replace this service by your own if it obeys the public interface.


```js
define(['services/broadcaster'], function (broadcaster) {
    //..
});

```


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

Broadcaster - The instance itself to allow chaining.


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

Broadcaster - The instance itself to allow chaining.


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

|                  |          |                 |
| ---------------- | -------- | --------------- |
| event (optional) | String   | The event name. |
| args (optional)  | ...mixed | The listener.   |

**Returns**

Boolean - True if the event was handled by at least one listener, false otherwise.
