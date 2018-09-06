
const CallbackListener = require('../index.js').default

async function doIt() {
	const l = new CallbackListener( 5123 )
console.log(l)
	const callbackResponse = await l.nextResponse()
	console.log(callbackResponse)
	console.log(`\n${JSON.stringify(callbackResponse.request.body)}\n`)
	l.stop()
};

doIt()


