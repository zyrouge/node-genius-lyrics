"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("./Constants");
const Utils_1 = __importDefault(require("./Utils"));
const Client_1 = __importDefault(require("./Artists/Client"));
const Client_2 = __importDefault(require("./Songs/Client"));
class Client {
    constructor(key, config = {}) {
        if (key && typeof key !== "string")
            throw new Error(Constants_1.Constants.INV_TOKEN);
        if (!Utils_1.default.checkConfig(config))
            throw new Error(Constants_1.Constants.INV_CONFIG_OBJ);
        this.key = key || undefined;
        this.config = config;
    }
    setKey(key) {
        this.key = key;
    }
    get songs() {
        return new Client_2.default(this.key, this.config);
    }
    get artists() {
        return new Client_1.default(this.key, this.config);
    }
}
exports.default = Client;
