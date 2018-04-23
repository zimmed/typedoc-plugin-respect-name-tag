# About


This plugin will force TypeDoc to use the name declared in &#64;name annotation. For 
example, the following class declares a an event member named `before:add-to-cart` 
although the associated node is a method with the name `addListener`. The method 
signature will still be used for the event, i.e. the callback function signature: 

 @example
```ts

export interface Cart {
/**
* Register given listener function to be notified when the user add the items to the cart 
* @event
* @name before:add-to-cart
* @param listener accepts the items that the user had intention to add to the cart and a promise that will be resolved when the transaction is fulfilled or rejected otherwise. Also the listener have the possibility to asynchronously validate the transaction yb returning a promise. If so the transaction won't start unless the promise is resolved (could be useful to validate with third parties providers)
*/
addListener(listener:(items:IItem[], transaction:Promise<Transaction>)=>Promise<boolean>):void
}
```

# Usage

```sh
npm install --save-dev typedoc-plugin-respect-name-tag
```

Typedoc has the ability to discover and load typedoc plugins found in node_modules. Simply install the plugin and run typedoc.
```
npm install --save typedoc-plugin-external-module-name
typedoc
```

If unsure, you can always run typedoc with `--plugin typedoc-plugin-respect-name-tag` argument to enforce plugin's execution. 