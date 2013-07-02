# Folder structure


Most frameworks out there organise projects in terms of file extension and, although simple, it makes it hard to have reusable components, and maintain big projects. This is one aspect in which Spoon.js stands out, organising the project files in a feature oriented fashion.

Please check below a typical project file structure (note that a few files are omitted for simplicity, like favicon files, among others).

```
app/
    config/
        config.js          // base project configurations
        config_dev.js      // you can have separate configurations for separate environments. In order to use different configs, would load a different file in the index.html file
        config_prod.js
    states.js              // states to routes configuration
    bootstrap.js           // the script that boots the application
    loader.js              // file that setups the AMD loader
components/                // external dependencies, managed by Bower
    spoonjs
    events-emitter
    ...
tasks/                                  // place where useful tasks live
    generators/                         // you can change the generators to tweak the scaffolding process when using the CLI
        module_create.js
        controller_create.js
        view_create.js
        ...
    server.js
    build.js
    install.js
src/                 // this is where your application code lives
    Application/     // the main module
        assets/      // this is the ideal place for placing CSS files, images, templates, or anything else you feel appropriate
                     // note that each module has its own assets folder. When deciding where to put a specific asset, you should try to put it in a common ancestor of all the modules that use that asset. If an asset is used project-wide, you should probably place it in the Application assets.
            css/
            img/
            tmpl/
        ApplicationController.js    // the root controller (can be changed in the bootstrap file)
        ApplicationView.js
    Content/                        // this folder only has modules within it, but it not a module by itself. You can create these folders if it helps you organise the project
        Articles/
            assets/
                css/
                img/
                tmpl/
            ArticleDetailsView.js
            ArticlesController.js
            ArticlesListView.js
        Help/
            assets/
                css/
                img/
                tmpl/
            HelpController.js
            HelpView.js
        Home/
            assets/
                css/
                img/
                tmpl/
            HomeController.js
            HomeView.js
    Footer/
        assets/
            css/
            img/
            tmpl/
        FooterController.js
        FooterView.js
    Header/
        assets/
            css/
            img/
            tmpl/
        HeaderController.js
        HeaderView.js
    Menu/
        assets/
            css/
            img/
            tmpl/
        MenuController.js
        MenuView.js
web/
    index_dev.html   // the project root HTML file (dev environment)
    index_prod.html  // the project root HTML (prod environment)
    favicon.ico
    …                // other files, such as robots.txt, etc
```


As you can see, each project is composed of modules, which in their turn can be composed of other modules. Each module should have a very clear responsibility within the project, thus avoiding spaghetti code.

The correlation between the module purpose and the file structure makes it really simple to understand where a module lives within a project, and what composes it.

Still, when dealing with reusable modules, that could show up in several places in the application, you can place the module wherever you feel the right place is. Ultimately, this is a developer's choice.

Since there is a clear separation of responsibilities, some modules might end up with some option that they don't know how to handle, and need to delegate that responsibility to another module. Since a module do not hold references to its parent, it upcast events, delegating the responsibility to its parent, or even broadcast events, and the whole project will listen to it.
