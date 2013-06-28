# Route

Route class.

**Parameters**

|                        |        |                                             |
| ---------------------- | ------ | ------------------------------------------- |
| name                   | String | The name.                                   |
| pattern                | String | The pattern                                 |
| constraints (optional) | Object | The constraints to apply to the parameters. |


## route.getName()

`public method` _getName()_

Get the route name.

**Returns**

- String - The route name.


## route.test()
`public method` _test(url)_

Tests the route against an URL.

**Parameters**

|     |        |                           |
| --- | ------ | ------------------------- |
| url | String | The URL to check against. |

**Returns**

- Boolean - True if it matches, false otherwise.


## route.match()

`public method` _match(url)_

Similar to test but returns an object with all the placeholders filled in.
If the URL doesn't match against the route, null is returned.

**Parameters**

|     |        |                           |
| --- | ------ | ------------------------- |
| url | String | The URL to match against. |

**Returns**

- Object - The object containing all the matches, or null if it doesn't match.


## route.generateUrl()
`public method` _generateUrl([params])_

Generates an URL for this route.

**Parameters**

|                   |        |                                          |
| ----------------- | ------ | ---------------------------------------- |
| params (optional) | Object | An object containg the route parameters. |

**Returns**

- String - The URL.

