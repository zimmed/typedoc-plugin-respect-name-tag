# typedoc-plugin-respect-name-tag 1.2.0

## Forked to fix bugs and clean up repo

- Fixed bug when using with typedoc >= 0.19 (node.symbol referenced when node is undefined)
- Removed broken test suite
- Updated library dependencies
- Restructured repo to use src/ and /dist folders
- Configured to publish to github's NPM.

## About (from original readme)

[TypeDoc](http://typedoc.org) plugin to enforce the use of the `@name` tag to
declare entity names.

Any entity with a jsDoc comment containing a `@name` tag with a valid value
will be named like that by TypeDoc instead of using the original entity name.

For example, the following class declares a an event member which, thanks to this
plugin will be named `before:add-to-cart`. Without this plugin TypeDoc will name
the event like the method, `addListener`. The method signature will still be used
for the event, the only thing that change is its name.

```ts
export interface Cart {
  /**
   * Register given listener function to be notified when the user add the items to the cart
   * @event
   * @name before:add-to-cart
   * @param listener accepts the items that the user had intention to add to the cart and
   * a promise that will be resolved when the transaction is fulfilled or rejected
   * otherwise. Also the listener have the possibility to asynchronously validate
   * the transaction yb returning a promise. If so the transaction won't start
   * unless the promise is resolved (could be useful to validate with third parties
   * providers)
   */
  addListener(listener: (items: IItem[], transaction: Promise<ITransaction>) => Promise<boolean>): void;
}
```

## Usage (modified from original readme)

First, edit existing or create new `.npmrc` file in your project root, and add:

`@zimmed:registry=https://npm.pkg.github.com`

Then you can use:

`$ npm i --save @zimmed/typedoc-plugin-respect-name-tag`

Typedoc has the ability to discover and load typedoc plugins found in node_modules.

If unsure, you can always run typedoc with `--plugin typedoc-plugin-respect-name-tag` argument to enforce plugin's execution.

## TODO (from original readme)

- test not only for events but for clases, properties, etc
- validate @name's value - should be valid ts identifier.
