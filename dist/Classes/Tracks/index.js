"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Tracks = /** @class */ (function (_super) {
    __extends(Tracks, _super);
    function Tracks() {
        return _super.call(this) || this;
    }
    Tracks.prototype.random = function () {
        return this[Math.floor(Math.random() * this.length)];
    };
    Tracks.prototype.size = function () {
        return this.length;
    };
    return Tracks;
}(Array));
exports.default = Tracks;
//# sourceMappingURL=index.js.map