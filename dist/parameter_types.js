"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cucumber_1 = require("cucumber");
cucumber_1.defineParameterType({
    name: "actor",
    regexp: /[A-Z][a-z]+/,
    transformer: function (actorName) {
        return this.getActor(actorName);
    },
});
//# sourceMappingURL=parameter_types.js.map