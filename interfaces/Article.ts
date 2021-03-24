/**
 * An article reflects what we have in a store.
 *
 * @export
 * @interface Article
 */
export interface Article {
  _id?: string;
  id?: string;
  name: string;
  price: number;
  qty: number;
}
