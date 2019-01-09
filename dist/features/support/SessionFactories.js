"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ApiChatSession_1 = __importDefault(require("../src/client/ApiChatSession"));
var DomChatSession_1 = __importDefault(require("./DomChatSession"));
var Home = {
    ApiSession: function (actorName, api) { return new ApiChatSession_1.default(actorName, api); },
    DomSession: function (actorName, $root, api) { return new DomChatSession_1.default(actorName, $root); }
};
exports.Home = Home;
//# sourceMappingURL=SessionFactories.js.map