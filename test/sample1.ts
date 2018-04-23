/**
 * doc de la clase
 */
export class Class1{
  /**
   * doc de prop
   */
  color: string
  /**
   * doc de evento
   * @event
   * @name customEvent
   */
  addListener(name:string, listener:(data)=>void):void{

  }
  /**
   * doc de method1
   */
  method1(){}
}


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
  addListener(listener:(items:IItem[], transaction:Promise<ITransaction>)=>Promise<boolean>):void
}

export interface IItem{
  quantity: number
  options: number[]
  id: number
}

export interface ITransaction{
  id: string
  lines: IItem[]
}