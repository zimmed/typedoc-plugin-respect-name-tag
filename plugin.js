"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("typedoc/dist/lib/converter/components");
const converter_1 = require("typedoc/dist/lib/converter/converter");
/**
 * This plugin will force TypeDoc to use the name declared in @name annotation. For
 * example, the following class declares a an event member named `before:add-to-cart`
 * although the associated node is a method with the name `addListener`. The method
 * signature will still be used for the event, i.e. the callback function signature:
 *
 *  @example
 * ```ts
 * TODO: check this code! and add missing sample documentation for params promise , return, etc
 * interface Cart {
 *  &#47;**
 *   * Register given listener function to be notified when the user add the items to the cart
 *   * &#64;event
 *   * &#64;name before:add-to-cart
 *   * &#64;param listener
 *   *&#47;
 *  addListener(listener:(items:IItem[], transaction:Promise<Transaction>)=>Promise<boolean>):void
 * }
 * ```
 */
let RespectNameTagPlugin = class RespectNameTagPlugin extends components_1.ConverterComponent {
    initialize() {
        this.listenTo(this.owner, {
            [converter_1.Converter.EVENT_BEGIN]: this.onBegin,
            [converter_1.Converter.EVENT_CREATE_DECLARATION]: this.onDeclaration,
            [converter_1.Converter.EVENT_RESOLVE_BEGIN]: this.onBeginResolve,
        });
    }
    /**
     * Triggered when the converter begins converting a project.
     *
     * @param context  The context object describing the current state the converter is in.
     */
    onBegin(context) {
        this.respectThisNames = [];
    }
    /**
     * Triggered when the converter has created a declaration reflection.
     *
     * @param context  The context object describing the current state the converter is in.
     * @param reflection  The reflection that is currently processed.
     * @param node  The node that is currently processed if available.
     */
    onDeclaration(context, reflection, node) {
        if (node.symbol && node.jsDoc) {
            let tags = [];
            node.jsDoc.forEach(node => tags = tags.concat((node.tags || [])
                .filter(tag => tag.tagName && tag.tagName.text == 'name')));
            if (tags.length) {
                // TODO. what if tags[0].length>1 ? that could mean user write two @name tags - we are using the last one
                this.respectThisNames.push({ renameTo: tags[tags.length - 1].comment, reflection });
            }
        }
    }
    /**
     * Triggered when the converter begins resolving a project.
     *
     * @param context  The context object describing the current state the converter is in.
     */
    onBeginResolve(context) {
        this.respectThisNames.forEach(item => {
            item.reflection.name = item.renameTo;
        });
    }
};
RespectNameTagPlugin = __decorate([
    components_1.Component({ name: 'respect-name-tag' })
], RespectNameTagPlugin);
exports.RespectNameTagPlugin = RespectNameTagPlugin;
// Finally we export the plugin class as a TypeDoc Plugin - this is we register it as a 
// TypeDoc component with our name 'respect-name-tag'
function default_1(PluginHost) {
    PluginHost.owner.converter.addComponent('respect-name-tag', RespectNameTagPlugin);
}
exports.default = default_1;
;
//# sourceMappingURL=plugin.js.map