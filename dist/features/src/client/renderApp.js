"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var App_1 = __importDefault(require("./App"));
function default_1($root, chatSession) {
    react_dom_1.default.render(react_1.default.createElement(App_1.default, { chatSession: chatSession }), $root);
}
exports.default = default_1;
//# sourceMappingURL=renderApp.js.map