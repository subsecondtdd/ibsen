"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var loc = (typeof window === "object") ? window.location.href : undefined;
var DomSession = /** @class */ (function () {
    function DomSession(actorName, renderApp) {
        this.actorName = actorName;
        this.renderApp = renderApp;
    }
    DomSession.prototype.start = function () {
        if (this.$root)
            throw new Error(this.actorName + " already started");
        // Prevent previous scenario's URL from interfering
        window.history.pushState(undefined, undefined, loc);
        this.$actor = document.createElement("div");
        this.$actor.innerHTML = "<h1>" + this.actorName + "</h1>";
        document.body.appendChild(this.$actor);
        this.$root = document.createElement("div");
        this.$actor.appendChild(this.$root);
        this.renderApp(this.$root);
    };
    DomSession.prototype.stop = function () {
        // this.$actor.parentNode.removeChild(this.$actor)
    };
    return DomSession;
}());
exports.default = DomSession;
//# sourceMappingURL=DomSession.js.map