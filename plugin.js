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
// import { getRawComment } from './getRawComment';
/**
 * This plugin will force TypeDoc to use the name declared in &#64;name annotation. For
 * example, the following class declares a an event member named `before:add-to-cart`
 * although the associated node is a method with the name `addListener`. The method
 * signature will still be used for the event, i.e. te callback function signature:
 *
 *  @example
 * ```ts
 * TODO: check this code! and add missing sample documenation for paarms promise , return, etc
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
            // [Converter.EVENT_BEGIN]: this.onBegin,
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
                .filter(tag => tag.tagName && tag.tagName.text == 'name')
            // .map(tag=>({text: tag.tagName.text, escapedText: tag.tagName.escapedText, comment: tag.comment}))
            ));
            if (tags.length) {
                // TODO. what if tags[0].length>1 ? that could mean user write two @name tags - we are using the last one
                this.respectThisNames.push({ renameTo: tags[tags.length - 1].comment, reflection });
                // console.log(tags.length + ` ${reflection.name} has tag name with value ${tags[0].comment}`);
            }
            // const tags = node.jsDoc.filter(n=>n.tags && n.tags.find(t=>t.tagName && t.tagName.name))
            // (node.jsDoc||[]).forEach(node=>console.log((node.tags||[]).map(tag=>tag.tagName.text)))
            // .for
            //   console.log((node2.tags||[]).map(tag=>tag.tagName.text)
            // ))
        }
        // debugger;
        // if (reflection.kindOf(ReflectionKind.ExternalModule)) {
        //   let comment = getRawComment(node);
        //   // Look for @module
        //   let match = /@module\s+([\w\.\-_/@"]+)/.exec(comment);
        //   if (match) {
        //     // Look for @preferred
        //     let preferred = /@preferred/.exec(comment);
        //     // Set up a list of renames operations to perform when the resolve phase starts
        //     this.moduleRenames.push({
        //       renameTo: match[1],
        //       preferred: preferred != null,
        //       reflection: <ContainerReflection>reflection,
        //     });
        //   }
        // }
        // if (reflection.comment) {
        //   CommentPlugin.removeTags(reflection.comment, 'module');
        //   CommentPlugin.removeTags(reflection.comment, 'preferred');
        // }
    }
    /**
     * Triggered when the converter begins resolving a project.
     *
     * @param context  The context object describing the current state the converter is in.
     */
    onBeginResolve(context) {
        // let projRefs = context.project.reflections;
        // let refsArray: Reflection[] = Object.keys(projRefs).reduce((m, k) => {
        //   m.push(projRefs[k]);
        //   return m;
        // }, []);
        // // Process each rename
        // this.moduleRenames.forEach(item => {
        //   let renaming = <ContainerReflection>item.reflection;
        //   // Find an existing module that already has the "rename to" name.  Use it as the merge target.
        //   let mergeTarget = <ContainerReflection>refsArray.filter(
        //     ref => ref.kind === renaming.kind && ref.name === item.renameTo,
        //   )[0];
        //   // If there wasn't a merge target, just change the name of the current module and exit.
        //   if (!mergeTarget) {
        //     renaming.name = item.renameTo;
        //     return;
        //   }
        //   if (!mergeTarget.children) {
        //     mergeTarget.children = [];
        //   }
        //   // Since there is a merge target, relocate all the renaming module's children to the mergeTarget.
        //   let childrenOfRenamed = refsArray.filter(ref => ref.parent === renaming);
        //   childrenOfRenamed.forEach((ref: Reflection) => {
        //     // update links in both directions
        //     ref.parent = mergeTarget;
        //     mergeTarget.children.push(<any>ref);
        //   });
        //   // If @preferred was found on the current item, update the mergeTarget's comment
        //   // with comment from the renaming module
        //   if (item.preferred) mergeTarget.comment = renaming.comment;
        //   // Now that all the children have been relocated to the mergeTarget, delete the empty module
        //   // Make sure the module being renamed doesn't have children, or they will be deleted
        //   if (renaming.children) renaming.children.length = 0;
        //   CommentPlugin.removeReflection(context.project, renaming);
        //   // Remove @module and @preferred from the comment, if found.
        //   CommentPlugin.removeTags(mergeTarget.comment, 'module');
        //   CommentPlugin.removeTags(mergeTarget.comment, 'preferred');
        // });
    }
};
RespectNameTagPlugin = __decorate([
    components_1.Component({ name: 'respect-name-tag' })
], RespectNameTagPlugin);
exports.RespectNameTagPlugin = RespectNameTagPlugin;
//# sourceMappingURL=plugin.js.map