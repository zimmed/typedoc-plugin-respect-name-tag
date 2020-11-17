import { ConverterComponent } from 'typedoc/dist/lib/converter/components';
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
export declare class RespectNameTagPlugin extends ConverterComponent {
    private respectThisNames;
    initialize(): void;
    /**
     * Triggered when the converter begins converting a project.
     *
     * @param context  The context object describing the current state the converter is in.
     */
    private onBegin;
    /**
     * Triggered when the converter has created a declaration reflection.
     *
     * @param context  The context object describing the current state the converter is in.
     * @param reflection  The reflection that is currently processed.
     * @param node  The node that is currently processed if available.
     */
    private onDeclaration;
    /**
     * Triggered when the converter begins resolving a project.
     *
     * @param context  The context object describing the current state the converter is in.
     */
    private onBeginResolve;
}
export default function (PluginHost: {
    owner: {
        converter: {
            addComponent: (name: string, plugin: any) => void;
        };
    };
}): void;
