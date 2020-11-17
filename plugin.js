"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RespectNameTagPlugin = void 0;
var components_1 = require("typedoc/dist/lib/converter/components");
var converter_1 = require("typedoc/dist/lib/converter/converter");
/**
 * This plugin will force TypeDoc to use the name declared in &#64;name annotation. For
 * example, the following class declares a an event member named `before:add-to-cart`
 * although the associated node is a method with the name `addListener`. The method
 * signature will still be used for the event, i.e. the callback function signature:
 *
 *  @example
 * ```ts
 * export interface Cart {
 *   &#47;**
 *    * Register given listener function to be notified when the user add the items to the cart
 *    * &#64;event
 *    * &#64;name before:add-to-cart
 *    * &#64;param listener accepts the items that the user had intention to add to the cart and
 *    * a promise that will be resolved when the transaction is fulfilled or rejected
 *    * otherwise. Also the listener have the possibility to asynchronously validate
 *    * the transaction yb returning a promise. If so the transaction won't start
 *    * unless the promise is resolved (could be useful to validate with third parties
 *    * providers)
 *    *&#47;
 *   addListener(listener:(items:IItem[], transaction:Promise<ITransaction>) => Promise<boolean>):void;
 * }
 * ```
 *
 */
var RespectNameTagPlugin = /** @class */ (function (_super) {
    __extends(RespectNameTagPlugin, _super);
    function RespectNameTagPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.respectThisNames = [];
        return _this;
    }
    RespectNameTagPlugin.prototype.initialize = function () {
        var _a;
        this.listenTo(this.owner, (_a = {},
            _a[converter_1.Converter.EVENT_BEGIN] = this.onBegin,
            _a[converter_1.Converter.EVENT_CREATE_DECLARATION] = this.onDeclaration,
            _a[converter_1.Converter.EVENT_RESOLVE_BEGIN] = this.onBeginResolve,
            _a));
    };
    /**
     * Triggered when the converter begins converting a project.
     *
     * @param context  The context object describing the current state the converter is in.
     */
    RespectNameTagPlugin.prototype.onBegin = function () {
        this.respectThisNames = [];
    };
    /**
     * Triggered when the converter has created a declaration reflection.
     *
     * @param context  The context object describing the current state the converter is in.
     * @param reflection  The reflection that is currently processed.
     * @param node  The node that is currently processed if available.
     */
    RespectNameTagPlugin.prototype.onDeclaration = function (context, reflection, node) {
        if ((node === null || node === void 0 ? void 0 : node.symbol) && node.jsDoc) {
            var tags_1 = [];
            node.jsDoc.forEach(function (n) {
                return (tags_1 = tags_1.concat((n.tags || []).filter(function (tag) { return tag.tagName && tag.tagName.text === 'name'; })));
            });
            if (tags_1.length) {
                // TODO. what if tags[0].length>1 ? that could mean user write two @name tags - we are using the last one
                this.respectThisNames.push({
                    renameTo: tags_1[tags_1.length - 1].comment,
                    reflection: reflection,
                });
            }
        }
    };
    /**
     * Triggered when the converter begins resolving a project.
     *
     * @param context  The context object describing the current state the converter is in.
     */
    RespectNameTagPlugin.prototype.onBeginResolve = function () {
        this.respectThisNames.forEach(function (item) {
            item.reflection.name = item.renameTo;
        });
    };
    RespectNameTagPlugin = __decorate([
        components_1.Component({ name: 'respect-name-tag' })
    ], RespectNameTagPlugin);
    return RespectNameTagPlugin;
}(components_1.ConverterComponent));
exports.RespectNameTagPlugin = RespectNameTagPlugin;
// Finally we export the plugin class as a TypeDoc Plugin - this is we register it as a
// TypeDoc component with our name 'respect-name-tag'
function default_1(PluginHost) {
    PluginHost.owner.converter.addComponent('respect-name-tag', RespectNameTagPlugin);
}
exports.default = default_1;
//# sourceMappingURL=plugin.js.map