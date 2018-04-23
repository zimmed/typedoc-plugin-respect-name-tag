import { Reflection, ReflectionKind } from 'typedoc/dist/lib/models/reflections/abstract';
import { Component, ConverterComponent } from 'typedoc/dist/lib/converter/components';
import { Converter } from 'typedoc/dist/lib/converter/converter';
import { Context } from 'typedoc/dist/lib/converter/context';
import { CommentPlugin } from 'typedoc/dist/lib/converter/plugins/CommentPlugin';
import { ContainerReflection } from 'typedoc/dist/lib/models/reflections/container';
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
@Component({ name: 'respect-name-tag' })
export class RespectNameTagPlugin extends ConverterComponent {
  /** List of module reflections which are models to rename */
  // private moduleRenames: ModuleRename[];

  private respectThisNames:RespectNameTagRename[]


  initialize() {
    this.listenTo(this.owner, {
      // [Converter.EVENT_BEGIN]: this.onBegin,
      [Converter.EVENT_CREATE_DECLARATION]: this.onDeclaration,
      [Converter.EVENT_RESOLVE_BEGIN]: this.onBeginResolve,
    });
  }

  /**
   * Triggered when the converter begins converting a project.
   *
   * @param context  The context object describing the current state the converter is in.
   */
  private onBegin(context: Context) {
    this.respectThisNames = [];
  }

  /**
   * Triggered when the converter has created a declaration reflection.
   *
   * @param context  The context object describing the current state the converter is in.
   * @param reflection  The reflection that is currently processed.
   * @param node  The node that is currently processed if available.
   */
  private onDeclaration(context: Context, reflection: Reflection, node?) {
    if(node.symbol && node.jsDoc){

      let tags =[]
      node.jsDoc.forEach(node=>
        tags = tags.concat(
          (node.tags||[])
          .filter(tag=>tag.tagName && tag.tagName.text=='name')
          // .map(tag=>({text: tag.tagName.text, escapedText: tag.tagName.escapedText, comment: tag.comment}))
        )
      );

      if(tags.length){
        // TODO. what if tags[0].length>1 ? that could mean user write two @name tags - we are using the last one
        this.respectThisNames.push({renameTo: tags[tags.length-1].comment, reflection})
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
  private onBeginResolve(context: Context) {
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
}

interface RespectNameTagRename {
  renameTo: string;
  reflection: Reflection; // ContainerReflection
}