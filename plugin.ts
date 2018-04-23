import { Component, ConverterComponent } from 'typedoc/dist/lib/converter/components';
import { Converter } from 'typedoc/dist/lib/converter/converter';
import { Reflection } from 'typedoc/dist/lib/models/reflections/abstract';
import { Context } from 'typedoc/dist/lib/converter/context';
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
@Component({ name: 'respect-name-tag' })
export class RespectNameTagPlugin extends ConverterComponent {

  private respectThisNames:RespectNameTagRename[];
  
  initialize() {
    this.listenTo(this.owner, {
      [Converter.EVENT_BEGIN]: this.onBegin,
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
    if (node.symbol && node.jsDoc) {
      let tags = [];
      node.jsDoc.forEach(node =>
        tags = tags.concat(
          (node.tags || [])
          .filter(tag => tag.tagName && tag.tagName.text === 'name'),
        ),
      );
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
  private onBeginResolve(context: Context) {
    this.respectThisNames.forEach(item => {
      item.reflection.name = item.renameTo;
    });
  }
}

interface RespectNameTagRename {
  renameTo: string;
  reflection: Reflection; // ContainerReflection
}

// Finally we export the plugin class as a TypeDoc Plugin - this is we register it as a 
// TypeDoc component with our name 'respect-name-tag'
export default function (PluginHost) {
  PluginHost.owner.converter.addComponent('respect-name-tag', RespectNameTagPlugin);
}
