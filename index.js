"use strict";
/*

Callback Listner is a class with one method, nextResponse

*/
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cbListnerApp = new Koa();
let cbServer;
class CallbackListener {
    constructor(port) {
        this.port = port;
        this.receivedResponses = [];
        this.expectedResponsesCallbacks = [];
        cbListnerApp.use(bodyParser());
        cbListnerApp.use((ctx) => {
            this._callbackResponseReceived(ctx);
            ctx.status = 200;
        });
        cbServer = cbListnerApp.listen(port);
        console.log(`\Listening on ${port}`);
    }
    _callbackResponseReceived(ctx) {
        if (this.expectedResponsesCallbacks.length > 0) {
            const callbackToRun = this.expectedResponsesCallbacks.shift();
            callbackToRun(ctx);
        }
        else {
            this.receivedResponses.push(ctx);
        }
    }
    nextResponse() {
        return new Promise(async (resolve, reject) => {
            if (this.receivedResponses.length > 0) {
                resolve(this.receivedResponses.shift());
            }
            else {
                // register JS callback, and the callback function here does the resolve
                this.expectedResponsesCallbacks.push((ctx) => {
                    resolve(ctx);
                });
            }
        });
    }
    stop() {
        cbServer.close();
    }
}
exports.default = CallbackListener;
//# sourceMappingURL=index.js.map
