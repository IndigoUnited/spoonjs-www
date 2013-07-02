# Concepts

## Modular projects

One of the most important philosophies of the framework is modular projects. This means that you organise and build your project around modules that connect and work together to form the application. They are connected hierarchically, forming a tree-like structure. A good analogy is when you are playing with LEGO, where you connect together tiny parts that form blocks that ultimately becomes a real-world object.

But what is a module? A module is a component that is responsible for a specific functionality or role within your application. The more self-contained the module is, the more reusable and easily testable is. This also means that all necessary assets, such as `css`, `images` and `templates`, may also be bundled within the module.


## Controllers

Controllers are typically (but not necessarily) the interface for a module. Having this said, one instantiates a module by instantiating its controller.

Their main responsibility is to:

- Control the module state and flow, in terms of what is currently being shown to the user

  This is done with controller states, each one maps to an action being shown/performed.
  The controller is free to instantiate the necessary views or even other modules, linking them to itself so that events flow upon the hierarchy.

- Listens for the view events and acts upon them, either transitioning to a new state, requesting data or something else

- Passes the data necessary for its view(s) in order to represent the data (model) visually.

  Note that the data may be manipulated according to what the view expects it to be


## Views

Views are used to represent a set of data visually. It may use a template engine to easily construct the HTML representation and to escape data to prevent `XSS` attacks.

Their main responsibility is to:

- Make a visual representation of a set of data (model)

  A view can instantiate sub-views, linking them to itself so that events flow upon the hierarchy

- Listen to DOM events and translate them to meaningful module events

- Manage its DOM element, being entirely responsible for it


## Models

Application Model is a very delicate matter and there simply isn't a one size fits all solution. There are too many approaches on how the model could be implemented, each with its advantage, and the truth is, this shouldn't be in the core of the framework.

Keeping this is mind, `SpoonJS` does not offer a solution for the Model in its core, although it will be providing a few libraries that you could use. This gives you full flexibility on how to implement the Model. You can either use one of the libraries we provide, implement your own, or simply use some SDK that you have been provided.


## Events

There are to type of events in: DOM events and hierarchy events. The DOM events are managed by views and possibly mapped to meaningful hierarchy events.

For the hierarchy events, there's two different model of events:

- Upcast events

Upcasting events is very useful when you need to inform the parent module of something. In case the parent module does not know how to handle that information, it will automatically upcast the event, until a module is able to handle it. In case the event reaches the root module, and is not handled, a warning is issued in the console, making it easy to spot unhandled events.

- Broadcast events

Broadcasting can be particularly useful when you want to inform the whole application that something happened, like "user logged in", which would typically involve changes in several modules.


## States & Routing

One of the most complex tasks that developers face when developing applications is the state management.

The application state can be distributed, since an interface is usually composed of multiple modules, each with its own state. Due to the complexity of some applications, many state-of-the-art frameworks leave this task to the developer, giving him full flexibility over the state management. Unfortunately, these ad-hoc solutions are often poor, many times taking flexibility away, and the developer ultimately is forced to use *dirty hacks*, to make things work together.

`SpoonJS` offers a complete solution for handling state, without losing flexibility. Each controller declaratively specifies which states it can handle, and provides a handler function per state. How the state is actually is handled is completely up to the developer, giving him full control over the application.

The application state can be described by a simple string in the format `/articles.show(172)`. Lets take a closer look at what it means:

- `/` stands for root, meaning this is a full state, and the root controller (typically the Application controller) will be the starting point.
- `.` separates local states, which are handled by the controllers, and get removed from the full state along the handler chain. Note that this state only references two local states, `articles` and `show(172)`, but it can be more complex, like `articles.something.something_else(40,parameter).show(172)`.
- `articles` is the first local state, and the Application controller should have a handler for it, pushing the remaining state, `show(172)`, to whatever controller that should handle it.
- `show(172)` actually stands for the `show` state, with a parameter. When declaring a state, you can provide a list of parameters, and these get fed into the handler.

Another aspect that is usually tightly associated with state management is routing. `SpoonJS` offers a simple routing mechanism that maps the requested URLs to their respective state, and vice-versa. This routing mechanism gives the user full flexibility on what pattern matches a state.
Since your application only know states, you can add the state to routes mapping when you feel opportune to do so.


## Services

`SpoonJS` is built upon services three services: `services/address`, `services/state`, `services/broadcaster`.

You will rarely need to access them directly, but they are there in case you need to. These services are easily replaced in case you need to change
the framework behavior. This gives developers extra flexibility to modify the framework internals. Note that throughout your application, you can build your own services.

Please read the associated [API Reference]() for more details.
