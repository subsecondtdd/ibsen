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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Actor_1 = __importDefault(require("./Actor"));
exports.Actor = Actor_1.default;
var DomainSession_1 = __importDefault(require("./DomainSession"));
exports.DomainSession = DomainSession_1.default;
var DomSession_1 = __importDefault(require("./DomSession"));
exports.DomSession = DomSession_1.default;
var http_1 = __importDefault(require("http"));
var util_1 = require("util");
var cucumber_1 = require("cucumber");
var SESSION = process.env.SESSION;
var API = process.env.API;
function ibsen(options) {
    function defaultMakeDomainSession(actorName, api) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new DomainSession_1.default(actorName, api)];
            });
        });
    }
    function defaultMakeSession(sessionType, actorName, api) {
        return __awaiter(this, void 0, void 0, function () {
            var makeDomainSession;
            return __generator(this, function (_a) {
                switch (sessionType) {
                    case "DomainSession":
                        makeDomainSession = options.makeDomainSession || defaultMakeDomainSession;
                        return [2 /*return*/, makeDomainSession(actorName, api)];
                    case "DomSession":
                        return [2 /*return*/, new DomSession_1.default(actorName, options.makeRenderApp(api))];
                    default:
                        throw new Error("Unsupported Session: " + sessionType);
                }
                return [2 /*return*/];
            });
        });
    }
    var World = /** @class */ (function () {
        function World() {
            this.actors = new Map();
            this.stoppables = [];
        }
        World.prototype.getActor = function (actorName) {
            return __awaiter(this, void 0, void 0, function () {
                var api, makeSession, session, actor;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.actors.has(actorName))
                                return [2 /*return*/, this.actors.get(actorName)];
                            if (!SESSION) {
                                throw new Error("Please define the $SESSION environment variable");
                            }
                            return [4 /*yield*/, this.makeApi(API)];
                        case 1:
                            api = _a.sent();
                            makeSession = options.makeSession || defaultMakeSession;
                            return [4 /*yield*/, makeSession(SESSION, actorName, api)];
                        case 2:
                            session = _a.sent();
                            if (!session) {
                                throw new Error("No " + SESSION + " defined in " + this.constructor.name);
                            }
                            return [4 /*yield*/, session.start()];
                        case 3:
                            _a.sent();
                            this.stoppables.push(session.stop.bind(session));
                            actor = new Actor_1.default(actorName, this.domainApi, session);
                            this.actors.set(actorName, actor);
                            return [2 /*return*/, actor];
                    }
                });
            });
        };
        World.prototype.start = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this;
                            return [4 /*yield*/, options.makeDomainApi()];
                        case 1:
                            _a.domainApi = _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        World.prototype.stop = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _i, _a, stoppable;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _i = 0, _a = this.stoppables.reverse();
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            stoppable = _a[_i];
                            return [4 /*yield*/, stoppable()];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        World.prototype.makeApi = function (apiType) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, app, server_1, listen, addr, port, baseurl;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = apiType;
                            switch (_a) {
                                case "Direct": return [3 /*break*/, 1];
                                case "HTTP": return [3 /*break*/, 2];
                            }
                            return [3 /*break*/, 4];
                        case 1: return [2 /*return*/, this.domainApi];
                        case 2:
                            app = options.makeRequestListener(this.domainApi);
                            server_1 = http_1.default.createServer(app);
                            listen = util_1.promisify(server_1.listen.bind(server_1));
                            return [4 /*yield*/, listen()];
                        case 3:
                            _b.sent();
                            this.stoppables.push(function () { return __awaiter(_this, void 0, void 0, function () {
                                var close;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            close = util_1.promisify(server_1.close.bind(server_1));
                                            return [4 /*yield*/, close()];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            addr = server_1.address();
                            port = addr.port;
                            baseurl = "http://localhost:" + port;
                            return [2 /*return*/, options.makeHttpApi(baseurl)];
                        case 4: throw new Error("Unsupported Api: " + apiType);
                    }
                });
            });
        };
        return World;
    }());
    cucumber_1.Before(function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.start()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    cucumber_1.After(function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.stop()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    cucumber_1.setWorldConstructor(World);
}
exports.default = ibsen;
//# sourceMappingURL=ibsen.js.map