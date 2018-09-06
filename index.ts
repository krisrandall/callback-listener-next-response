/*

Callback Listner is a class with one method, nextResponse

*/

import {Server} from 'http'
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'

const cbListnerApp = new Koa()
let cbServer: Server

export default class CallbackListener {

    constructor(port: number) {

        this.port = port
        this.receivedResponses = []
        this.expectedResponsesCallbacks = []

        cbListnerApp.use(bodyParser())
        cbListnerApp.use((ctx) => { // when any request is received by the listener
            this._callbackResponseReceived(ctx)
            ctx.status = 200
        })
        cbServer = cbListnerApp.listen(port)

        console.log(`\Listening on ${port}`)

    }

    public _callbackResponseReceived(ctx) {

        if (this.expectedResponsesCallbacks.length > 0) {
            const callbackToRun = this.expectedResponsesCallbacks.shift()
            callbackToRun(ctx)
        } else {
            this.receivedResponses.push(ctx)
        }
    }

    public nextResponse() {

        return new Promise(async (resolve: Function, reject: Function) => {

            if (this.receivedResponses.length > 0) {
                resolve(this.receivedResponses.shift())
            } else {
                // register JS callback, and the callback function here does the resolve
                this.expectedResponsesCallbacks.push((ctx) => {
                    resolve(ctx)
                })
            }

        })
    }

    public stop() {
        cbServer.close()
    }

}
