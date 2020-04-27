https://github.com/netlify/cli/blob/master/docs/netlify-dev.md#netlify-functions

```
# with prompting
netlify functions:invoke # we will prompt you at each step
netlify functions:invoke myfunction # invoke a specific function
netlify functions:invoke --name myfunction # invoke a specific function

# no prompting (good for CI)
netlify functions:invoke --name myfunction --identity # invoke a specific function with netlify identity headers
netlify functions:invoke --name myfunction --no-identity # invoke a specific function without netlify identity headers

# sending payloads
netlify functions:invoke myfunction --payload '{"foo": 1}'
netlify functions:invoke myfunction --querystring "foo=1"
netlify functions:invoke myfunction --payload "./pathTo.json"
```
