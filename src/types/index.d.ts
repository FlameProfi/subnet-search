/* eslint-disable no-var */

// declare global {
//   namespace Express {
//     interface Request {
//       user: string;
//     }
//   }
// }

declare global {
  interface Array<T> {
    removeLast(): T[];
  }
}

export {};

/* eslint-disable no-var */
// export {};
// ⛔️ Error: Augmentations for the global
// scope can only be directly nested in external
// modules or ambient module declarations.ts(2669)
// declare global {
//   interface Window {
//     example: any;
//   }
// }

// export {};

// declare global {
//   interface Array<T> {
//     removeLast(): T[];
//   }
// }

// declare global {
//   namespace Express {
//     interface Request {
//       user: string;
//     }
//   }
// }
// declare global {
//   interface Window {
//     myProperty: any;
//   }
// }

// interface Employee {
//   name: string;
//   age: number;
// }

// declare global {
//   var example: string;
//   function sum(a: number, b: number): number;
// }

// export {};

// declare global {
//   var country: string;
//   function multiply(a: number, b: number): number;
// }

// export {};

// declare var country: string;

// declare function multiply(a: number, b: number): number;
