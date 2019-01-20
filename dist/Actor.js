"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * An Actor is used to interact with the system in When and Then steps.
 * (For Given steps, interact with the system using this.context).
 */
var Actor = /** @class */ (function () {
    function Actor(name, session) {
        this.memory = new Map();
        this.name = name;
        this.session = session;
    }
    Actor.prototype.getName = function () {
        return this.name;
    };
    /**
     * Remember something
     *
     * @param key the name of the thing to remember
     * @param value what to remember
     */
    Actor.prototype.remember = function (key, value) {
        this.memory.set(key, value);
    };
    /**
     * Recall something previously remembered
     *
     * @param key the name of the thing to recall
     * @return the value that was recalled
     * @throws Error if nothing can be recalled.
     */
    Actor.prototype.recall = function (key) {
        if (!this.memory.has(key)) {
            throw new Error(this.name + " does not recall anything about " + key);
        }
        return this.memory.get(key);
    };
    /**
     * Use this in When steps to set up a context
     *
     * @param action a function that interacts with the system via a Session
     */
    Actor.prototype.attemptsTo = function (action) {
        return __awaiter(this, void 0, void 0, function () {
            var nextSession;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, action(this.session)];
                    case 1:
                        nextSession = _a.sent();
                        if (nextSession) {
                            this.session = nextSession;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Use this in Then steps to pull data out of the system (e.g. using a view)
     *
     * @param outcome a function that interacts with the system via a Session
     */
    Actor.prototype.check = function (outcome) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, outcome(this.session)];
            });
        });
    };
    return Actor;
}());
exports.default = Actor;
//# sourceMappingURL=Actor.js.map