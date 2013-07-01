# Address

This class serves as a base for both hash and html5 implementations.
Those simply need to implement the abstract functions to work correctly.

This class also handles the clicks in the link tags (<a> tags).
If a link is meant to be a regular link, use the data-url-type="external".
If a link is mean to be an internal link but not handled by this address use data-url-type="internal".
Please note that links with target!="_self" and external urls are in general automatically ignored.
There is also a data-url-force option. When set to true, the value will be changed even if its the current one.

**Parameters**

|                    |        |              |
| ------------------ | ------ | ------------ |
| options (optional) | Object | The options. |


## address.enable()

`public method` _enable()_

Enables the address.

**Returns**

Address - The instance itself to allow chaining.


## address.disable()

`public method` _disable()_

Disables the address.

**Returns**

Address - The instance itself to allow chaining.


## address.getValue()

`public method` _getValue([value])_

Returns the current address value.

**Parameters**

|                  |        |                                                     |
| ---------------- | ------ | --------------------------------------------------- |
| value (optional) | String | A value to be used instead of the address bar value.|

**Returns**

String - The current value.


## address.setValue()

`public method` _setValue(value, [options])_

Sets the address value.
If the resource changed, the change event will be fired (with type internal).

The default implementation should handle these options:

|            |                                                                     |
| ---------- | ------------------------------------------------------------------- |
| - force:   | true to force the value to be changed even if the value is the same |
| - silent:  | true to change the value with firing the change event               |
| - replace: | true to replace the latest history entry instead of appending       |

**Parameters**

|                    |        |                      |
| ------------------ | -----  | -------------------- |
| value              | String | The value to be set. |
| options (optional) | Object | The options.         |

**Returns**

Address - The instance itself to allow chaining.


```js
define(['services/address'], function (address) {

    address.setValue('/', { silent: true });

});
```

## address.reset()

`public method` _reset()_

Resets the internal state of address.
Clears the internal value and any other state.

**Returns**

Address - The instance itself to allow chaining.


## address.generateUrl()

`public method` _generateUrl(value, [absolute])_

Generates an URL based on a given value.
By default the generated URL will be relative unless absolute is true.

**Parameters**

|                     |         |                                                                        |
| ------------------- | ------- | ---------------------------------------------------------------------- |
| value               | String  | The value.                                                             |
| absolute (optional) | Boolean | True to generate an absolute URL, false otherwise (defaults to false). |

**Returns**

String - The generated URL.


```js
define(['services/address'], function (address) {

    address.generateUrl('home');

});
```

## address.destroy()

`public method` _destroy()_

Destroys the instance.