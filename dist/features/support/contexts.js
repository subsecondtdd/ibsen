"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ActorHasSaid(actorName, message) {
    return function (chatApp) { return chatApp.say(actorName, message); };
}
exports.ActorHasSaid = ActorHasSaid;
//# sourceMappingURL=contexts.js.map