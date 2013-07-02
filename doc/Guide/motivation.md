# Motivation

Even though frontend development has come a long way, and there are some good solutions out there, there are two main approaches:

1. Go "light", use a thin framework, that gives you a lot of flexibility, but ultimately leaves you responsible for some tedious, repetitive, and complex tasks.

2. Go "enterprise", use some solution that gives you a lot with no effort, and find yourself fighting the framework, trying to customise something.

Not being happy with this, and taking advantage of our experience, we set out to build a framework that would solve these issues, and a few more that were bugging us. The main drive of the framework is to help developers build solid applications faster, without that bitter-sweet feeling the development simplicity will eventually turn into a nightmare of unmaintainable code due to undocumented framework compromises or even bad options by the developer.

So, without getting too deep in the details, what makes `SpoonJS` a 3rd option?

It's an `HMVC` framework, the "H" stands for hierarchical. Unlike other frameworks, that organise the files depending on the file extension, `SpoonJS` structures the project semantically, in terms of what feature the module accomplishes in the application. What this means is that the project is composed of modules, and the modularity can be seen both in the implementation, and project organisation.
