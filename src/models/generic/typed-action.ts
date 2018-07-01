import { IException } from './exception';

export interface ITypedAction<T = any> {
  payload?: T;
  meta?: any | { resolve: any, reject: any };
  error?: IException;
  type: string
}

// export class TypedAction<T = any> implements ITypedAction<T> {
//   /**
//    *
//    */
//   payload?: T;
//   meta?: any | { resolve: any, reject: any };
//   error?: IException;
//   type: string

//   constructor(opt: ITypedAction<T>) {
//     this.type = opt.type;
//     this.payload = opt.payload;
//     this.meta = opt.meta;
//     this.error = opt.error;
//   }
// }
