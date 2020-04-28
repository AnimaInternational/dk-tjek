# Issue with relative imports in Netlify functions

I'm trying to share code between functions with netlify dev, but I fail with this error:

> `"Runtime.ImportModuleError: Error: Cannot find module '../../auth'"`

This is the full error:

> `9:05:31 AM: 2020-04-28T07:05:31.221Z undefined ERROR Uncaught Exception {"errorType":"Runtime.ImportModuleError","errorMessage":"Error: Cannot find module '../../auth'\nRequire stack:\n- /var/task/users.js\n- /var/runtime/UserFunction.js\n- /var/runtime/index.js","stack":["Runtime.ImportModuleError: Error: Cannot find module '../../auth'","Require stack:","- /var/task/users.js","- /var/runtime/UserFunction.js","- /var/runtime/index.js"," at _loadUserApp (/var/runtime/UserFunction.js:100:13)"," at Object.module.exports.load (/var/runtime/UserFunction.js:140:17)"," at Object.<anonymous> (/var/runtime/index.js:43:30)"," at Module._compile (internal/modules/cjs/loader.js:1158:30)"," at Object.Module._extensions..js (internal/modules/cjs/loader.js:1178:10)"," at Module.load (internal/modules/cjs/loader.js:1002:32)"," at Function.Module._load (internal/modules/cjs/loader.js:901:14)"," at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:74:12)"," at internal/main/run_main_module.js:18:47"]}`
