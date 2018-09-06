# Callback Listener - next response

A module that listens on a port and keeps track of each HTTP request it receives, and makes them available via a `.nextResponse()` method

For use especially with creating tests for APIs that utilise a HTTP callback as part of their response mechanism (for when there is asynchronous actions on the server end, like a blockchain transaction being minded for example)


### Basic Usage

```
const CallbackListener = require('callback-listener-next-response')

const listener = new CallbackListener( port )

async () => {
	const callbackResponse = await listener.nextResponse()
}();


```

The properties of the object returned by `nextResponse()` include :   

* `request.body`
* `request.method`

(See [the Koa request object](https://github.com/koajs/koa/blob/master/docs/api/request.md) for more details)


*This module could do with some tidying up, for now you can see how it works by doing the following :*

```node test/test.js```

And in another tab do :

```
curl http://localhost:5123 -X POST --header "hello: API callback listener world" --data "It works"
```
