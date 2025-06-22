
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model almacen
 * 
 */
export type almacen = $Result.DefaultSelection<Prisma.$almacenPayload>
/**
 * Model categoria
 * 
 */
export type categoria = $Result.DefaultSelection<Prisma.$categoriaPayload>
/**
 * Model compra
 * 
 */
export type compra = $Result.DefaultSelection<Prisma.$compraPayload>
/**
 * Model detallesventa
 * 
 */
export type detallesventa = $Result.DefaultSelection<Prisma.$detallesventaPayload>
/**
 * Model producto
 * 
 */
export type producto = $Result.DefaultSelection<Prisma.$productoPayload>
/**
 * Model productocompra
 * 
 */
export type productocompra = $Result.DefaultSelection<Prisma.$productocompraPayload>
/**
 * Model proveedor
 * 
 */
export type proveedor = $Result.DefaultSelection<Prisma.$proveedorPayload>
/**
 * Model tienda
 * 
 */
export type tienda = $Result.DefaultSelection<Prisma.$tiendaPayload>
/**
 * Model usuarios
 * 
 */
export type usuarios = $Result.DefaultSelection<Prisma.$usuariosPayload>
/**
 * Model venta
 * 
 */
export type venta = $Result.DefaultSelection<Prisma.$ventaPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const usuarios_rol: {
  SUPERADMIN: 'SUPERADMIN',
  ADMIN_TIENDA: 'ADMIN_TIENDA',
  TRABAJADOR: 'TRABAJADOR'
};

export type usuarios_rol = (typeof usuarios_rol)[keyof typeof usuarios_rol]

}

export type usuarios_rol = $Enums.usuarios_rol

export const usuarios_rol: typeof $Enums.usuarios_rol

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Almacens
 * const almacens = await prisma.almacen.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Almacens
   * const almacens = await prisma.almacen.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.almacen`: Exposes CRUD operations for the **almacen** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Almacens
    * const almacens = await prisma.almacen.findMany()
    * ```
    */
  get almacen(): Prisma.almacenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.categoria`: Exposes CRUD operations for the **categoria** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categorias
    * const categorias = await prisma.categoria.findMany()
    * ```
    */
  get categoria(): Prisma.categoriaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.compra`: Exposes CRUD operations for the **compra** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Compras
    * const compras = await prisma.compra.findMany()
    * ```
    */
  get compra(): Prisma.compraDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.detallesventa`: Exposes CRUD operations for the **detallesventa** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Detallesventas
    * const detallesventas = await prisma.detallesventa.findMany()
    * ```
    */
  get detallesventa(): Prisma.detallesventaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.producto`: Exposes CRUD operations for the **producto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Productos
    * const productos = await prisma.producto.findMany()
    * ```
    */
  get producto(): Prisma.productoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productocompra`: Exposes CRUD operations for the **productocompra** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Productocompras
    * const productocompras = await prisma.productocompra.findMany()
    * ```
    */
  get productocompra(): Prisma.productocompraDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.proveedor`: Exposes CRUD operations for the **proveedor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Proveedors
    * const proveedors = await prisma.proveedor.findMany()
    * ```
    */
  get proveedor(): Prisma.proveedorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tienda`: Exposes CRUD operations for the **tienda** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tiendas
    * const tiendas = await prisma.tienda.findMany()
    * ```
    */
  get tienda(): Prisma.tiendaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.usuarios`: Exposes CRUD operations for the **usuarios** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuarios.findMany()
    * ```
    */
  get usuarios(): Prisma.usuariosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.venta`: Exposes CRUD operations for the **venta** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ventas
    * const ventas = await prisma.venta.findMany()
    * ```
    */
  get venta(): Prisma.ventaDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.10.1
   * Query Engine version: 9b628578b3b7cae625e8c927178f15a170e74a9c
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    almacen: 'almacen',
    categoria: 'categoria',
    compra: 'compra',
    detallesventa: 'detallesventa',
    producto: 'producto',
    productocompra: 'productocompra',
    proveedor: 'proveedor',
    tienda: 'tienda',
    usuarios: 'usuarios',
    venta: 'venta'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "almacen" | "categoria" | "compra" | "detallesventa" | "producto" | "productocompra" | "proveedor" | "tienda" | "usuarios" | "venta"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      almacen: {
        payload: Prisma.$almacenPayload<ExtArgs>
        fields: Prisma.almacenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.almacenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$almacenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.almacenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$almacenPayload>
          }
          findFirst: {
            args: Prisma.almacenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$almacenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.almacenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$almacenPayload>
          }
          findMany: {
            args: Prisma.almacenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$almacenPayload>[]
          }
          create: {
            args: Prisma.almacenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$almacenPayload>
          }
          createMany: {
            args: Prisma.almacenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.almacenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$almacenPayload>
          }
          update: {
            args: Prisma.almacenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$almacenPayload>
          }
          deleteMany: {
            args: Prisma.almacenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.almacenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.almacenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$almacenPayload>
          }
          aggregate: {
            args: Prisma.AlmacenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAlmacen>
          }
          groupBy: {
            args: Prisma.almacenGroupByArgs<ExtArgs>
            result: $Utils.Optional<AlmacenGroupByOutputType>[]
          }
          count: {
            args: Prisma.almacenCountArgs<ExtArgs>
            result: $Utils.Optional<AlmacenCountAggregateOutputType> | number
          }
        }
      }
      categoria: {
        payload: Prisma.$categoriaPayload<ExtArgs>
        fields: Prisma.categoriaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.categoriaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.categoriaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriaPayload>
          }
          findFirst: {
            args: Prisma.categoriaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.categoriaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriaPayload>
          }
          findMany: {
            args: Prisma.categoriaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriaPayload>[]
          }
          create: {
            args: Prisma.categoriaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriaPayload>
          }
          createMany: {
            args: Prisma.categoriaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.categoriaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriaPayload>
          }
          update: {
            args: Prisma.categoriaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriaPayload>
          }
          deleteMany: {
            args: Prisma.categoriaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.categoriaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.categoriaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriaPayload>
          }
          aggregate: {
            args: Prisma.CategoriaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategoria>
          }
          groupBy: {
            args: Prisma.categoriaGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoriaGroupByOutputType>[]
          }
          count: {
            args: Prisma.categoriaCountArgs<ExtArgs>
            result: $Utils.Optional<CategoriaCountAggregateOutputType> | number
          }
        }
      }
      compra: {
        payload: Prisma.$compraPayload<ExtArgs>
        fields: Prisma.compraFieldRefs
        operations: {
          findUnique: {
            args: Prisma.compraFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$compraPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.compraFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$compraPayload>
          }
          findFirst: {
            args: Prisma.compraFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$compraPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.compraFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$compraPayload>
          }
          findMany: {
            args: Prisma.compraFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$compraPayload>[]
          }
          create: {
            args: Prisma.compraCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$compraPayload>
          }
          createMany: {
            args: Prisma.compraCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.compraDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$compraPayload>
          }
          update: {
            args: Prisma.compraUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$compraPayload>
          }
          deleteMany: {
            args: Prisma.compraDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.compraUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.compraUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$compraPayload>
          }
          aggregate: {
            args: Prisma.CompraAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompra>
          }
          groupBy: {
            args: Prisma.compraGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompraGroupByOutputType>[]
          }
          count: {
            args: Prisma.compraCountArgs<ExtArgs>
            result: $Utils.Optional<CompraCountAggregateOutputType> | number
          }
        }
      }
      detallesventa: {
        payload: Prisma.$detallesventaPayload<ExtArgs>
        fields: Prisma.detallesventaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.detallesventaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$detallesventaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.detallesventaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$detallesventaPayload>
          }
          findFirst: {
            args: Prisma.detallesventaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$detallesventaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.detallesventaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$detallesventaPayload>
          }
          findMany: {
            args: Prisma.detallesventaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$detallesventaPayload>[]
          }
          create: {
            args: Prisma.detallesventaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$detallesventaPayload>
          }
          createMany: {
            args: Prisma.detallesventaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.detallesventaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$detallesventaPayload>
          }
          update: {
            args: Prisma.detallesventaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$detallesventaPayload>
          }
          deleteMany: {
            args: Prisma.detallesventaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.detallesventaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.detallesventaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$detallesventaPayload>
          }
          aggregate: {
            args: Prisma.DetallesventaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDetallesventa>
          }
          groupBy: {
            args: Prisma.detallesventaGroupByArgs<ExtArgs>
            result: $Utils.Optional<DetallesventaGroupByOutputType>[]
          }
          count: {
            args: Prisma.detallesventaCountArgs<ExtArgs>
            result: $Utils.Optional<DetallesventaCountAggregateOutputType> | number
          }
        }
      }
      producto: {
        payload: Prisma.$productoPayload<ExtArgs>
        fields: Prisma.productoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.productoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.productoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productoPayload>
          }
          findFirst: {
            args: Prisma.productoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.productoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productoPayload>
          }
          findMany: {
            args: Prisma.productoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productoPayload>[]
          }
          create: {
            args: Prisma.productoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productoPayload>
          }
          createMany: {
            args: Prisma.productoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.productoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productoPayload>
          }
          update: {
            args: Prisma.productoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productoPayload>
          }
          deleteMany: {
            args: Prisma.productoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.productoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.productoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productoPayload>
          }
          aggregate: {
            args: Prisma.ProductoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProducto>
          }
          groupBy: {
            args: Prisma.productoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductoGroupByOutputType>[]
          }
          count: {
            args: Prisma.productoCountArgs<ExtArgs>
            result: $Utils.Optional<ProductoCountAggregateOutputType> | number
          }
        }
      }
      productocompra: {
        payload: Prisma.$productocompraPayload<ExtArgs>
        fields: Prisma.productocompraFieldRefs
        operations: {
          findUnique: {
            args: Prisma.productocompraFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productocompraPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.productocompraFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productocompraPayload>
          }
          findFirst: {
            args: Prisma.productocompraFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productocompraPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.productocompraFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productocompraPayload>
          }
          findMany: {
            args: Prisma.productocompraFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productocompraPayload>[]
          }
          create: {
            args: Prisma.productocompraCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productocompraPayload>
          }
          createMany: {
            args: Prisma.productocompraCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.productocompraDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productocompraPayload>
          }
          update: {
            args: Prisma.productocompraUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productocompraPayload>
          }
          deleteMany: {
            args: Prisma.productocompraDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.productocompraUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.productocompraUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productocompraPayload>
          }
          aggregate: {
            args: Prisma.ProductocompraAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductocompra>
          }
          groupBy: {
            args: Prisma.productocompraGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductocompraGroupByOutputType>[]
          }
          count: {
            args: Prisma.productocompraCountArgs<ExtArgs>
            result: $Utils.Optional<ProductocompraCountAggregateOutputType> | number
          }
        }
      }
      proveedor: {
        payload: Prisma.$proveedorPayload<ExtArgs>
        fields: Prisma.proveedorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.proveedorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proveedorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.proveedorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proveedorPayload>
          }
          findFirst: {
            args: Prisma.proveedorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proveedorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.proveedorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proveedorPayload>
          }
          findMany: {
            args: Prisma.proveedorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proveedorPayload>[]
          }
          create: {
            args: Prisma.proveedorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proveedorPayload>
          }
          createMany: {
            args: Prisma.proveedorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.proveedorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proveedorPayload>
          }
          update: {
            args: Prisma.proveedorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proveedorPayload>
          }
          deleteMany: {
            args: Prisma.proveedorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.proveedorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.proveedorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proveedorPayload>
          }
          aggregate: {
            args: Prisma.ProveedorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProveedor>
          }
          groupBy: {
            args: Prisma.proveedorGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProveedorGroupByOutputType>[]
          }
          count: {
            args: Prisma.proveedorCountArgs<ExtArgs>
            result: $Utils.Optional<ProveedorCountAggregateOutputType> | number
          }
        }
      }
      tienda: {
        payload: Prisma.$tiendaPayload<ExtArgs>
        fields: Prisma.tiendaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.tiendaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tiendaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.tiendaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tiendaPayload>
          }
          findFirst: {
            args: Prisma.tiendaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tiendaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.tiendaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tiendaPayload>
          }
          findMany: {
            args: Prisma.tiendaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tiendaPayload>[]
          }
          create: {
            args: Prisma.tiendaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tiendaPayload>
          }
          createMany: {
            args: Prisma.tiendaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.tiendaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tiendaPayload>
          }
          update: {
            args: Prisma.tiendaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tiendaPayload>
          }
          deleteMany: {
            args: Prisma.tiendaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.tiendaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.tiendaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tiendaPayload>
          }
          aggregate: {
            args: Prisma.TiendaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTienda>
          }
          groupBy: {
            args: Prisma.tiendaGroupByArgs<ExtArgs>
            result: $Utils.Optional<TiendaGroupByOutputType>[]
          }
          count: {
            args: Prisma.tiendaCountArgs<ExtArgs>
            result: $Utils.Optional<TiendaCountAggregateOutputType> | number
          }
        }
      }
      usuarios: {
        payload: Prisma.$usuariosPayload<ExtArgs>
        fields: Prisma.usuariosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usuariosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usuariosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>
          }
          findFirst: {
            args: Prisma.usuariosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usuariosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>
          }
          findMany: {
            args: Prisma.usuariosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>[]
          }
          create: {
            args: Prisma.usuariosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>
          }
          createMany: {
            args: Prisma.usuariosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.usuariosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>
          }
          update: {
            args: Prisma.usuariosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>
          }
          deleteMany: {
            args: Prisma.usuariosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usuariosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.usuariosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>
          }
          aggregate: {
            args: Prisma.UsuariosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsuarios>
          }
          groupBy: {
            args: Prisma.usuariosGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsuariosGroupByOutputType>[]
          }
          count: {
            args: Prisma.usuariosCountArgs<ExtArgs>
            result: $Utils.Optional<UsuariosCountAggregateOutputType> | number
          }
        }
      }
      venta: {
        payload: Prisma.$ventaPayload<ExtArgs>
        fields: Prisma.ventaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ventaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ventaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ventaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ventaPayload>
          }
          findFirst: {
            args: Prisma.ventaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ventaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ventaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ventaPayload>
          }
          findMany: {
            args: Prisma.ventaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ventaPayload>[]
          }
          create: {
            args: Prisma.ventaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ventaPayload>
          }
          createMany: {
            args: Prisma.ventaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ventaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ventaPayload>
          }
          update: {
            args: Prisma.ventaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ventaPayload>
          }
          deleteMany: {
            args: Prisma.ventaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ventaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ventaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ventaPayload>
          }
          aggregate: {
            args: Prisma.VentaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVenta>
          }
          groupBy: {
            args: Prisma.ventaGroupByArgs<ExtArgs>
            result: $Utils.Optional<VentaGroupByOutputType>[]
          }
          count: {
            args: Prisma.ventaCountArgs<ExtArgs>
            result: $Utils.Optional<VentaCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    almacen?: almacenOmit
    categoria?: categoriaOmit
    compra?: compraOmit
    detallesventa?: detallesventaOmit
    producto?: productoOmit
    productocompra?: productocompraOmit
    proveedor?: proveedorOmit
    tienda?: tiendaOmit
    usuarios?: usuariosOmit
    venta?: ventaOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AlmacenCountOutputType
   */

  export type AlmacenCountOutputType = {
    producto: number
  }

  export type AlmacenCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    producto?: boolean | AlmacenCountOutputTypeCountProductoArgs
  }

  // Custom InputTypes
  /**
   * AlmacenCountOutputType without action
   */
  export type AlmacenCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlmacenCountOutputType
     */
    select?: AlmacenCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AlmacenCountOutputType without action
   */
  export type AlmacenCountOutputTypeCountProductoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: productoWhereInput
  }


  /**
   * Count Type CompraCountOutputType
   */

  export type CompraCountOutputType = {
    productocompra: number
  }

  export type CompraCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    productocompra?: boolean | CompraCountOutputTypeCountProductocompraArgs
  }

  // Custom InputTypes
  /**
   * CompraCountOutputType without action
   */
  export type CompraCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompraCountOutputType
     */
    select?: CompraCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CompraCountOutputType without action
   */
  export type CompraCountOutputTypeCountProductocompraArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: productocompraWhereInput
  }


  /**
   * Count Type ProductoCountOutputType
   */

  export type ProductoCountOutputType = {
    categoria: number
    detallesventa: number
    productocompra: number
  }

  export type ProductoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categoria?: boolean | ProductoCountOutputTypeCountCategoriaArgs
    detallesventa?: boolean | ProductoCountOutputTypeCountDetallesventaArgs
    productocompra?: boolean | ProductoCountOutputTypeCountProductocompraArgs
  }

  // Custom InputTypes
  /**
   * ProductoCountOutputType without action
   */
  export type ProductoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoCountOutputType
     */
    select?: ProductoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductoCountOutputType without action
   */
  export type ProductoCountOutputTypeCountCategoriaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: categoriaWhereInput
  }

  /**
   * ProductoCountOutputType without action
   */
  export type ProductoCountOutputTypeCountDetallesventaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: detallesventaWhereInput
  }

  /**
   * ProductoCountOutputType without action
   */
  export type ProductoCountOutputTypeCountProductocompraArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: productocompraWhereInput
  }


  /**
   * Count Type ProveedorCountOutputType
   */

  export type ProveedorCountOutputType = {
    compra: number
  }

  export type ProveedorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    compra?: boolean | ProveedorCountOutputTypeCountCompraArgs
  }

  // Custom InputTypes
  /**
   * ProveedorCountOutputType without action
   */
  export type ProveedorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProveedorCountOutputType
     */
    select?: ProveedorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProveedorCountOutputType without action
   */
  export type ProveedorCountOutputTypeCountCompraArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: compraWhereInput
  }


  /**
   * Count Type TiendaCountOutputType
   */

  export type TiendaCountOutputType = {
    almacen: number
    usuarios: number
  }

  export type TiendaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    almacen?: boolean | TiendaCountOutputTypeCountAlmacenArgs
    usuarios?: boolean | TiendaCountOutputTypeCountUsuariosArgs
  }

  // Custom InputTypes
  /**
   * TiendaCountOutputType without action
   */
  export type TiendaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TiendaCountOutputType
     */
    select?: TiendaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TiendaCountOutputType without action
   */
  export type TiendaCountOutputTypeCountAlmacenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: almacenWhereInput
  }

  /**
   * TiendaCountOutputType without action
   */
  export type TiendaCountOutputTypeCountUsuariosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usuariosWhereInput
  }


  /**
   * Count Type VentaCountOutputType
   */

  export type VentaCountOutputType = {
    detallesventa: number
  }

  export type VentaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    detallesventa?: boolean | VentaCountOutputTypeCountDetallesventaArgs
  }

  // Custom InputTypes
  /**
   * VentaCountOutputType without action
   */
  export type VentaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VentaCountOutputType
     */
    select?: VentaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VentaCountOutputType without action
   */
  export type VentaCountOutputTypeCountDetallesventaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: detallesventaWhereInput
  }


  /**
   * Models
   */

  /**
   * Model almacen
   */

  export type AggregateAlmacen = {
    _count: AlmacenCountAggregateOutputType | null
    _min: AlmacenMinAggregateOutputType | null
    _max: AlmacenMaxAggregateOutputType | null
  }

  export type AlmacenMinAggregateOutputType = {
    Id: string | null
    nombre: string | null
    Id_tienda: string | null
  }

  export type AlmacenMaxAggregateOutputType = {
    Id: string | null
    nombre: string | null
    Id_tienda: string | null
  }

  export type AlmacenCountAggregateOutputType = {
    Id: number
    nombre: number
    Id_tienda: number
    _all: number
  }


  export type AlmacenMinAggregateInputType = {
    Id?: true
    nombre?: true
    Id_tienda?: true
  }

  export type AlmacenMaxAggregateInputType = {
    Id?: true
    nombre?: true
    Id_tienda?: true
  }

  export type AlmacenCountAggregateInputType = {
    Id?: true
    nombre?: true
    Id_tienda?: true
    _all?: true
  }

  export type AlmacenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which almacen to aggregate.
     */
    where?: almacenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of almacens to fetch.
     */
    orderBy?: almacenOrderByWithRelationInput | almacenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: almacenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` almacens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` almacens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned almacens
    **/
    _count?: true | AlmacenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AlmacenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AlmacenMaxAggregateInputType
  }

  export type GetAlmacenAggregateType<T extends AlmacenAggregateArgs> = {
        [P in keyof T & keyof AggregateAlmacen]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAlmacen[P]>
      : GetScalarType<T[P], AggregateAlmacen[P]>
  }




  export type almacenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: almacenWhereInput
    orderBy?: almacenOrderByWithAggregationInput | almacenOrderByWithAggregationInput[]
    by: AlmacenScalarFieldEnum[] | AlmacenScalarFieldEnum
    having?: almacenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AlmacenCountAggregateInputType | true
    _min?: AlmacenMinAggregateInputType
    _max?: AlmacenMaxAggregateInputType
  }

  export type AlmacenGroupByOutputType = {
    Id: string
    nombre: string | null
    Id_tienda: string | null
    _count: AlmacenCountAggregateOutputType | null
    _min: AlmacenMinAggregateOutputType | null
    _max: AlmacenMaxAggregateOutputType | null
  }

  type GetAlmacenGroupByPayload<T extends almacenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AlmacenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AlmacenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AlmacenGroupByOutputType[P]>
            : GetScalarType<T[P], AlmacenGroupByOutputType[P]>
        }
      >
    >


  export type almacenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    Id?: boolean
    nombre?: boolean
    Id_tienda?: boolean
    tienda?: boolean | almacen$tiendaArgs<ExtArgs>
    producto?: boolean | almacen$productoArgs<ExtArgs>
    _count?: boolean | AlmacenCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["almacen"]>



  export type almacenSelectScalar = {
    Id?: boolean
    nombre?: boolean
    Id_tienda?: boolean
  }

  export type almacenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"Id" | "nombre" | "Id_tienda", ExtArgs["result"]["almacen"]>
  export type almacenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tienda?: boolean | almacen$tiendaArgs<ExtArgs>
    producto?: boolean | almacen$productoArgs<ExtArgs>
    _count?: boolean | AlmacenCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $almacenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "almacen"
    objects: {
      tienda: Prisma.$tiendaPayload<ExtArgs> | null
      producto: Prisma.$productoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      Id: string
      nombre: string | null
      Id_tienda: string | null
    }, ExtArgs["result"]["almacen"]>
    composites: {}
  }

  type almacenGetPayload<S extends boolean | null | undefined | almacenDefaultArgs> = $Result.GetResult<Prisma.$almacenPayload, S>

  type almacenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<almacenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AlmacenCountAggregateInputType | true
    }

  export interface almacenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['almacen'], meta: { name: 'almacen' } }
    /**
     * Find zero or one Almacen that matches the filter.
     * @param {almacenFindUniqueArgs} args - Arguments to find a Almacen
     * @example
     * // Get one Almacen
     * const almacen = await prisma.almacen.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends almacenFindUniqueArgs>(args: SelectSubset<T, almacenFindUniqueArgs<ExtArgs>>): Prisma__almacenClient<$Result.GetResult<Prisma.$almacenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Almacen that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {almacenFindUniqueOrThrowArgs} args - Arguments to find a Almacen
     * @example
     * // Get one Almacen
     * const almacen = await prisma.almacen.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends almacenFindUniqueOrThrowArgs>(args: SelectSubset<T, almacenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__almacenClient<$Result.GetResult<Prisma.$almacenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Almacen that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {almacenFindFirstArgs} args - Arguments to find a Almacen
     * @example
     * // Get one Almacen
     * const almacen = await prisma.almacen.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends almacenFindFirstArgs>(args?: SelectSubset<T, almacenFindFirstArgs<ExtArgs>>): Prisma__almacenClient<$Result.GetResult<Prisma.$almacenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Almacen that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {almacenFindFirstOrThrowArgs} args - Arguments to find a Almacen
     * @example
     * // Get one Almacen
     * const almacen = await prisma.almacen.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends almacenFindFirstOrThrowArgs>(args?: SelectSubset<T, almacenFindFirstOrThrowArgs<ExtArgs>>): Prisma__almacenClient<$Result.GetResult<Prisma.$almacenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Almacens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {almacenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Almacens
     * const almacens = await prisma.almacen.findMany()
     * 
     * // Get first 10 Almacens
     * const almacens = await prisma.almacen.findMany({ take: 10 })
     * 
     * // Only select the `Id`
     * const almacenWithIdOnly = await prisma.almacen.findMany({ select: { Id: true } })
     * 
     */
    findMany<T extends almacenFindManyArgs>(args?: SelectSubset<T, almacenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$almacenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Almacen.
     * @param {almacenCreateArgs} args - Arguments to create a Almacen.
     * @example
     * // Create one Almacen
     * const Almacen = await prisma.almacen.create({
     *   data: {
     *     // ... data to create a Almacen
     *   }
     * })
     * 
     */
    create<T extends almacenCreateArgs>(args: SelectSubset<T, almacenCreateArgs<ExtArgs>>): Prisma__almacenClient<$Result.GetResult<Prisma.$almacenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Almacens.
     * @param {almacenCreateManyArgs} args - Arguments to create many Almacens.
     * @example
     * // Create many Almacens
     * const almacen = await prisma.almacen.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends almacenCreateManyArgs>(args?: SelectSubset<T, almacenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Almacen.
     * @param {almacenDeleteArgs} args - Arguments to delete one Almacen.
     * @example
     * // Delete one Almacen
     * const Almacen = await prisma.almacen.delete({
     *   where: {
     *     // ... filter to delete one Almacen
     *   }
     * })
     * 
     */
    delete<T extends almacenDeleteArgs>(args: SelectSubset<T, almacenDeleteArgs<ExtArgs>>): Prisma__almacenClient<$Result.GetResult<Prisma.$almacenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Almacen.
     * @param {almacenUpdateArgs} args - Arguments to update one Almacen.
     * @example
     * // Update one Almacen
     * const almacen = await prisma.almacen.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends almacenUpdateArgs>(args: SelectSubset<T, almacenUpdateArgs<ExtArgs>>): Prisma__almacenClient<$Result.GetResult<Prisma.$almacenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Almacens.
     * @param {almacenDeleteManyArgs} args - Arguments to filter Almacens to delete.
     * @example
     * // Delete a few Almacens
     * const { count } = await prisma.almacen.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends almacenDeleteManyArgs>(args?: SelectSubset<T, almacenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Almacens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {almacenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Almacens
     * const almacen = await prisma.almacen.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends almacenUpdateManyArgs>(args: SelectSubset<T, almacenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Almacen.
     * @param {almacenUpsertArgs} args - Arguments to update or create a Almacen.
     * @example
     * // Update or create a Almacen
     * const almacen = await prisma.almacen.upsert({
     *   create: {
     *     // ... data to create a Almacen
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Almacen we want to update
     *   }
     * })
     */
    upsert<T extends almacenUpsertArgs>(args: SelectSubset<T, almacenUpsertArgs<ExtArgs>>): Prisma__almacenClient<$Result.GetResult<Prisma.$almacenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Almacens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {almacenCountArgs} args - Arguments to filter Almacens to count.
     * @example
     * // Count the number of Almacens
     * const count = await prisma.almacen.count({
     *   where: {
     *     // ... the filter for the Almacens we want to count
     *   }
     * })
    **/
    count<T extends almacenCountArgs>(
      args?: Subset<T, almacenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AlmacenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Almacen.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlmacenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AlmacenAggregateArgs>(args: Subset<T, AlmacenAggregateArgs>): Prisma.PrismaPromise<GetAlmacenAggregateType<T>>

    /**
     * Group by Almacen.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {almacenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends almacenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: almacenGroupByArgs['orderBy'] }
        : { orderBy?: almacenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, almacenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAlmacenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the almacen model
   */
  readonly fields: almacenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for almacen.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__almacenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tienda<T extends almacen$tiendaArgs<ExtArgs> = {}>(args?: Subset<T, almacen$tiendaArgs<ExtArgs>>): Prisma__tiendaClient<$Result.GetResult<Prisma.$tiendaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    producto<T extends almacen$productoArgs<ExtArgs> = {}>(args?: Subset<T, almacen$productoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$productoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the almacen model
   */
  interface almacenFieldRefs {
    readonly Id: FieldRef<"almacen", 'String'>
    readonly nombre: FieldRef<"almacen", 'String'>
    readonly Id_tienda: FieldRef<"almacen", 'String'>
  }
    

  // Custom InputTypes
  /**
   * almacen findUnique
   */
  export type almacenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the almacen
     */
    select?: almacenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the almacen
     */
    omit?: almacenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: almacenInclude<ExtArgs> | null
    /**
     * Filter, which almacen to fetch.
     */
    where: almacenWhereUniqueInput
  }

  /**
   * almacen findUniqueOrThrow
   */
  export type almacenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the almacen
     */
    select?: almacenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the almacen
     */
    omit?: almacenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: almacenInclude<ExtArgs> | null
    /**
     * Filter, which almacen to fetch.
     */
    where: almacenWhereUniqueInput
  }

  /**
   * almacen findFirst
   */
  export type almacenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the almacen
     */
    select?: almacenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the almacen
     */
    omit?: almacenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: almacenInclude<ExtArgs> | null
    /**
     * Filter, which almacen to fetch.
     */
    where?: almacenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of almacens to fetch.
     */
    orderBy?: almacenOrderByWithRelationInput | almacenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for almacens.
     */
    cursor?: almacenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` almacens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` almacens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of almacens.
     */
    distinct?: AlmacenScalarFieldEnum | AlmacenScalarFieldEnum[]
  }

  /**
   * almacen findFirstOrThrow
   */
  export type almacenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the almacen
     */
    select?: almacenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the almacen
     */
    omit?: almacenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: almacenInclude<ExtArgs> | null
    /**
     * Filter, which almacen to fetch.
     */
    where?: almacenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of almacens to fetch.
     */
    orderBy?: almacenOrderByWithRelationInput | almacenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for almacens.
     */
    cursor?: almacenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` almacens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` almacens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of almacens.
     */
    distinct?: AlmacenScalarFieldEnum | AlmacenScalarFieldEnum[]
  }

  /**
   * almacen findMany
   */
  export type almacenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the almacen
     */
    select?: almacenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the almacen
     */
    omit?: almacenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: almacenInclude<ExtArgs> | null
    /**
     * Filter, which almacens to fetch.
     */
    where?: almacenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of almacens to fetch.
     */
    orderBy?: almacenOrderByWithRelationInput | almacenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing almacens.
     */
    cursor?: almacenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` almacens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` almacens.
     */
    skip?: number
    distinct?: AlmacenScalarFieldEnum | AlmacenScalarFieldEnum[]
  }

  /**
   * almacen create
   */
  export type almacenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the almacen
     */
    select?: almacenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the almacen
     */
    omit?: almacenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: almacenInclude<ExtArgs> | null
    /**
     * The data needed to create a almacen.
     */
    data?: XOR<almacenCreateInput, almacenUncheckedCreateInput>
  }

  /**
   * almacen createMany
   */
  export type almacenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many almacens.
     */
    data: almacenCreateManyInput | almacenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * almacen update
   */
  export type almacenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the almacen
     */
    select?: almacenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the almacen
     */
    omit?: almacenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: almacenInclude<ExtArgs> | null
    /**
     * The data needed to update a almacen.
     */
    data: XOR<almacenUpdateInput, almacenUncheckedUpdateInput>
    /**
     * Choose, which almacen to update.
     */
    where: almacenWhereUniqueInput
  }

  /**
   * almacen updateMany
   */
  export type almacenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update almacens.
     */
    data: XOR<almacenUpdateManyMutationInput, almacenUncheckedUpdateManyInput>
    /**
     * Filter which almacens to update
     */
    where?: almacenWhereInput
    /**
     * Limit how many almacens to update.
     */
    limit?: number
  }

  /**
   * almacen upsert
   */
  export type almacenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the almacen
     */
    select?: almacenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the almacen
     */
    omit?: almacenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: almacenInclude<ExtArgs> | null
    /**
     * The filter to search for the almacen to update in case it exists.
     */
    where: almacenWhereUniqueInput
    /**
     * In case the almacen found by the `where` argument doesn't exist, create a new almacen with this data.
     */
    create: XOR<almacenCreateInput, almacenUncheckedCreateInput>
    /**
     * In case the almacen was found with the provided `where` argument, update it with this data.
     */
    update: XOR<almacenUpdateInput, almacenUncheckedUpdateInput>
  }

  /**
   * almacen delete
   */
  export type almacenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the almacen
     */
    select?: almacenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the almacen
     */
    omit?: almacenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: almacenInclude<ExtArgs> | null
    /**
     * Filter which almacen to delete.
     */
    where: almacenWhereUniqueInput
  }

  /**
   * almacen deleteMany
   */
  export type almacenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which almacens to delete
     */
    where?: almacenWhereInput
    /**
     * Limit how many almacens to delete.
     */
    limit?: number
  }

  /**
   * almacen.tienda
   */
  export type almacen$tiendaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tienda
     */
    select?: tiendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tienda
     */
    omit?: tiendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tiendaInclude<ExtArgs> | null
    where?: tiendaWhereInput
  }

  /**
   * almacen.producto
   */
  export type almacen$productoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the producto
     */
    select?: productoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the producto
     */
    omit?: productoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productoInclude<ExtArgs> | null
    where?: productoWhereInput
    orderBy?: productoOrderByWithRelationInput | productoOrderByWithRelationInput[]
    cursor?: productoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductoScalarFieldEnum | ProductoScalarFieldEnum[]
  }

  /**
   * almacen without action
   */
  export type almacenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the almacen
     */
    select?: almacenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the almacen
     */
    omit?: almacenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: almacenInclude<ExtArgs> | null
  }


  /**
   * Model categoria
   */

  export type AggregateCategoria = {
    _count: CategoriaCountAggregateOutputType | null
    _min: CategoriaMinAggregateOutputType | null
    _max: CategoriaMaxAggregateOutputType | null
  }

  export type CategoriaMinAggregateOutputType = {
    Id: string | null
    nombre: string | null
    descripcion: string | null
    Id_producto: string | null
  }

  export type CategoriaMaxAggregateOutputType = {
    Id: string | null
    nombre: string | null
    descripcion: string | null
    Id_producto: string | null
  }

  export type CategoriaCountAggregateOutputType = {
    Id: number
    nombre: number
    descripcion: number
    Id_producto: number
    _all: number
  }


  export type CategoriaMinAggregateInputType = {
    Id?: true
    nombre?: true
    descripcion?: true
    Id_producto?: true
  }

  export type CategoriaMaxAggregateInputType = {
    Id?: true
    nombre?: true
    descripcion?: true
    Id_producto?: true
  }

  export type CategoriaCountAggregateInputType = {
    Id?: true
    nombre?: true
    descripcion?: true
    Id_producto?: true
    _all?: true
  }

  export type CategoriaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which categoria to aggregate.
     */
    where?: categoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categorias to fetch.
     */
    orderBy?: categoriaOrderByWithRelationInput | categoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: categoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned categorias
    **/
    _count?: true | CategoriaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoriaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoriaMaxAggregateInputType
  }

  export type GetCategoriaAggregateType<T extends CategoriaAggregateArgs> = {
        [P in keyof T & keyof AggregateCategoria]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategoria[P]>
      : GetScalarType<T[P], AggregateCategoria[P]>
  }




  export type categoriaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: categoriaWhereInput
    orderBy?: categoriaOrderByWithAggregationInput | categoriaOrderByWithAggregationInput[]
    by: CategoriaScalarFieldEnum[] | CategoriaScalarFieldEnum
    having?: categoriaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoriaCountAggregateInputType | true
    _min?: CategoriaMinAggregateInputType
    _max?: CategoriaMaxAggregateInputType
  }

  export type CategoriaGroupByOutputType = {
    Id: string
    nombre: string | null
    descripcion: string | null
    Id_producto: string | null
    _count: CategoriaCountAggregateOutputType | null
    _min: CategoriaMinAggregateOutputType | null
    _max: CategoriaMaxAggregateOutputType | null
  }

  type GetCategoriaGroupByPayload<T extends categoriaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoriaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoriaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoriaGroupByOutputType[P]>
            : GetScalarType<T[P], CategoriaGroupByOutputType[P]>
        }
      >
    >


  export type categoriaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    Id?: boolean
    nombre?: boolean
    descripcion?: boolean
    Id_producto?: boolean
    producto?: boolean | categoria$productoArgs<ExtArgs>
  }, ExtArgs["result"]["categoria"]>



  export type categoriaSelectScalar = {
    Id?: boolean
    nombre?: boolean
    descripcion?: boolean
    Id_producto?: boolean
  }

  export type categoriaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"Id" | "nombre" | "descripcion" | "Id_producto", ExtArgs["result"]["categoria"]>
  export type categoriaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    producto?: boolean | categoria$productoArgs<ExtArgs>
  }

  export type $categoriaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "categoria"
    objects: {
      producto: Prisma.$productoPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      Id: string
      nombre: string | null
      descripcion: string | null
      Id_producto: string | null
    }, ExtArgs["result"]["categoria"]>
    composites: {}
  }

  type categoriaGetPayload<S extends boolean | null | undefined | categoriaDefaultArgs> = $Result.GetResult<Prisma.$categoriaPayload, S>

  type categoriaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<categoriaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoriaCountAggregateInputType | true
    }

  export interface categoriaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['categoria'], meta: { name: 'categoria' } }
    /**
     * Find zero or one Categoria that matches the filter.
     * @param {categoriaFindUniqueArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends categoriaFindUniqueArgs>(args: SelectSubset<T, categoriaFindUniqueArgs<ExtArgs>>): Prisma__categoriaClient<$Result.GetResult<Prisma.$categoriaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Categoria that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {categoriaFindUniqueOrThrowArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends categoriaFindUniqueOrThrowArgs>(args: SelectSubset<T, categoriaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__categoriaClient<$Result.GetResult<Prisma.$categoriaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categoria that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriaFindFirstArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends categoriaFindFirstArgs>(args?: SelectSubset<T, categoriaFindFirstArgs<ExtArgs>>): Prisma__categoriaClient<$Result.GetResult<Prisma.$categoriaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categoria that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriaFindFirstOrThrowArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends categoriaFindFirstOrThrowArgs>(args?: SelectSubset<T, categoriaFindFirstOrThrowArgs<ExtArgs>>): Prisma__categoriaClient<$Result.GetResult<Prisma.$categoriaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categorias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categorias
     * const categorias = await prisma.categoria.findMany()
     * 
     * // Get first 10 Categorias
     * const categorias = await prisma.categoria.findMany({ take: 10 })
     * 
     * // Only select the `Id`
     * const categoriaWithIdOnly = await prisma.categoria.findMany({ select: { Id: true } })
     * 
     */
    findMany<T extends categoriaFindManyArgs>(args?: SelectSubset<T, categoriaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoriaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Categoria.
     * @param {categoriaCreateArgs} args - Arguments to create a Categoria.
     * @example
     * // Create one Categoria
     * const Categoria = await prisma.categoria.create({
     *   data: {
     *     // ... data to create a Categoria
     *   }
     * })
     * 
     */
    create<T extends categoriaCreateArgs>(args: SelectSubset<T, categoriaCreateArgs<ExtArgs>>): Prisma__categoriaClient<$Result.GetResult<Prisma.$categoriaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categorias.
     * @param {categoriaCreateManyArgs} args - Arguments to create many Categorias.
     * @example
     * // Create many Categorias
     * const categoria = await prisma.categoria.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends categoriaCreateManyArgs>(args?: SelectSubset<T, categoriaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Categoria.
     * @param {categoriaDeleteArgs} args - Arguments to delete one Categoria.
     * @example
     * // Delete one Categoria
     * const Categoria = await prisma.categoria.delete({
     *   where: {
     *     // ... filter to delete one Categoria
     *   }
     * })
     * 
     */
    delete<T extends categoriaDeleteArgs>(args: SelectSubset<T, categoriaDeleteArgs<ExtArgs>>): Prisma__categoriaClient<$Result.GetResult<Prisma.$categoriaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Categoria.
     * @param {categoriaUpdateArgs} args - Arguments to update one Categoria.
     * @example
     * // Update one Categoria
     * const categoria = await prisma.categoria.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends categoriaUpdateArgs>(args: SelectSubset<T, categoriaUpdateArgs<ExtArgs>>): Prisma__categoriaClient<$Result.GetResult<Prisma.$categoriaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categorias.
     * @param {categoriaDeleteManyArgs} args - Arguments to filter Categorias to delete.
     * @example
     * // Delete a few Categorias
     * const { count } = await prisma.categoria.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends categoriaDeleteManyArgs>(args?: SelectSubset<T, categoriaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categorias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categorias
     * const categoria = await prisma.categoria.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends categoriaUpdateManyArgs>(args: SelectSubset<T, categoriaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Categoria.
     * @param {categoriaUpsertArgs} args - Arguments to update or create a Categoria.
     * @example
     * // Update or create a Categoria
     * const categoria = await prisma.categoria.upsert({
     *   create: {
     *     // ... data to create a Categoria
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Categoria we want to update
     *   }
     * })
     */
    upsert<T extends categoriaUpsertArgs>(args: SelectSubset<T, categoriaUpsertArgs<ExtArgs>>): Prisma__categoriaClient<$Result.GetResult<Prisma.$categoriaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categorias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriaCountArgs} args - Arguments to filter Categorias to count.
     * @example
     * // Count the number of Categorias
     * const count = await prisma.categoria.count({
     *   where: {
     *     // ... the filter for the Categorias we want to count
     *   }
     * })
    **/
    count<T extends categoriaCountArgs>(
      args?: Subset<T, categoriaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoriaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Categoria.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoriaAggregateArgs>(args: Subset<T, CategoriaAggregateArgs>): Prisma.PrismaPromise<GetCategoriaAggregateType<T>>

    /**
     * Group by Categoria.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends categoriaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: categoriaGroupByArgs['orderBy'] }
        : { orderBy?: categoriaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, categoriaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoriaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the categoria model
   */
  readonly fields: categoriaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for categoria.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__categoriaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    producto<T extends categoria$productoArgs<ExtArgs> = {}>(args?: Subset<T, categoria$productoArgs<ExtArgs>>): Prisma__productoClient<$Result.GetResult<Prisma.$productoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the categoria model
   */
  interface categoriaFieldRefs {
    readonly Id: FieldRef<"categoria", 'String'>
    readonly nombre: FieldRef<"categoria", 'String'>
    readonly descripcion: FieldRef<"categoria", 'String'>
    readonly Id_producto: FieldRef<"categoria", 'String'>
  }
    

  // Custom InputTypes
  /**
   * categoria findUnique
   */
  export type categoriaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categoria
     */
    select?: categoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categoria
     */
    omit?: categoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriaInclude<ExtArgs> | null
    /**
     * Filter, which categoria to fetch.
     */
    where: categoriaWhereUniqueInput
  }

  /**
   * categoria findUniqueOrThrow
   */
  export type categoriaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categoria
     */
    select?: categoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categoria
     */
    omit?: categoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriaInclude<ExtArgs> | null
    /**
     * Filter, which categoria to fetch.
     */
    where: categoriaWhereUniqueInput
  }

  /**
   * categoria findFirst
   */
  export type categoriaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categoria
     */
    select?: categoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categoria
     */
    omit?: categoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriaInclude<ExtArgs> | null
    /**
     * Filter, which categoria to fetch.
     */
    where?: categoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categorias to fetch.
     */
    orderBy?: categoriaOrderByWithRelationInput | categoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for categorias.
     */
    cursor?: categoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of categorias.
     */
    distinct?: CategoriaScalarFieldEnum | CategoriaScalarFieldEnum[]
  }

  /**
   * categoria findFirstOrThrow
   */
  export type categoriaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categoria
     */
    select?: categoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categoria
     */
    omit?: categoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriaInclude<ExtArgs> | null
    /**
     * Filter, which categoria to fetch.
     */
    where?: categoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categorias to fetch.
     */
    orderBy?: categoriaOrderByWithRelationInput | categoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for categorias.
     */
    cursor?: categoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of categorias.
     */
    distinct?: CategoriaScalarFieldEnum | CategoriaScalarFieldEnum[]
  }

  /**
   * categoria findMany
   */
  export type categoriaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categoria
     */
    select?: categoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categoria
     */
    omit?: categoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriaInclude<ExtArgs> | null
    /**
     * Filter, which categorias to fetch.
     */
    where?: categoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categorias to fetch.
     */
    orderBy?: categoriaOrderByWithRelationInput | categoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing categorias.
     */
    cursor?: categoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categorias.
     */
    skip?: number
    distinct?: CategoriaScalarFieldEnum | CategoriaScalarFieldEnum[]
  }

  /**
   * categoria create
   */
  export type categoriaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categoria
     */
    select?: categoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categoria
     */
    omit?: categoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriaInclude<ExtArgs> | null
    /**
     * The data needed to create a categoria.
     */
    data?: XOR<categoriaCreateInput, categoriaUncheckedCreateInput>
  }

  /**
   * categoria createMany
   */
  export type categoriaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many categorias.
     */
    data: categoriaCreateManyInput | categoriaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * categoria update
   */
  export type categoriaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categoria
     */
    select?: categoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categoria
     */
    omit?: categoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriaInclude<ExtArgs> | null
    /**
     * The data needed to update a categoria.
     */
    data: XOR<categoriaUpdateInput, categoriaUncheckedUpdateInput>
    /**
     * Choose, which categoria to update.
     */
    where: categoriaWhereUniqueInput
  }

  /**
   * categoria updateMany
   */
  export type categoriaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update categorias.
     */
    data: XOR<categoriaUpdateManyMutationInput, categoriaUncheckedUpdateManyInput>
    /**
     * Filter which categorias to update
     */
    where?: categoriaWhereInput
    /**
     * Limit how many categorias to update.
     */
    limit?: number
  }

  /**
   * categoria upsert
   */
  export type categoriaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categoria
     */
    select?: categoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categoria
     */
    omit?: categoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriaInclude<ExtArgs> | null
    /**
     * The filter to search for the categoria to update in case it exists.
     */
    where: categoriaWhereUniqueInput
    /**
     * In case the categoria found by the `where` argument doesn't exist, create a new categoria with this data.
     */
    create: XOR<categoriaCreateInput, categoriaUncheckedCreateInput>
    /**
     * In case the categoria was found with the provided `where` argument, update it with this data.
     */
    update: XOR<categoriaUpdateInput, categoriaUncheckedUpdateInput>
  }

  /**
   * categoria delete
   */
  export type categoriaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categoria
     */
    select?: categoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categoria
     */
    omit?: categoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriaInclude<ExtArgs> | null
    /**
     * Filter which categoria to delete.
     */
    where: categoriaWhereUniqueInput
  }

  /**
   * categoria deleteMany
   */
  export type categoriaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which categorias to delete
     */
    where?: categoriaWhereInput
    /**
     * Limit how many categorias to delete.
     */
    limit?: number
  }

  /**
   * categoria.producto
   */
  export type categoria$productoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the producto
     */
    select?: productoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the producto
     */
    omit?: productoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productoInclude<ExtArgs> | null
    where?: productoWhereInput
  }

  /**
   * categoria without action
   */
  export type categoriaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categoria
     */
    select?: categoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categoria
     */
    omit?: categoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriaInclude<ExtArgs> | null
  }


  /**
   * Model compra
   */

  export type AggregateCompra = {
    _count: CompraCountAggregateOutputType | null
    _avg: CompraAvgAggregateOutputType | null
    _sum: CompraSumAggregateOutputType | null
    _min: CompraMinAggregateOutputType | null
    _max: CompraMaxAggregateOutputType | null
  }

  export type CompraAvgAggregateOutputType = {
    total: Decimal | null
  }

  export type CompraSumAggregateOutputType = {
    total: Decimal | null
  }

  export type CompraMinAggregateOutputType = {
    Id: string | null
    fecha: Date | null
    total: Decimal | null
    sku: string | null
    Id_proveedor: string | null
  }

  export type CompraMaxAggregateOutputType = {
    Id: string | null
    fecha: Date | null
    total: Decimal | null
    sku: string | null
    Id_proveedor: string | null
  }

  export type CompraCountAggregateOutputType = {
    Id: number
    fecha: number
    total: number
    sku: number
    Id_proveedor: number
    _all: number
  }


  export type CompraAvgAggregateInputType = {
    total?: true
  }

  export type CompraSumAggregateInputType = {
    total?: true
  }

  export type CompraMinAggregateInputType = {
    Id?: true
    fecha?: true
    total?: true
    sku?: true
    Id_proveedor?: true
  }

  export type CompraMaxAggregateInputType = {
    Id?: true
    fecha?: true
    total?: true
    sku?: true
    Id_proveedor?: true
  }

  export type CompraCountAggregateInputType = {
    Id?: true
    fecha?: true
    total?: true
    sku?: true
    Id_proveedor?: true
    _all?: true
  }

  export type CompraAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which compra to aggregate.
     */
    where?: compraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of compras to fetch.
     */
    orderBy?: compraOrderByWithRelationInput | compraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: compraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` compras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` compras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned compras
    **/
    _count?: true | CompraCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CompraAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CompraSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompraMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompraMaxAggregateInputType
  }

  export type GetCompraAggregateType<T extends CompraAggregateArgs> = {
        [P in keyof T & keyof AggregateCompra]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompra[P]>
      : GetScalarType<T[P], AggregateCompra[P]>
  }




  export type compraGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: compraWhereInput
    orderBy?: compraOrderByWithAggregationInput | compraOrderByWithAggregationInput[]
    by: CompraScalarFieldEnum[] | CompraScalarFieldEnum
    having?: compraScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompraCountAggregateInputType | true
    _avg?: CompraAvgAggregateInputType
    _sum?: CompraSumAggregateInputType
    _min?: CompraMinAggregateInputType
    _max?: CompraMaxAggregateInputType
  }

  export type CompraGroupByOutputType = {
    Id: string
    fecha: Date | null
    total: Decimal | null
    sku: string | null
    Id_proveedor: string | null
    _count: CompraCountAggregateOutputType | null
    _avg: CompraAvgAggregateOutputType | null
    _sum: CompraSumAggregateOutputType | null
    _min: CompraMinAggregateOutputType | null
    _max: CompraMaxAggregateOutputType | null
  }

  type GetCompraGroupByPayload<T extends compraGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompraGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompraGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompraGroupByOutputType[P]>
            : GetScalarType<T[P], CompraGroupByOutputType[P]>
        }
      >
    >


  export type compraSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    Id?: boolean
    fecha?: boolean
    total?: boolean
    sku?: boolean
    Id_proveedor?: boolean
    proveedor?: boolean | compra$proveedorArgs<ExtArgs>
    productocompra?: boolean | compra$productocompraArgs<ExtArgs>
    _count?: boolean | CompraCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["compra"]>



  export type compraSelectScalar = {
    Id?: boolean
    fecha?: boolean
    total?: boolean
    sku?: boolean
    Id_proveedor?: boolean
  }

  export type compraOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"Id" | "fecha" | "total" | "sku" | "Id_proveedor", ExtArgs["result"]["compra"]>
  export type compraInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    proveedor?: boolean | compra$proveedorArgs<ExtArgs>
    productocompra?: boolean | compra$productocompraArgs<ExtArgs>
    _count?: boolean | CompraCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $compraPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "compra"
    objects: {
      proveedor: Prisma.$proveedorPayload<ExtArgs> | null
      productocompra: Prisma.$productocompraPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      Id: string
      fecha: Date | null
      total: Prisma.Decimal | null
      sku: string | null
      Id_proveedor: string | null
    }, ExtArgs["result"]["compra"]>
    composites: {}
  }

  type compraGetPayload<S extends boolean | null | undefined | compraDefaultArgs> = $Result.GetResult<Prisma.$compraPayload, S>

  type compraCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<compraFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompraCountAggregateInputType | true
    }

  export interface compraDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['compra'], meta: { name: 'compra' } }
    /**
     * Find zero or one Compra that matches the filter.
     * @param {compraFindUniqueArgs} args - Arguments to find a Compra
     * @example
     * // Get one Compra
     * const compra = await prisma.compra.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends compraFindUniqueArgs>(args: SelectSubset<T, compraFindUniqueArgs<ExtArgs>>): Prisma__compraClient<$Result.GetResult<Prisma.$compraPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Compra that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {compraFindUniqueOrThrowArgs} args - Arguments to find a Compra
     * @example
     * // Get one Compra
     * const compra = await prisma.compra.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends compraFindUniqueOrThrowArgs>(args: SelectSubset<T, compraFindUniqueOrThrowArgs<ExtArgs>>): Prisma__compraClient<$Result.GetResult<Prisma.$compraPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Compra that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {compraFindFirstArgs} args - Arguments to find a Compra
     * @example
     * // Get one Compra
     * const compra = await prisma.compra.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends compraFindFirstArgs>(args?: SelectSubset<T, compraFindFirstArgs<ExtArgs>>): Prisma__compraClient<$Result.GetResult<Prisma.$compraPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Compra that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {compraFindFirstOrThrowArgs} args - Arguments to find a Compra
     * @example
     * // Get one Compra
     * const compra = await prisma.compra.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends compraFindFirstOrThrowArgs>(args?: SelectSubset<T, compraFindFirstOrThrowArgs<ExtArgs>>): Prisma__compraClient<$Result.GetResult<Prisma.$compraPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Compras that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {compraFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Compras
     * const compras = await prisma.compra.findMany()
     * 
     * // Get first 10 Compras
     * const compras = await prisma.compra.findMany({ take: 10 })
     * 
     * // Only select the `Id`
     * const compraWithIdOnly = await prisma.compra.findMany({ select: { Id: true } })
     * 
     */
    findMany<T extends compraFindManyArgs>(args?: SelectSubset<T, compraFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$compraPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Compra.
     * @param {compraCreateArgs} args - Arguments to create a Compra.
     * @example
     * // Create one Compra
     * const Compra = await prisma.compra.create({
     *   data: {
     *     // ... data to create a Compra
     *   }
     * })
     * 
     */
    create<T extends compraCreateArgs>(args: SelectSubset<T, compraCreateArgs<ExtArgs>>): Prisma__compraClient<$Result.GetResult<Prisma.$compraPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Compras.
     * @param {compraCreateManyArgs} args - Arguments to create many Compras.
     * @example
     * // Create many Compras
     * const compra = await prisma.compra.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends compraCreateManyArgs>(args?: SelectSubset<T, compraCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Compra.
     * @param {compraDeleteArgs} args - Arguments to delete one Compra.
     * @example
     * // Delete one Compra
     * const Compra = await prisma.compra.delete({
     *   where: {
     *     // ... filter to delete one Compra
     *   }
     * })
     * 
     */
    delete<T extends compraDeleteArgs>(args: SelectSubset<T, compraDeleteArgs<ExtArgs>>): Prisma__compraClient<$Result.GetResult<Prisma.$compraPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Compra.
     * @param {compraUpdateArgs} args - Arguments to update one Compra.
     * @example
     * // Update one Compra
     * const compra = await prisma.compra.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends compraUpdateArgs>(args: SelectSubset<T, compraUpdateArgs<ExtArgs>>): Prisma__compraClient<$Result.GetResult<Prisma.$compraPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Compras.
     * @param {compraDeleteManyArgs} args - Arguments to filter Compras to delete.
     * @example
     * // Delete a few Compras
     * const { count } = await prisma.compra.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends compraDeleteManyArgs>(args?: SelectSubset<T, compraDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Compras.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {compraUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Compras
     * const compra = await prisma.compra.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends compraUpdateManyArgs>(args: SelectSubset<T, compraUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Compra.
     * @param {compraUpsertArgs} args - Arguments to update or create a Compra.
     * @example
     * // Update or create a Compra
     * const compra = await prisma.compra.upsert({
     *   create: {
     *     // ... data to create a Compra
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Compra we want to update
     *   }
     * })
     */
    upsert<T extends compraUpsertArgs>(args: SelectSubset<T, compraUpsertArgs<ExtArgs>>): Prisma__compraClient<$Result.GetResult<Prisma.$compraPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Compras.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {compraCountArgs} args - Arguments to filter Compras to count.
     * @example
     * // Count the number of Compras
     * const count = await prisma.compra.count({
     *   where: {
     *     // ... the filter for the Compras we want to count
     *   }
     * })
    **/
    count<T extends compraCountArgs>(
      args?: Subset<T, compraCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompraCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Compra.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompraAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompraAggregateArgs>(args: Subset<T, CompraAggregateArgs>): Prisma.PrismaPromise<GetCompraAggregateType<T>>

    /**
     * Group by Compra.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {compraGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends compraGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: compraGroupByArgs['orderBy'] }
        : { orderBy?: compraGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, compraGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompraGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the compra model
   */
  readonly fields: compraFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for compra.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__compraClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    proveedor<T extends compra$proveedorArgs<ExtArgs> = {}>(args?: Subset<T, compra$proveedorArgs<ExtArgs>>): Prisma__proveedorClient<$Result.GetResult<Prisma.$proveedorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    productocompra<T extends compra$productocompraArgs<ExtArgs> = {}>(args?: Subset<T, compra$productocompraArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$productocompraPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the compra model
   */
  interface compraFieldRefs {
    readonly Id: FieldRef<"compra", 'String'>
    readonly fecha: FieldRef<"compra", 'DateTime'>
    readonly total: FieldRef<"compra", 'Decimal'>
    readonly sku: FieldRef<"compra", 'String'>
    readonly Id_proveedor: FieldRef<"compra", 'String'>
  }
    

  // Custom InputTypes
  /**
   * compra findUnique
   */
  export type compraFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the compra
     */
    select?: compraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the compra
     */
    omit?: compraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: compraInclude<ExtArgs> | null
    /**
     * Filter, which compra to fetch.
     */
    where: compraWhereUniqueInput
  }

  /**
   * compra findUniqueOrThrow
   */
  export type compraFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the compra
     */
    select?: compraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the compra
     */
    omit?: compraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: compraInclude<ExtArgs> | null
    /**
     * Filter, which compra to fetch.
     */
    where: compraWhereUniqueInput
  }

  /**
   * compra findFirst
   */
  export type compraFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the compra
     */
    select?: compraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the compra
     */
    omit?: compraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: compraInclude<ExtArgs> | null
    /**
     * Filter, which compra to fetch.
     */
    where?: compraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of compras to fetch.
     */
    orderBy?: compraOrderByWithRelationInput | compraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for compras.
     */
    cursor?: compraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` compras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` compras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of compras.
     */
    distinct?: CompraScalarFieldEnum | CompraScalarFieldEnum[]
  }

  /**
   * compra findFirstOrThrow
   */
  export type compraFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the compra
     */
    select?: compraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the compra
     */
    omit?: compraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: compraInclude<ExtArgs> | null
    /**
     * Filter, which compra to fetch.
     */
    where?: compraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of compras to fetch.
     */
    orderBy?: compraOrderByWithRelationInput | compraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for compras.
     */
    cursor?: compraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` compras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` compras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of compras.
     */
    distinct?: CompraScalarFieldEnum | CompraScalarFieldEnum[]
  }

  /**
   * compra findMany
   */
  export type compraFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the compra
     */
    select?: compraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the compra
     */
    omit?: compraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: compraInclude<ExtArgs> | null
    /**
     * Filter, which compras to fetch.
     */
    where?: compraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of compras to fetch.
     */
    orderBy?: compraOrderByWithRelationInput | compraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing compras.
     */
    cursor?: compraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` compras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` compras.
     */
    skip?: number
    distinct?: CompraScalarFieldEnum | CompraScalarFieldEnum[]
  }

  /**
   * compra create
   */
  export type compraCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the compra
     */
    select?: compraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the compra
     */
    omit?: compraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: compraInclude<ExtArgs> | null
    /**
     * The data needed to create a compra.
     */
    data?: XOR<compraCreateInput, compraUncheckedCreateInput>
  }

  /**
   * compra createMany
   */
  export type compraCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many compras.
     */
    data: compraCreateManyInput | compraCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * compra update
   */
  export type compraUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the compra
     */
    select?: compraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the compra
     */
    omit?: compraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: compraInclude<ExtArgs> | null
    /**
     * The data needed to update a compra.
     */
    data: XOR<compraUpdateInput, compraUncheckedUpdateInput>
    /**
     * Choose, which compra to update.
     */
    where: compraWhereUniqueInput
  }

  /**
   * compra updateMany
   */
  export type compraUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update compras.
     */
    data: XOR<compraUpdateManyMutationInput, compraUncheckedUpdateManyInput>
    /**
     * Filter which compras to update
     */
    where?: compraWhereInput
    /**
     * Limit how many compras to update.
     */
    limit?: number
  }

  /**
   * compra upsert
   */
  export type compraUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the compra
     */
    select?: compraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the compra
     */
    omit?: compraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: compraInclude<ExtArgs> | null
    /**
     * The filter to search for the compra to update in case it exists.
     */
    where: compraWhereUniqueInput
    /**
     * In case the compra found by the `where` argument doesn't exist, create a new compra with this data.
     */
    create: XOR<compraCreateInput, compraUncheckedCreateInput>
    /**
     * In case the compra was found with the provided `where` argument, update it with this data.
     */
    update: XOR<compraUpdateInput, compraUncheckedUpdateInput>
  }

  /**
   * compra delete
   */
  export type compraDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the compra
     */
    select?: compraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the compra
     */
    omit?: compraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: compraInclude<ExtArgs> | null
    /**
     * Filter which compra to delete.
     */
    where: compraWhereUniqueInput
  }

  /**
   * compra deleteMany
   */
  export type compraDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which compras to delete
     */
    where?: compraWhereInput
    /**
     * Limit how many compras to delete.
     */
    limit?: number
  }

  /**
   * compra.proveedor
   */
  export type compra$proveedorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proveedor
     */
    select?: proveedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the proveedor
     */
    omit?: proveedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proveedorInclude<ExtArgs> | null
    where?: proveedorWhereInput
  }

  /**
   * compra.productocompra
   */
  export type compra$productocompraArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productocompra
     */
    select?: productocompraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productocompra
     */
    omit?: productocompraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productocompraInclude<ExtArgs> | null
    where?: productocompraWhereInput
    orderBy?: productocompraOrderByWithRelationInput | productocompraOrderByWithRelationInput[]
    cursor?: productocompraWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductocompraScalarFieldEnum | ProductocompraScalarFieldEnum[]
  }

  /**
   * compra without action
   */
  export type compraDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the compra
     */
    select?: compraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the compra
     */
    omit?: compraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: compraInclude<ExtArgs> | null
  }


  /**
   * Model detallesventa
   */

  export type AggregateDetallesventa = {
    _count: DetallesventaCountAggregateOutputType | null
    _avg: DetallesventaAvgAggregateOutputType | null
    _sum: DetallesventaSumAggregateOutputType | null
    _min: DetallesventaMinAggregateOutputType | null
    _max: DetallesventaMaxAggregateOutputType | null
  }

  export type DetallesventaAvgAggregateOutputType = {
    cantidad_recibida: Decimal | null
    devuelto: Decimal | null
  }

  export type DetallesventaSumAggregateOutputType = {
    cantidad_recibida: Decimal | null
    devuelto: Decimal | null
  }

  export type DetallesventaMinAggregateOutputType = {
    Id: string | null
    cantidad_recibida: Decimal | null
    devuelto: Decimal | null
    Id_venta: string | null
    Id_producto: string | null
  }

  export type DetallesventaMaxAggregateOutputType = {
    Id: string | null
    cantidad_recibida: Decimal | null
    devuelto: Decimal | null
    Id_venta: string | null
    Id_producto: string | null
  }

  export type DetallesventaCountAggregateOutputType = {
    Id: number
    cantidad_recibida: number
    devuelto: number
    Id_venta: number
    Id_producto: number
    _all: number
  }


  export type DetallesventaAvgAggregateInputType = {
    cantidad_recibida?: true
    devuelto?: true
  }

  export type DetallesventaSumAggregateInputType = {
    cantidad_recibida?: true
    devuelto?: true
  }

  export type DetallesventaMinAggregateInputType = {
    Id?: true
    cantidad_recibida?: true
    devuelto?: true
    Id_venta?: true
    Id_producto?: true
  }

  export type DetallesventaMaxAggregateInputType = {
    Id?: true
    cantidad_recibida?: true
    devuelto?: true
    Id_venta?: true
    Id_producto?: true
  }

  export type DetallesventaCountAggregateInputType = {
    Id?: true
    cantidad_recibida?: true
    devuelto?: true
    Id_venta?: true
    Id_producto?: true
    _all?: true
  }

  export type DetallesventaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which detallesventa to aggregate.
     */
    where?: detallesventaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of detallesventas to fetch.
     */
    orderBy?: detallesventaOrderByWithRelationInput | detallesventaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: detallesventaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` detallesventas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` detallesventas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned detallesventas
    **/
    _count?: true | DetallesventaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DetallesventaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DetallesventaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DetallesventaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DetallesventaMaxAggregateInputType
  }

  export type GetDetallesventaAggregateType<T extends DetallesventaAggregateArgs> = {
        [P in keyof T & keyof AggregateDetallesventa]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDetallesventa[P]>
      : GetScalarType<T[P], AggregateDetallesventa[P]>
  }




  export type detallesventaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: detallesventaWhereInput
    orderBy?: detallesventaOrderByWithAggregationInput | detallesventaOrderByWithAggregationInput[]
    by: DetallesventaScalarFieldEnum[] | DetallesventaScalarFieldEnum
    having?: detallesventaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DetallesventaCountAggregateInputType | true
    _avg?: DetallesventaAvgAggregateInputType
    _sum?: DetallesventaSumAggregateInputType
    _min?: DetallesventaMinAggregateInputType
    _max?: DetallesventaMaxAggregateInputType
  }

  export type DetallesventaGroupByOutputType = {
    Id: string
    cantidad_recibida: Decimal | null
    devuelto: Decimal | null
    Id_venta: string | null
    Id_producto: string | null
    _count: DetallesventaCountAggregateOutputType | null
    _avg: DetallesventaAvgAggregateOutputType | null
    _sum: DetallesventaSumAggregateOutputType | null
    _min: DetallesventaMinAggregateOutputType | null
    _max: DetallesventaMaxAggregateOutputType | null
  }

  type GetDetallesventaGroupByPayload<T extends detallesventaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DetallesventaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DetallesventaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DetallesventaGroupByOutputType[P]>
            : GetScalarType<T[P], DetallesventaGroupByOutputType[P]>
        }
      >
    >


  export type detallesventaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    Id?: boolean
    cantidad_recibida?: boolean
    devuelto?: boolean
    Id_venta?: boolean
    Id_producto?: boolean
    venta?: boolean | detallesventa$ventaArgs<ExtArgs>
    producto?: boolean | detallesventa$productoArgs<ExtArgs>
  }, ExtArgs["result"]["detallesventa"]>



  export type detallesventaSelectScalar = {
    Id?: boolean
    cantidad_recibida?: boolean
    devuelto?: boolean
    Id_venta?: boolean
    Id_producto?: boolean
  }

  export type detallesventaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"Id" | "cantidad_recibida" | "devuelto" | "Id_venta" | "Id_producto", ExtArgs["result"]["detallesventa"]>
  export type detallesventaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    venta?: boolean | detallesventa$ventaArgs<ExtArgs>
    producto?: boolean | detallesventa$productoArgs<ExtArgs>
  }

  export type $detallesventaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "detallesventa"
    objects: {
      venta: Prisma.$ventaPayload<ExtArgs> | null
      producto: Prisma.$productoPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      Id: string
      cantidad_recibida: Prisma.Decimal | null
      devuelto: Prisma.Decimal | null
      Id_venta: string | null
      Id_producto: string | null
    }, ExtArgs["result"]["detallesventa"]>
    composites: {}
  }

  type detallesventaGetPayload<S extends boolean | null | undefined | detallesventaDefaultArgs> = $Result.GetResult<Prisma.$detallesventaPayload, S>

  type detallesventaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<detallesventaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DetallesventaCountAggregateInputType | true
    }

  export interface detallesventaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['detallesventa'], meta: { name: 'detallesventa' } }
    /**
     * Find zero or one Detallesventa that matches the filter.
     * @param {detallesventaFindUniqueArgs} args - Arguments to find a Detallesventa
     * @example
     * // Get one Detallesventa
     * const detallesventa = await prisma.detallesventa.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends detallesventaFindUniqueArgs>(args: SelectSubset<T, detallesventaFindUniqueArgs<ExtArgs>>): Prisma__detallesventaClient<$Result.GetResult<Prisma.$detallesventaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Detallesventa that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {detallesventaFindUniqueOrThrowArgs} args - Arguments to find a Detallesventa
     * @example
     * // Get one Detallesventa
     * const detallesventa = await prisma.detallesventa.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends detallesventaFindUniqueOrThrowArgs>(args: SelectSubset<T, detallesventaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__detallesventaClient<$Result.GetResult<Prisma.$detallesventaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Detallesventa that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {detallesventaFindFirstArgs} args - Arguments to find a Detallesventa
     * @example
     * // Get one Detallesventa
     * const detallesventa = await prisma.detallesventa.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends detallesventaFindFirstArgs>(args?: SelectSubset<T, detallesventaFindFirstArgs<ExtArgs>>): Prisma__detallesventaClient<$Result.GetResult<Prisma.$detallesventaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Detallesventa that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {detallesventaFindFirstOrThrowArgs} args - Arguments to find a Detallesventa
     * @example
     * // Get one Detallesventa
     * const detallesventa = await prisma.detallesventa.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends detallesventaFindFirstOrThrowArgs>(args?: SelectSubset<T, detallesventaFindFirstOrThrowArgs<ExtArgs>>): Prisma__detallesventaClient<$Result.GetResult<Prisma.$detallesventaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Detallesventas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {detallesventaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Detallesventas
     * const detallesventas = await prisma.detallesventa.findMany()
     * 
     * // Get first 10 Detallesventas
     * const detallesventas = await prisma.detallesventa.findMany({ take: 10 })
     * 
     * // Only select the `Id`
     * const detallesventaWithIdOnly = await prisma.detallesventa.findMany({ select: { Id: true } })
     * 
     */
    findMany<T extends detallesventaFindManyArgs>(args?: SelectSubset<T, detallesventaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$detallesventaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Detallesventa.
     * @param {detallesventaCreateArgs} args - Arguments to create a Detallesventa.
     * @example
     * // Create one Detallesventa
     * const Detallesventa = await prisma.detallesventa.create({
     *   data: {
     *     // ... data to create a Detallesventa
     *   }
     * })
     * 
     */
    create<T extends detallesventaCreateArgs>(args: SelectSubset<T, detallesventaCreateArgs<ExtArgs>>): Prisma__detallesventaClient<$Result.GetResult<Prisma.$detallesventaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Detallesventas.
     * @param {detallesventaCreateManyArgs} args - Arguments to create many Detallesventas.
     * @example
     * // Create many Detallesventas
     * const detallesventa = await prisma.detallesventa.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends detallesventaCreateManyArgs>(args?: SelectSubset<T, detallesventaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Detallesventa.
     * @param {detallesventaDeleteArgs} args - Arguments to delete one Detallesventa.
     * @example
     * // Delete one Detallesventa
     * const Detallesventa = await prisma.detallesventa.delete({
     *   where: {
     *     // ... filter to delete one Detallesventa
     *   }
     * })
     * 
     */
    delete<T extends detallesventaDeleteArgs>(args: SelectSubset<T, detallesventaDeleteArgs<ExtArgs>>): Prisma__detallesventaClient<$Result.GetResult<Prisma.$detallesventaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Detallesventa.
     * @param {detallesventaUpdateArgs} args - Arguments to update one Detallesventa.
     * @example
     * // Update one Detallesventa
     * const detallesventa = await prisma.detallesventa.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends detallesventaUpdateArgs>(args: SelectSubset<T, detallesventaUpdateArgs<ExtArgs>>): Prisma__detallesventaClient<$Result.GetResult<Prisma.$detallesventaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Detallesventas.
     * @param {detallesventaDeleteManyArgs} args - Arguments to filter Detallesventas to delete.
     * @example
     * // Delete a few Detallesventas
     * const { count } = await prisma.detallesventa.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends detallesventaDeleteManyArgs>(args?: SelectSubset<T, detallesventaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Detallesventas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {detallesventaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Detallesventas
     * const detallesventa = await prisma.detallesventa.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends detallesventaUpdateManyArgs>(args: SelectSubset<T, detallesventaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Detallesventa.
     * @param {detallesventaUpsertArgs} args - Arguments to update or create a Detallesventa.
     * @example
     * // Update or create a Detallesventa
     * const detallesventa = await prisma.detallesventa.upsert({
     *   create: {
     *     // ... data to create a Detallesventa
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Detallesventa we want to update
     *   }
     * })
     */
    upsert<T extends detallesventaUpsertArgs>(args: SelectSubset<T, detallesventaUpsertArgs<ExtArgs>>): Prisma__detallesventaClient<$Result.GetResult<Prisma.$detallesventaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Detallesventas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {detallesventaCountArgs} args - Arguments to filter Detallesventas to count.
     * @example
     * // Count the number of Detallesventas
     * const count = await prisma.detallesventa.count({
     *   where: {
     *     // ... the filter for the Detallesventas we want to count
     *   }
     * })
    **/
    count<T extends detallesventaCountArgs>(
      args?: Subset<T, detallesventaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DetallesventaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Detallesventa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DetallesventaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DetallesventaAggregateArgs>(args: Subset<T, DetallesventaAggregateArgs>): Prisma.PrismaPromise<GetDetallesventaAggregateType<T>>

    /**
     * Group by Detallesventa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {detallesventaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends detallesventaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: detallesventaGroupByArgs['orderBy'] }
        : { orderBy?: detallesventaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, detallesventaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDetallesventaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the detallesventa model
   */
  readonly fields: detallesventaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for detallesventa.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__detallesventaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    venta<T extends detallesventa$ventaArgs<ExtArgs> = {}>(args?: Subset<T, detallesventa$ventaArgs<ExtArgs>>): Prisma__ventaClient<$Result.GetResult<Prisma.$ventaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    producto<T extends detallesventa$productoArgs<ExtArgs> = {}>(args?: Subset<T, detallesventa$productoArgs<ExtArgs>>): Prisma__productoClient<$Result.GetResult<Prisma.$productoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the detallesventa model
   */
  interface detallesventaFieldRefs {
    readonly Id: FieldRef<"detallesventa", 'String'>
    readonly cantidad_recibida: FieldRef<"detallesventa", 'Decimal'>
    readonly devuelto: FieldRef<"detallesventa", 'Decimal'>
    readonly Id_venta: FieldRef<"detallesventa", 'String'>
    readonly Id_producto: FieldRef<"detallesventa", 'String'>
  }
    

  // Custom InputTypes
  /**
   * detallesventa findUnique
   */
  export type detallesventaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the detallesventa
     */
    select?: detallesventaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the detallesventa
     */
    omit?: detallesventaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: detallesventaInclude<ExtArgs> | null
    /**
     * Filter, which detallesventa to fetch.
     */
    where: detallesventaWhereUniqueInput
  }

  /**
   * detallesventa findUniqueOrThrow
   */
  export type detallesventaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the detallesventa
     */
    select?: detallesventaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the detallesventa
     */
    omit?: detallesventaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: detallesventaInclude<ExtArgs> | null
    /**
     * Filter, which detallesventa to fetch.
     */
    where: detallesventaWhereUniqueInput
  }

  /**
   * detallesventa findFirst
   */
  export type detallesventaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the detallesventa
     */
    select?: detallesventaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the detallesventa
     */
    omit?: detallesventaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: detallesventaInclude<ExtArgs> | null
    /**
     * Filter, which detallesventa to fetch.
     */
    where?: detallesventaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of detallesventas to fetch.
     */
    orderBy?: detallesventaOrderByWithRelationInput | detallesventaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for detallesventas.
     */
    cursor?: detallesventaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` detallesventas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` detallesventas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of detallesventas.
     */
    distinct?: DetallesventaScalarFieldEnum | DetallesventaScalarFieldEnum[]
  }

  /**
   * detallesventa findFirstOrThrow
   */
  export type detallesventaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the detallesventa
     */
    select?: detallesventaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the detallesventa
     */
    omit?: detallesventaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: detallesventaInclude<ExtArgs> | null
    /**
     * Filter, which detallesventa to fetch.
     */
    where?: detallesventaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of detallesventas to fetch.
     */
    orderBy?: detallesventaOrderByWithRelationInput | detallesventaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for detallesventas.
     */
    cursor?: detallesventaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` detallesventas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` detallesventas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of detallesventas.
     */
    distinct?: DetallesventaScalarFieldEnum | DetallesventaScalarFieldEnum[]
  }

  /**
   * detallesventa findMany
   */
  export type detallesventaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the detallesventa
     */
    select?: detallesventaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the detallesventa
     */
    omit?: detallesventaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: detallesventaInclude<ExtArgs> | null
    /**
     * Filter, which detallesventas to fetch.
     */
    where?: detallesventaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of detallesventas to fetch.
     */
    orderBy?: detallesventaOrderByWithRelationInput | detallesventaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing detallesventas.
     */
    cursor?: detallesventaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` detallesventas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` detallesventas.
     */
    skip?: number
    distinct?: DetallesventaScalarFieldEnum | DetallesventaScalarFieldEnum[]
  }

  /**
   * detallesventa create
   */
  export type detallesventaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the detallesventa
     */
    select?: detallesventaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the detallesventa
     */
    omit?: detallesventaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: detallesventaInclude<ExtArgs> | null
    /**
     * The data needed to create a detallesventa.
     */
    data?: XOR<detallesventaCreateInput, detallesventaUncheckedCreateInput>
  }

  /**
   * detallesventa createMany
   */
  export type detallesventaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many detallesventas.
     */
    data: detallesventaCreateManyInput | detallesventaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * detallesventa update
   */
  export type detallesventaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the detallesventa
     */
    select?: detallesventaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the detallesventa
     */
    omit?: detallesventaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: detallesventaInclude<ExtArgs> | null
    /**
     * The data needed to update a detallesventa.
     */
    data: XOR<detallesventaUpdateInput, detallesventaUncheckedUpdateInput>
    /**
     * Choose, which detallesventa to update.
     */
    where: detallesventaWhereUniqueInput
  }

  /**
   * detallesventa updateMany
   */
  export type detallesventaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update detallesventas.
     */
    data: XOR<detallesventaUpdateManyMutationInput, detallesventaUncheckedUpdateManyInput>
    /**
     * Filter which detallesventas to update
     */
    where?: detallesventaWhereInput
    /**
     * Limit how many detallesventas to update.
     */
    limit?: number
  }

  /**
   * detallesventa upsert
   */
  export type detallesventaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the detallesventa
     */
    select?: detallesventaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the detallesventa
     */
    omit?: detallesventaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: detallesventaInclude<ExtArgs> | null
    /**
     * The filter to search for the detallesventa to update in case it exists.
     */
    where: detallesventaWhereUniqueInput
    /**
     * In case the detallesventa found by the `where` argument doesn't exist, create a new detallesventa with this data.
     */
    create: XOR<detallesventaCreateInput, detallesventaUncheckedCreateInput>
    /**
     * In case the detallesventa was found with the provided `where` argument, update it with this data.
     */
    update: XOR<detallesventaUpdateInput, detallesventaUncheckedUpdateInput>
  }

  /**
   * detallesventa delete
   */
  export type detallesventaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the detallesventa
     */
    select?: detallesventaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the detallesventa
     */
    omit?: detallesventaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: detallesventaInclude<ExtArgs> | null
    /**
     * Filter which detallesventa to delete.
     */
    where: detallesventaWhereUniqueInput
  }

  /**
   * detallesventa deleteMany
   */
  export type detallesventaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which detallesventas to delete
     */
    where?: detallesventaWhereInput
    /**
     * Limit how many detallesventas to delete.
     */
    limit?: number
  }

  /**
   * detallesventa.venta
   */
  export type detallesventa$ventaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the venta
     */
    select?: ventaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the venta
     */
    omit?: ventaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ventaInclude<ExtArgs> | null
    where?: ventaWhereInput
  }

  /**
   * detallesventa.producto
   */
  export type detallesventa$productoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the producto
     */
    select?: productoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the producto
     */
    omit?: productoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productoInclude<ExtArgs> | null
    where?: productoWhereInput
  }

  /**
   * detallesventa without action
   */
  export type detallesventaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the detallesventa
     */
    select?: detallesventaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the detallesventa
     */
    omit?: detallesventaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: detallesventaInclude<ExtArgs> | null
  }


  /**
   * Model producto
   */

  export type AggregateProducto = {
    _count: ProductoCountAggregateOutputType | null
    _avg: ProductoAvgAggregateOutputType | null
    _sum: ProductoSumAggregateOutputType | null
    _min: ProductoMinAggregateOutputType | null
    _max: ProductoMaxAggregateOutputType | null
  }

  export type ProductoAvgAggregateOutputType = {
    precioventa: Decimal | null
    preciodeproveedor: Decimal | null
    preciokilo: Decimal | null
  }

  export type ProductoSumAggregateOutputType = {
    precioventa: Decimal | null
    preciodeproveedor: Decimal | null
    preciokilo: Decimal | null
  }

  export type ProductoMinAggregateOutputType = {
    Id: string | null
    nombre: string | null
    descripcion: string | null
    codigobarra: string | null
    fotoUrl: string | null
    precioventa: Decimal | null
    preciodeproveedor: Decimal | null
    preciokilo: Decimal | null
    unidaddemedida: string | null
    esgranel: boolean | null
    Id_almacen: string | null
  }

  export type ProductoMaxAggregateOutputType = {
    Id: string | null
    nombre: string | null
    descripcion: string | null
    codigobarra: string | null
    fotoUrl: string | null
    precioventa: Decimal | null
    preciodeproveedor: Decimal | null
    preciokilo: Decimal | null
    unidaddemedida: string | null
    esgranel: boolean | null
    Id_almacen: string | null
  }

  export type ProductoCountAggregateOutputType = {
    Id: number
    nombre: number
    descripcion: number
    codigobarra: number
    fotoUrl: number
    precioventa: number
    preciodeproveedor: number
    preciokilo: number
    unidaddemedida: number
    esgranel: number
    Id_almacen: number
    _all: number
  }


  export type ProductoAvgAggregateInputType = {
    precioventa?: true
    preciodeproveedor?: true
    preciokilo?: true
  }

  export type ProductoSumAggregateInputType = {
    precioventa?: true
    preciodeproveedor?: true
    preciokilo?: true
  }

  export type ProductoMinAggregateInputType = {
    Id?: true
    nombre?: true
    descripcion?: true
    codigobarra?: true
    fotoUrl?: true
    precioventa?: true
    preciodeproveedor?: true
    preciokilo?: true
    unidaddemedida?: true
    esgranel?: true
    Id_almacen?: true
  }

  export type ProductoMaxAggregateInputType = {
    Id?: true
    nombre?: true
    descripcion?: true
    codigobarra?: true
    fotoUrl?: true
    precioventa?: true
    preciodeproveedor?: true
    preciokilo?: true
    unidaddemedida?: true
    esgranel?: true
    Id_almacen?: true
  }

  export type ProductoCountAggregateInputType = {
    Id?: true
    nombre?: true
    descripcion?: true
    codigobarra?: true
    fotoUrl?: true
    precioventa?: true
    preciodeproveedor?: true
    preciokilo?: true
    unidaddemedida?: true
    esgranel?: true
    Id_almacen?: true
    _all?: true
  }

  export type ProductoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which producto to aggregate.
     */
    where?: productoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of productos to fetch.
     */
    orderBy?: productoOrderByWithRelationInput | productoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: productoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` productos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` productos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned productos
    **/
    _count?: true | ProductoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductoMaxAggregateInputType
  }

  export type GetProductoAggregateType<T extends ProductoAggregateArgs> = {
        [P in keyof T & keyof AggregateProducto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProducto[P]>
      : GetScalarType<T[P], AggregateProducto[P]>
  }




  export type productoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: productoWhereInput
    orderBy?: productoOrderByWithAggregationInput | productoOrderByWithAggregationInput[]
    by: ProductoScalarFieldEnum[] | ProductoScalarFieldEnum
    having?: productoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductoCountAggregateInputType | true
    _avg?: ProductoAvgAggregateInputType
    _sum?: ProductoSumAggregateInputType
    _min?: ProductoMinAggregateInputType
    _max?: ProductoMaxAggregateInputType
  }

  export type ProductoGroupByOutputType = {
    Id: string
    nombre: string | null
    descripcion: string | null
    codigobarra: string | null
    fotoUrl: string | null
    precioventa: Decimal | null
    preciodeproveedor: Decimal | null
    preciokilo: Decimal | null
    unidaddemedida: string | null
    esgranel: boolean | null
    Id_almacen: string | null
    _count: ProductoCountAggregateOutputType | null
    _avg: ProductoAvgAggregateOutputType | null
    _sum: ProductoSumAggregateOutputType | null
    _min: ProductoMinAggregateOutputType | null
    _max: ProductoMaxAggregateOutputType | null
  }

  type GetProductoGroupByPayload<T extends productoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductoGroupByOutputType[P]>
            : GetScalarType<T[P], ProductoGroupByOutputType[P]>
        }
      >
    >


  export type productoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    Id?: boolean
    nombre?: boolean
    descripcion?: boolean
    codigobarra?: boolean
    fotoUrl?: boolean
    precioventa?: boolean
    preciodeproveedor?: boolean
    preciokilo?: boolean
    unidaddemedida?: boolean
    esgranel?: boolean
    Id_almacen?: boolean
    categoria?: boolean | producto$categoriaArgs<ExtArgs>
    detallesventa?: boolean | producto$detallesventaArgs<ExtArgs>
    almacen?: boolean | producto$almacenArgs<ExtArgs>
    productocompra?: boolean | producto$productocompraArgs<ExtArgs>
    _count?: boolean | ProductoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["producto"]>



  export type productoSelectScalar = {
    Id?: boolean
    nombre?: boolean
    descripcion?: boolean
    codigobarra?: boolean
    fotoUrl?: boolean
    precioventa?: boolean
    preciodeproveedor?: boolean
    preciokilo?: boolean
    unidaddemedida?: boolean
    esgranel?: boolean
    Id_almacen?: boolean
  }

  export type productoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"Id" | "nombre" | "descripcion" | "codigobarra" | "fotoUrl" | "precioventa" | "preciodeproveedor" | "preciokilo" | "unidaddemedida" | "esgranel" | "Id_almacen", ExtArgs["result"]["producto"]>
  export type productoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categoria?: boolean | producto$categoriaArgs<ExtArgs>
    detallesventa?: boolean | producto$detallesventaArgs<ExtArgs>
    almacen?: boolean | producto$almacenArgs<ExtArgs>
    productocompra?: boolean | producto$productocompraArgs<ExtArgs>
    _count?: boolean | ProductoCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $productoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "producto"
    objects: {
      categoria: Prisma.$categoriaPayload<ExtArgs>[]
      detallesventa: Prisma.$detallesventaPayload<ExtArgs>[]
      almacen: Prisma.$almacenPayload<ExtArgs> | null
      productocompra: Prisma.$productocompraPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      Id: string
      nombre: string | null
      descripcion: string | null
      codigobarra: string | null
      fotoUrl: string | null
      precioventa: Prisma.Decimal | null
      preciodeproveedor: Prisma.Decimal | null
      preciokilo: Prisma.Decimal | null
      unidaddemedida: string | null
      esgranel: boolean | null
      Id_almacen: string | null
    }, ExtArgs["result"]["producto"]>
    composites: {}
  }

  type productoGetPayload<S extends boolean | null | undefined | productoDefaultArgs> = $Result.GetResult<Prisma.$productoPayload, S>

  type productoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<productoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductoCountAggregateInputType | true
    }

  export interface productoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['producto'], meta: { name: 'producto' } }
    /**
     * Find zero or one Producto that matches the filter.
     * @param {productoFindUniqueArgs} args - Arguments to find a Producto
     * @example
     * // Get one Producto
     * const producto = await prisma.producto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends productoFindUniqueArgs>(args: SelectSubset<T, productoFindUniqueArgs<ExtArgs>>): Prisma__productoClient<$Result.GetResult<Prisma.$productoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Producto that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {productoFindUniqueOrThrowArgs} args - Arguments to find a Producto
     * @example
     * // Get one Producto
     * const producto = await prisma.producto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends productoFindUniqueOrThrowArgs>(args: SelectSubset<T, productoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__productoClient<$Result.GetResult<Prisma.$productoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Producto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productoFindFirstArgs} args - Arguments to find a Producto
     * @example
     * // Get one Producto
     * const producto = await prisma.producto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends productoFindFirstArgs>(args?: SelectSubset<T, productoFindFirstArgs<ExtArgs>>): Prisma__productoClient<$Result.GetResult<Prisma.$productoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Producto that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productoFindFirstOrThrowArgs} args - Arguments to find a Producto
     * @example
     * // Get one Producto
     * const producto = await prisma.producto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends productoFindFirstOrThrowArgs>(args?: SelectSubset<T, productoFindFirstOrThrowArgs<ExtArgs>>): Prisma__productoClient<$Result.GetResult<Prisma.$productoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Productos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Productos
     * const productos = await prisma.producto.findMany()
     * 
     * // Get first 10 Productos
     * const productos = await prisma.producto.findMany({ take: 10 })
     * 
     * // Only select the `Id`
     * const productoWithIdOnly = await prisma.producto.findMany({ select: { Id: true } })
     * 
     */
    findMany<T extends productoFindManyArgs>(args?: SelectSubset<T, productoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$productoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Producto.
     * @param {productoCreateArgs} args - Arguments to create a Producto.
     * @example
     * // Create one Producto
     * const Producto = await prisma.producto.create({
     *   data: {
     *     // ... data to create a Producto
     *   }
     * })
     * 
     */
    create<T extends productoCreateArgs>(args: SelectSubset<T, productoCreateArgs<ExtArgs>>): Prisma__productoClient<$Result.GetResult<Prisma.$productoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Productos.
     * @param {productoCreateManyArgs} args - Arguments to create many Productos.
     * @example
     * // Create many Productos
     * const producto = await prisma.producto.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends productoCreateManyArgs>(args?: SelectSubset<T, productoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Producto.
     * @param {productoDeleteArgs} args - Arguments to delete one Producto.
     * @example
     * // Delete one Producto
     * const Producto = await prisma.producto.delete({
     *   where: {
     *     // ... filter to delete one Producto
     *   }
     * })
     * 
     */
    delete<T extends productoDeleteArgs>(args: SelectSubset<T, productoDeleteArgs<ExtArgs>>): Prisma__productoClient<$Result.GetResult<Prisma.$productoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Producto.
     * @param {productoUpdateArgs} args - Arguments to update one Producto.
     * @example
     * // Update one Producto
     * const producto = await prisma.producto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends productoUpdateArgs>(args: SelectSubset<T, productoUpdateArgs<ExtArgs>>): Prisma__productoClient<$Result.GetResult<Prisma.$productoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Productos.
     * @param {productoDeleteManyArgs} args - Arguments to filter Productos to delete.
     * @example
     * // Delete a few Productos
     * const { count } = await prisma.producto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends productoDeleteManyArgs>(args?: SelectSubset<T, productoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Productos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Productos
     * const producto = await prisma.producto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends productoUpdateManyArgs>(args: SelectSubset<T, productoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Producto.
     * @param {productoUpsertArgs} args - Arguments to update or create a Producto.
     * @example
     * // Update or create a Producto
     * const producto = await prisma.producto.upsert({
     *   create: {
     *     // ... data to create a Producto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Producto we want to update
     *   }
     * })
     */
    upsert<T extends productoUpsertArgs>(args: SelectSubset<T, productoUpsertArgs<ExtArgs>>): Prisma__productoClient<$Result.GetResult<Prisma.$productoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Productos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productoCountArgs} args - Arguments to filter Productos to count.
     * @example
     * // Count the number of Productos
     * const count = await prisma.producto.count({
     *   where: {
     *     // ... the filter for the Productos we want to count
     *   }
     * })
    **/
    count<T extends productoCountArgs>(
      args?: Subset<T, productoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Producto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductoAggregateArgs>(args: Subset<T, ProductoAggregateArgs>): Prisma.PrismaPromise<GetProductoAggregateType<T>>

    /**
     * Group by Producto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends productoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: productoGroupByArgs['orderBy'] }
        : { orderBy?: productoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, productoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the producto model
   */
  readonly fields: productoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for producto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__productoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    categoria<T extends producto$categoriaArgs<ExtArgs> = {}>(args?: Subset<T, producto$categoriaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoriaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    detallesventa<T extends producto$detallesventaArgs<ExtArgs> = {}>(args?: Subset<T, producto$detallesventaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$detallesventaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    almacen<T extends producto$almacenArgs<ExtArgs> = {}>(args?: Subset<T, producto$almacenArgs<ExtArgs>>): Prisma__almacenClient<$Result.GetResult<Prisma.$almacenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    productocompra<T extends producto$productocompraArgs<ExtArgs> = {}>(args?: Subset<T, producto$productocompraArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$productocompraPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the producto model
   */
  interface productoFieldRefs {
    readonly Id: FieldRef<"producto", 'String'>
    readonly nombre: FieldRef<"producto", 'String'>
    readonly descripcion: FieldRef<"producto", 'String'>
    readonly codigobarra: FieldRef<"producto", 'String'>
    readonly fotoUrl: FieldRef<"producto", 'String'>
    readonly precioventa: FieldRef<"producto", 'Decimal'>
    readonly preciodeproveedor: FieldRef<"producto", 'Decimal'>
    readonly preciokilo: FieldRef<"producto", 'Decimal'>
    readonly unidaddemedida: FieldRef<"producto", 'String'>
    readonly esgranel: FieldRef<"producto", 'Boolean'>
    readonly Id_almacen: FieldRef<"producto", 'String'>
  }
    

  // Custom InputTypes
  /**
   * producto findUnique
   */
  export type productoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the producto
     */
    select?: productoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the producto
     */
    omit?: productoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productoInclude<ExtArgs> | null
    /**
     * Filter, which producto to fetch.
     */
    where: productoWhereUniqueInput
  }

  /**
   * producto findUniqueOrThrow
   */
  export type productoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the producto
     */
    select?: productoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the producto
     */
    omit?: productoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productoInclude<ExtArgs> | null
    /**
     * Filter, which producto to fetch.
     */
    where: productoWhereUniqueInput
  }

  /**
   * producto findFirst
   */
  export type productoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the producto
     */
    select?: productoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the producto
     */
    omit?: productoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productoInclude<ExtArgs> | null
    /**
     * Filter, which producto to fetch.
     */
    where?: productoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of productos to fetch.
     */
    orderBy?: productoOrderByWithRelationInput | productoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for productos.
     */
    cursor?: productoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` productos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` productos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of productos.
     */
    distinct?: ProductoScalarFieldEnum | ProductoScalarFieldEnum[]
  }

  /**
   * producto findFirstOrThrow
   */
  export type productoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the producto
     */
    select?: productoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the producto
     */
    omit?: productoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productoInclude<ExtArgs> | null
    /**
     * Filter, which producto to fetch.
     */
    where?: productoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of productos to fetch.
     */
    orderBy?: productoOrderByWithRelationInput | productoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for productos.
     */
    cursor?: productoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` productos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` productos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of productos.
     */
    distinct?: ProductoScalarFieldEnum | ProductoScalarFieldEnum[]
  }

  /**
   * producto findMany
   */
  export type productoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the producto
     */
    select?: productoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the producto
     */
    omit?: productoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productoInclude<ExtArgs> | null
    /**
     * Filter, which productos to fetch.
     */
    where?: productoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of productos to fetch.
     */
    orderBy?: productoOrderByWithRelationInput | productoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing productos.
     */
    cursor?: productoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` productos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` productos.
     */
    skip?: number
    distinct?: ProductoScalarFieldEnum | ProductoScalarFieldEnum[]
  }

  /**
   * producto create
   */
  export type productoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the producto
     */
    select?: productoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the producto
     */
    omit?: productoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productoInclude<ExtArgs> | null
    /**
     * The data needed to create a producto.
     */
    data?: XOR<productoCreateInput, productoUncheckedCreateInput>
  }

  /**
   * producto createMany
   */
  export type productoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many productos.
     */
    data: productoCreateManyInput | productoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * producto update
   */
  export type productoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the producto
     */
    select?: productoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the producto
     */
    omit?: productoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productoInclude<ExtArgs> | null
    /**
     * The data needed to update a producto.
     */
    data: XOR<productoUpdateInput, productoUncheckedUpdateInput>
    /**
     * Choose, which producto to update.
     */
    where: productoWhereUniqueInput
  }

  /**
   * producto updateMany
   */
  export type productoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update productos.
     */
    data: XOR<productoUpdateManyMutationInput, productoUncheckedUpdateManyInput>
    /**
     * Filter which productos to update
     */
    where?: productoWhereInput
    /**
     * Limit how many productos to update.
     */
    limit?: number
  }

  /**
   * producto upsert
   */
  export type productoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the producto
     */
    select?: productoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the producto
     */
    omit?: productoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productoInclude<ExtArgs> | null
    /**
     * The filter to search for the producto to update in case it exists.
     */
    where: productoWhereUniqueInput
    /**
     * In case the producto found by the `where` argument doesn't exist, create a new producto with this data.
     */
    create: XOR<productoCreateInput, productoUncheckedCreateInput>
    /**
     * In case the producto was found with the provided `where` argument, update it with this data.
     */
    update: XOR<productoUpdateInput, productoUncheckedUpdateInput>
  }

  /**
   * producto delete
   */
  export type productoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the producto
     */
    select?: productoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the producto
     */
    omit?: productoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productoInclude<ExtArgs> | null
    /**
     * Filter which producto to delete.
     */
    where: productoWhereUniqueInput
  }

  /**
   * producto deleteMany
   */
  export type productoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which productos to delete
     */
    where?: productoWhereInput
    /**
     * Limit how many productos to delete.
     */
    limit?: number
  }

  /**
   * producto.categoria
   */
  export type producto$categoriaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categoria
     */
    select?: categoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categoria
     */
    omit?: categoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriaInclude<ExtArgs> | null
    where?: categoriaWhereInput
    orderBy?: categoriaOrderByWithRelationInput | categoriaOrderByWithRelationInput[]
    cursor?: categoriaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoriaScalarFieldEnum | CategoriaScalarFieldEnum[]
  }

  /**
   * producto.detallesventa
   */
  export type producto$detallesventaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the detallesventa
     */
    select?: detallesventaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the detallesventa
     */
    omit?: detallesventaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: detallesventaInclude<ExtArgs> | null
    where?: detallesventaWhereInput
    orderBy?: detallesventaOrderByWithRelationInput | detallesventaOrderByWithRelationInput[]
    cursor?: detallesventaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DetallesventaScalarFieldEnum | DetallesventaScalarFieldEnum[]
  }

  /**
   * producto.almacen
   */
  export type producto$almacenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the almacen
     */
    select?: almacenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the almacen
     */
    omit?: almacenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: almacenInclude<ExtArgs> | null
    where?: almacenWhereInput
  }

  /**
   * producto.productocompra
   */
  export type producto$productocompraArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productocompra
     */
    select?: productocompraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productocompra
     */
    omit?: productocompraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productocompraInclude<ExtArgs> | null
    where?: productocompraWhereInput
    orderBy?: productocompraOrderByWithRelationInput | productocompraOrderByWithRelationInput[]
    cursor?: productocompraWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductocompraScalarFieldEnum | ProductocompraScalarFieldEnum[]
  }

  /**
   * producto without action
   */
  export type productoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the producto
     */
    select?: productoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the producto
     */
    omit?: productoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productoInclude<ExtArgs> | null
  }


  /**
   * Model productocompra
   */

  export type AggregateProductocompra = {
    _count: ProductocompraCountAggregateOutputType | null
    _avg: ProductocompraAvgAggregateOutputType | null
    _sum: ProductocompraSumAggregateOutputType | null
    _min: ProductocompraMinAggregateOutputType | null
    _max: ProductocompraMaxAggregateOutputType | null
  }

  export type ProductocompraAvgAggregateOutputType = {
    cantidad: number | null
  }

  export type ProductocompraSumAggregateOutputType = {
    cantidad: number | null
  }

  export type ProductocompraMinAggregateOutputType = {
    Id: string | null
    cantidad: number | null
    Id_producto: string | null
    Id_compra: string | null
  }

  export type ProductocompraMaxAggregateOutputType = {
    Id: string | null
    cantidad: number | null
    Id_producto: string | null
    Id_compra: string | null
  }

  export type ProductocompraCountAggregateOutputType = {
    Id: number
    cantidad: number
    Id_producto: number
    Id_compra: number
    _all: number
  }


  export type ProductocompraAvgAggregateInputType = {
    cantidad?: true
  }

  export type ProductocompraSumAggregateInputType = {
    cantidad?: true
  }

  export type ProductocompraMinAggregateInputType = {
    Id?: true
    cantidad?: true
    Id_producto?: true
    Id_compra?: true
  }

  export type ProductocompraMaxAggregateInputType = {
    Id?: true
    cantidad?: true
    Id_producto?: true
    Id_compra?: true
  }

  export type ProductocompraCountAggregateInputType = {
    Id?: true
    cantidad?: true
    Id_producto?: true
    Id_compra?: true
    _all?: true
  }

  export type ProductocompraAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which productocompra to aggregate.
     */
    where?: productocompraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of productocompras to fetch.
     */
    orderBy?: productocompraOrderByWithRelationInput | productocompraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: productocompraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` productocompras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` productocompras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned productocompras
    **/
    _count?: true | ProductocompraCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductocompraAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductocompraSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductocompraMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductocompraMaxAggregateInputType
  }

  export type GetProductocompraAggregateType<T extends ProductocompraAggregateArgs> = {
        [P in keyof T & keyof AggregateProductocompra]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductocompra[P]>
      : GetScalarType<T[P], AggregateProductocompra[P]>
  }




  export type productocompraGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: productocompraWhereInput
    orderBy?: productocompraOrderByWithAggregationInput | productocompraOrderByWithAggregationInput[]
    by: ProductocompraScalarFieldEnum[] | ProductocompraScalarFieldEnum
    having?: productocompraScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductocompraCountAggregateInputType | true
    _avg?: ProductocompraAvgAggregateInputType
    _sum?: ProductocompraSumAggregateInputType
    _min?: ProductocompraMinAggregateInputType
    _max?: ProductocompraMaxAggregateInputType
  }

  export type ProductocompraGroupByOutputType = {
    Id: string
    cantidad: number | null
    Id_producto: string | null
    Id_compra: string | null
    _count: ProductocompraCountAggregateOutputType | null
    _avg: ProductocompraAvgAggregateOutputType | null
    _sum: ProductocompraSumAggregateOutputType | null
    _min: ProductocompraMinAggregateOutputType | null
    _max: ProductocompraMaxAggregateOutputType | null
  }

  type GetProductocompraGroupByPayload<T extends productocompraGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductocompraGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductocompraGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductocompraGroupByOutputType[P]>
            : GetScalarType<T[P], ProductocompraGroupByOutputType[P]>
        }
      >
    >


  export type productocompraSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    Id?: boolean
    cantidad?: boolean
    Id_producto?: boolean
    Id_compra?: boolean
    producto?: boolean | productocompra$productoArgs<ExtArgs>
    compra?: boolean | productocompra$compraArgs<ExtArgs>
  }, ExtArgs["result"]["productocompra"]>



  export type productocompraSelectScalar = {
    Id?: boolean
    cantidad?: boolean
    Id_producto?: boolean
    Id_compra?: boolean
  }

  export type productocompraOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"Id" | "cantidad" | "Id_producto" | "Id_compra", ExtArgs["result"]["productocompra"]>
  export type productocompraInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    producto?: boolean | productocompra$productoArgs<ExtArgs>
    compra?: boolean | productocompra$compraArgs<ExtArgs>
  }

  export type $productocompraPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "productocompra"
    objects: {
      producto: Prisma.$productoPayload<ExtArgs> | null
      compra: Prisma.$compraPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      Id: string
      cantidad: number | null
      Id_producto: string | null
      Id_compra: string | null
    }, ExtArgs["result"]["productocompra"]>
    composites: {}
  }

  type productocompraGetPayload<S extends boolean | null | undefined | productocompraDefaultArgs> = $Result.GetResult<Prisma.$productocompraPayload, S>

  type productocompraCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<productocompraFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductocompraCountAggregateInputType | true
    }

  export interface productocompraDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['productocompra'], meta: { name: 'productocompra' } }
    /**
     * Find zero or one Productocompra that matches the filter.
     * @param {productocompraFindUniqueArgs} args - Arguments to find a Productocompra
     * @example
     * // Get one Productocompra
     * const productocompra = await prisma.productocompra.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends productocompraFindUniqueArgs>(args: SelectSubset<T, productocompraFindUniqueArgs<ExtArgs>>): Prisma__productocompraClient<$Result.GetResult<Prisma.$productocompraPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Productocompra that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {productocompraFindUniqueOrThrowArgs} args - Arguments to find a Productocompra
     * @example
     * // Get one Productocompra
     * const productocompra = await prisma.productocompra.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends productocompraFindUniqueOrThrowArgs>(args: SelectSubset<T, productocompraFindUniqueOrThrowArgs<ExtArgs>>): Prisma__productocompraClient<$Result.GetResult<Prisma.$productocompraPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Productocompra that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productocompraFindFirstArgs} args - Arguments to find a Productocompra
     * @example
     * // Get one Productocompra
     * const productocompra = await prisma.productocompra.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends productocompraFindFirstArgs>(args?: SelectSubset<T, productocompraFindFirstArgs<ExtArgs>>): Prisma__productocompraClient<$Result.GetResult<Prisma.$productocompraPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Productocompra that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productocompraFindFirstOrThrowArgs} args - Arguments to find a Productocompra
     * @example
     * // Get one Productocompra
     * const productocompra = await prisma.productocompra.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends productocompraFindFirstOrThrowArgs>(args?: SelectSubset<T, productocompraFindFirstOrThrowArgs<ExtArgs>>): Prisma__productocompraClient<$Result.GetResult<Prisma.$productocompraPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Productocompras that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productocompraFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Productocompras
     * const productocompras = await prisma.productocompra.findMany()
     * 
     * // Get first 10 Productocompras
     * const productocompras = await prisma.productocompra.findMany({ take: 10 })
     * 
     * // Only select the `Id`
     * const productocompraWithIdOnly = await prisma.productocompra.findMany({ select: { Id: true } })
     * 
     */
    findMany<T extends productocompraFindManyArgs>(args?: SelectSubset<T, productocompraFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$productocompraPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Productocompra.
     * @param {productocompraCreateArgs} args - Arguments to create a Productocompra.
     * @example
     * // Create one Productocompra
     * const Productocompra = await prisma.productocompra.create({
     *   data: {
     *     // ... data to create a Productocompra
     *   }
     * })
     * 
     */
    create<T extends productocompraCreateArgs>(args: SelectSubset<T, productocompraCreateArgs<ExtArgs>>): Prisma__productocompraClient<$Result.GetResult<Prisma.$productocompraPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Productocompras.
     * @param {productocompraCreateManyArgs} args - Arguments to create many Productocompras.
     * @example
     * // Create many Productocompras
     * const productocompra = await prisma.productocompra.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends productocompraCreateManyArgs>(args?: SelectSubset<T, productocompraCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Productocompra.
     * @param {productocompraDeleteArgs} args - Arguments to delete one Productocompra.
     * @example
     * // Delete one Productocompra
     * const Productocompra = await prisma.productocompra.delete({
     *   where: {
     *     // ... filter to delete one Productocompra
     *   }
     * })
     * 
     */
    delete<T extends productocompraDeleteArgs>(args: SelectSubset<T, productocompraDeleteArgs<ExtArgs>>): Prisma__productocompraClient<$Result.GetResult<Prisma.$productocompraPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Productocompra.
     * @param {productocompraUpdateArgs} args - Arguments to update one Productocompra.
     * @example
     * // Update one Productocompra
     * const productocompra = await prisma.productocompra.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends productocompraUpdateArgs>(args: SelectSubset<T, productocompraUpdateArgs<ExtArgs>>): Prisma__productocompraClient<$Result.GetResult<Prisma.$productocompraPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Productocompras.
     * @param {productocompraDeleteManyArgs} args - Arguments to filter Productocompras to delete.
     * @example
     * // Delete a few Productocompras
     * const { count } = await prisma.productocompra.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends productocompraDeleteManyArgs>(args?: SelectSubset<T, productocompraDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Productocompras.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productocompraUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Productocompras
     * const productocompra = await prisma.productocompra.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends productocompraUpdateManyArgs>(args: SelectSubset<T, productocompraUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Productocompra.
     * @param {productocompraUpsertArgs} args - Arguments to update or create a Productocompra.
     * @example
     * // Update or create a Productocompra
     * const productocompra = await prisma.productocompra.upsert({
     *   create: {
     *     // ... data to create a Productocompra
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Productocompra we want to update
     *   }
     * })
     */
    upsert<T extends productocompraUpsertArgs>(args: SelectSubset<T, productocompraUpsertArgs<ExtArgs>>): Prisma__productocompraClient<$Result.GetResult<Prisma.$productocompraPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Productocompras.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productocompraCountArgs} args - Arguments to filter Productocompras to count.
     * @example
     * // Count the number of Productocompras
     * const count = await prisma.productocompra.count({
     *   where: {
     *     // ... the filter for the Productocompras we want to count
     *   }
     * })
    **/
    count<T extends productocompraCountArgs>(
      args?: Subset<T, productocompraCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductocompraCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Productocompra.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductocompraAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductocompraAggregateArgs>(args: Subset<T, ProductocompraAggregateArgs>): Prisma.PrismaPromise<GetProductocompraAggregateType<T>>

    /**
     * Group by Productocompra.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productocompraGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends productocompraGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: productocompraGroupByArgs['orderBy'] }
        : { orderBy?: productocompraGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, productocompraGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductocompraGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the productocompra model
   */
  readonly fields: productocompraFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for productocompra.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__productocompraClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    producto<T extends productocompra$productoArgs<ExtArgs> = {}>(args?: Subset<T, productocompra$productoArgs<ExtArgs>>): Prisma__productoClient<$Result.GetResult<Prisma.$productoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    compra<T extends productocompra$compraArgs<ExtArgs> = {}>(args?: Subset<T, productocompra$compraArgs<ExtArgs>>): Prisma__compraClient<$Result.GetResult<Prisma.$compraPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the productocompra model
   */
  interface productocompraFieldRefs {
    readonly Id: FieldRef<"productocompra", 'String'>
    readonly cantidad: FieldRef<"productocompra", 'Int'>
    readonly Id_producto: FieldRef<"productocompra", 'String'>
    readonly Id_compra: FieldRef<"productocompra", 'String'>
  }
    

  // Custom InputTypes
  /**
   * productocompra findUnique
   */
  export type productocompraFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productocompra
     */
    select?: productocompraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productocompra
     */
    omit?: productocompraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productocompraInclude<ExtArgs> | null
    /**
     * Filter, which productocompra to fetch.
     */
    where: productocompraWhereUniqueInput
  }

  /**
   * productocompra findUniqueOrThrow
   */
  export type productocompraFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productocompra
     */
    select?: productocompraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productocompra
     */
    omit?: productocompraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productocompraInclude<ExtArgs> | null
    /**
     * Filter, which productocompra to fetch.
     */
    where: productocompraWhereUniqueInput
  }

  /**
   * productocompra findFirst
   */
  export type productocompraFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productocompra
     */
    select?: productocompraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productocompra
     */
    omit?: productocompraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productocompraInclude<ExtArgs> | null
    /**
     * Filter, which productocompra to fetch.
     */
    where?: productocompraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of productocompras to fetch.
     */
    orderBy?: productocompraOrderByWithRelationInput | productocompraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for productocompras.
     */
    cursor?: productocompraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` productocompras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` productocompras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of productocompras.
     */
    distinct?: ProductocompraScalarFieldEnum | ProductocompraScalarFieldEnum[]
  }

  /**
   * productocompra findFirstOrThrow
   */
  export type productocompraFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productocompra
     */
    select?: productocompraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productocompra
     */
    omit?: productocompraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productocompraInclude<ExtArgs> | null
    /**
     * Filter, which productocompra to fetch.
     */
    where?: productocompraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of productocompras to fetch.
     */
    orderBy?: productocompraOrderByWithRelationInput | productocompraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for productocompras.
     */
    cursor?: productocompraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` productocompras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` productocompras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of productocompras.
     */
    distinct?: ProductocompraScalarFieldEnum | ProductocompraScalarFieldEnum[]
  }

  /**
   * productocompra findMany
   */
  export type productocompraFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productocompra
     */
    select?: productocompraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productocompra
     */
    omit?: productocompraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productocompraInclude<ExtArgs> | null
    /**
     * Filter, which productocompras to fetch.
     */
    where?: productocompraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of productocompras to fetch.
     */
    orderBy?: productocompraOrderByWithRelationInput | productocompraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing productocompras.
     */
    cursor?: productocompraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` productocompras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` productocompras.
     */
    skip?: number
    distinct?: ProductocompraScalarFieldEnum | ProductocompraScalarFieldEnum[]
  }

  /**
   * productocompra create
   */
  export type productocompraCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productocompra
     */
    select?: productocompraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productocompra
     */
    omit?: productocompraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productocompraInclude<ExtArgs> | null
    /**
     * The data needed to create a productocompra.
     */
    data?: XOR<productocompraCreateInput, productocompraUncheckedCreateInput>
  }

  /**
   * productocompra createMany
   */
  export type productocompraCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many productocompras.
     */
    data: productocompraCreateManyInput | productocompraCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * productocompra update
   */
  export type productocompraUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productocompra
     */
    select?: productocompraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productocompra
     */
    omit?: productocompraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productocompraInclude<ExtArgs> | null
    /**
     * The data needed to update a productocompra.
     */
    data: XOR<productocompraUpdateInput, productocompraUncheckedUpdateInput>
    /**
     * Choose, which productocompra to update.
     */
    where: productocompraWhereUniqueInput
  }

  /**
   * productocompra updateMany
   */
  export type productocompraUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update productocompras.
     */
    data: XOR<productocompraUpdateManyMutationInput, productocompraUncheckedUpdateManyInput>
    /**
     * Filter which productocompras to update
     */
    where?: productocompraWhereInput
    /**
     * Limit how many productocompras to update.
     */
    limit?: number
  }

  /**
   * productocompra upsert
   */
  export type productocompraUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productocompra
     */
    select?: productocompraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productocompra
     */
    omit?: productocompraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productocompraInclude<ExtArgs> | null
    /**
     * The filter to search for the productocompra to update in case it exists.
     */
    where: productocompraWhereUniqueInput
    /**
     * In case the productocompra found by the `where` argument doesn't exist, create a new productocompra with this data.
     */
    create: XOR<productocompraCreateInput, productocompraUncheckedCreateInput>
    /**
     * In case the productocompra was found with the provided `where` argument, update it with this data.
     */
    update: XOR<productocompraUpdateInput, productocompraUncheckedUpdateInput>
  }

  /**
   * productocompra delete
   */
  export type productocompraDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productocompra
     */
    select?: productocompraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productocompra
     */
    omit?: productocompraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productocompraInclude<ExtArgs> | null
    /**
     * Filter which productocompra to delete.
     */
    where: productocompraWhereUniqueInput
  }

  /**
   * productocompra deleteMany
   */
  export type productocompraDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which productocompras to delete
     */
    where?: productocompraWhereInput
    /**
     * Limit how many productocompras to delete.
     */
    limit?: number
  }

  /**
   * productocompra.producto
   */
  export type productocompra$productoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the producto
     */
    select?: productoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the producto
     */
    omit?: productoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productoInclude<ExtArgs> | null
    where?: productoWhereInput
  }

  /**
   * productocompra.compra
   */
  export type productocompra$compraArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the compra
     */
    select?: compraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the compra
     */
    omit?: compraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: compraInclude<ExtArgs> | null
    where?: compraWhereInput
  }

  /**
   * productocompra without action
   */
  export type productocompraDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the productocompra
     */
    select?: productocompraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the productocompra
     */
    omit?: productocompraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productocompraInclude<ExtArgs> | null
  }


  /**
   * Model proveedor
   */

  export type AggregateProveedor = {
    _count: ProveedorCountAggregateOutputType | null
    _min: ProveedorMinAggregateOutputType | null
    _max: ProveedorMaxAggregateOutputType | null
  }

  export type ProveedorMinAggregateOutputType = {
    Id: string | null
    nombre: string | null
    telefono: string | null
    empresa: string | null
  }

  export type ProveedorMaxAggregateOutputType = {
    Id: string | null
    nombre: string | null
    telefono: string | null
    empresa: string | null
  }

  export type ProveedorCountAggregateOutputType = {
    Id: number
    nombre: number
    telefono: number
    empresa: number
    _all: number
  }


  export type ProveedorMinAggregateInputType = {
    Id?: true
    nombre?: true
    telefono?: true
    empresa?: true
  }

  export type ProveedorMaxAggregateInputType = {
    Id?: true
    nombre?: true
    telefono?: true
    empresa?: true
  }

  export type ProveedorCountAggregateInputType = {
    Id?: true
    nombre?: true
    telefono?: true
    empresa?: true
    _all?: true
  }

  export type ProveedorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which proveedor to aggregate.
     */
    where?: proveedorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of proveedors to fetch.
     */
    orderBy?: proveedorOrderByWithRelationInput | proveedorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: proveedorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` proveedors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` proveedors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned proveedors
    **/
    _count?: true | ProveedorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProveedorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProveedorMaxAggregateInputType
  }

  export type GetProveedorAggregateType<T extends ProveedorAggregateArgs> = {
        [P in keyof T & keyof AggregateProveedor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProveedor[P]>
      : GetScalarType<T[P], AggregateProveedor[P]>
  }




  export type proveedorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: proveedorWhereInput
    orderBy?: proveedorOrderByWithAggregationInput | proveedorOrderByWithAggregationInput[]
    by: ProveedorScalarFieldEnum[] | ProveedorScalarFieldEnum
    having?: proveedorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProveedorCountAggregateInputType | true
    _min?: ProveedorMinAggregateInputType
    _max?: ProveedorMaxAggregateInputType
  }

  export type ProveedorGroupByOutputType = {
    Id: string
    nombre: string | null
    telefono: string | null
    empresa: string | null
    _count: ProveedorCountAggregateOutputType | null
    _min: ProveedorMinAggregateOutputType | null
    _max: ProveedorMaxAggregateOutputType | null
  }

  type GetProveedorGroupByPayload<T extends proveedorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProveedorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProveedorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProveedorGroupByOutputType[P]>
            : GetScalarType<T[P], ProveedorGroupByOutputType[P]>
        }
      >
    >


  export type proveedorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    Id?: boolean
    nombre?: boolean
    telefono?: boolean
    empresa?: boolean
    compra?: boolean | proveedor$compraArgs<ExtArgs>
    _count?: boolean | ProveedorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["proveedor"]>



  export type proveedorSelectScalar = {
    Id?: boolean
    nombre?: boolean
    telefono?: boolean
    empresa?: boolean
  }

  export type proveedorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"Id" | "nombre" | "telefono" | "empresa", ExtArgs["result"]["proveedor"]>
  export type proveedorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    compra?: boolean | proveedor$compraArgs<ExtArgs>
    _count?: boolean | ProveedorCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $proveedorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "proveedor"
    objects: {
      compra: Prisma.$compraPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      Id: string
      nombre: string | null
      telefono: string | null
      empresa: string | null
    }, ExtArgs["result"]["proveedor"]>
    composites: {}
  }

  type proveedorGetPayload<S extends boolean | null | undefined | proveedorDefaultArgs> = $Result.GetResult<Prisma.$proveedorPayload, S>

  type proveedorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<proveedorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProveedorCountAggregateInputType | true
    }

  export interface proveedorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['proveedor'], meta: { name: 'proveedor' } }
    /**
     * Find zero or one Proveedor that matches the filter.
     * @param {proveedorFindUniqueArgs} args - Arguments to find a Proveedor
     * @example
     * // Get one Proveedor
     * const proveedor = await prisma.proveedor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends proveedorFindUniqueArgs>(args: SelectSubset<T, proveedorFindUniqueArgs<ExtArgs>>): Prisma__proveedorClient<$Result.GetResult<Prisma.$proveedorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Proveedor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {proveedorFindUniqueOrThrowArgs} args - Arguments to find a Proveedor
     * @example
     * // Get one Proveedor
     * const proveedor = await prisma.proveedor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends proveedorFindUniqueOrThrowArgs>(args: SelectSubset<T, proveedorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__proveedorClient<$Result.GetResult<Prisma.$proveedorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Proveedor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {proveedorFindFirstArgs} args - Arguments to find a Proveedor
     * @example
     * // Get one Proveedor
     * const proveedor = await prisma.proveedor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends proveedorFindFirstArgs>(args?: SelectSubset<T, proveedorFindFirstArgs<ExtArgs>>): Prisma__proveedorClient<$Result.GetResult<Prisma.$proveedorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Proveedor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {proveedorFindFirstOrThrowArgs} args - Arguments to find a Proveedor
     * @example
     * // Get one Proveedor
     * const proveedor = await prisma.proveedor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends proveedorFindFirstOrThrowArgs>(args?: SelectSubset<T, proveedorFindFirstOrThrowArgs<ExtArgs>>): Prisma__proveedorClient<$Result.GetResult<Prisma.$proveedorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Proveedors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {proveedorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Proveedors
     * const proveedors = await prisma.proveedor.findMany()
     * 
     * // Get first 10 Proveedors
     * const proveedors = await prisma.proveedor.findMany({ take: 10 })
     * 
     * // Only select the `Id`
     * const proveedorWithIdOnly = await prisma.proveedor.findMany({ select: { Id: true } })
     * 
     */
    findMany<T extends proveedorFindManyArgs>(args?: SelectSubset<T, proveedorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$proveedorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Proveedor.
     * @param {proveedorCreateArgs} args - Arguments to create a Proveedor.
     * @example
     * // Create one Proveedor
     * const Proveedor = await prisma.proveedor.create({
     *   data: {
     *     // ... data to create a Proveedor
     *   }
     * })
     * 
     */
    create<T extends proveedorCreateArgs>(args: SelectSubset<T, proveedorCreateArgs<ExtArgs>>): Prisma__proveedorClient<$Result.GetResult<Prisma.$proveedorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Proveedors.
     * @param {proveedorCreateManyArgs} args - Arguments to create many Proveedors.
     * @example
     * // Create many Proveedors
     * const proveedor = await prisma.proveedor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends proveedorCreateManyArgs>(args?: SelectSubset<T, proveedorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Proveedor.
     * @param {proveedorDeleteArgs} args - Arguments to delete one Proveedor.
     * @example
     * // Delete one Proveedor
     * const Proveedor = await prisma.proveedor.delete({
     *   where: {
     *     // ... filter to delete one Proveedor
     *   }
     * })
     * 
     */
    delete<T extends proveedorDeleteArgs>(args: SelectSubset<T, proveedorDeleteArgs<ExtArgs>>): Prisma__proveedorClient<$Result.GetResult<Prisma.$proveedorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Proveedor.
     * @param {proveedorUpdateArgs} args - Arguments to update one Proveedor.
     * @example
     * // Update one Proveedor
     * const proveedor = await prisma.proveedor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends proveedorUpdateArgs>(args: SelectSubset<T, proveedorUpdateArgs<ExtArgs>>): Prisma__proveedorClient<$Result.GetResult<Prisma.$proveedorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Proveedors.
     * @param {proveedorDeleteManyArgs} args - Arguments to filter Proveedors to delete.
     * @example
     * // Delete a few Proveedors
     * const { count } = await prisma.proveedor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends proveedorDeleteManyArgs>(args?: SelectSubset<T, proveedorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Proveedors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {proveedorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Proveedors
     * const proveedor = await prisma.proveedor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends proveedorUpdateManyArgs>(args: SelectSubset<T, proveedorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Proveedor.
     * @param {proveedorUpsertArgs} args - Arguments to update or create a Proveedor.
     * @example
     * // Update or create a Proveedor
     * const proveedor = await prisma.proveedor.upsert({
     *   create: {
     *     // ... data to create a Proveedor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Proveedor we want to update
     *   }
     * })
     */
    upsert<T extends proveedorUpsertArgs>(args: SelectSubset<T, proveedorUpsertArgs<ExtArgs>>): Prisma__proveedorClient<$Result.GetResult<Prisma.$proveedorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Proveedors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {proveedorCountArgs} args - Arguments to filter Proveedors to count.
     * @example
     * // Count the number of Proveedors
     * const count = await prisma.proveedor.count({
     *   where: {
     *     // ... the filter for the Proveedors we want to count
     *   }
     * })
    **/
    count<T extends proveedorCountArgs>(
      args?: Subset<T, proveedorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProveedorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Proveedor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProveedorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProveedorAggregateArgs>(args: Subset<T, ProveedorAggregateArgs>): Prisma.PrismaPromise<GetProveedorAggregateType<T>>

    /**
     * Group by Proveedor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {proveedorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends proveedorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: proveedorGroupByArgs['orderBy'] }
        : { orderBy?: proveedorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, proveedorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProveedorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the proveedor model
   */
  readonly fields: proveedorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for proveedor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__proveedorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    compra<T extends proveedor$compraArgs<ExtArgs> = {}>(args?: Subset<T, proveedor$compraArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$compraPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the proveedor model
   */
  interface proveedorFieldRefs {
    readonly Id: FieldRef<"proveedor", 'String'>
    readonly nombre: FieldRef<"proveedor", 'String'>
    readonly telefono: FieldRef<"proveedor", 'String'>
    readonly empresa: FieldRef<"proveedor", 'String'>
  }
    

  // Custom InputTypes
  /**
   * proveedor findUnique
   */
  export type proveedorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proveedor
     */
    select?: proveedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the proveedor
     */
    omit?: proveedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proveedorInclude<ExtArgs> | null
    /**
     * Filter, which proveedor to fetch.
     */
    where: proveedorWhereUniqueInput
  }

  /**
   * proveedor findUniqueOrThrow
   */
  export type proveedorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proveedor
     */
    select?: proveedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the proveedor
     */
    omit?: proveedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proveedorInclude<ExtArgs> | null
    /**
     * Filter, which proveedor to fetch.
     */
    where: proveedorWhereUniqueInput
  }

  /**
   * proveedor findFirst
   */
  export type proveedorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proveedor
     */
    select?: proveedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the proveedor
     */
    omit?: proveedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proveedorInclude<ExtArgs> | null
    /**
     * Filter, which proveedor to fetch.
     */
    where?: proveedorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of proveedors to fetch.
     */
    orderBy?: proveedorOrderByWithRelationInput | proveedorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for proveedors.
     */
    cursor?: proveedorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` proveedors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` proveedors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of proveedors.
     */
    distinct?: ProveedorScalarFieldEnum | ProveedorScalarFieldEnum[]
  }

  /**
   * proveedor findFirstOrThrow
   */
  export type proveedorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proveedor
     */
    select?: proveedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the proveedor
     */
    omit?: proveedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proveedorInclude<ExtArgs> | null
    /**
     * Filter, which proveedor to fetch.
     */
    where?: proveedorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of proveedors to fetch.
     */
    orderBy?: proveedorOrderByWithRelationInput | proveedorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for proveedors.
     */
    cursor?: proveedorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` proveedors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` proveedors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of proveedors.
     */
    distinct?: ProveedorScalarFieldEnum | ProveedorScalarFieldEnum[]
  }

  /**
   * proveedor findMany
   */
  export type proveedorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proveedor
     */
    select?: proveedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the proveedor
     */
    omit?: proveedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proveedorInclude<ExtArgs> | null
    /**
     * Filter, which proveedors to fetch.
     */
    where?: proveedorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of proveedors to fetch.
     */
    orderBy?: proveedorOrderByWithRelationInput | proveedorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing proveedors.
     */
    cursor?: proveedorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` proveedors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` proveedors.
     */
    skip?: number
    distinct?: ProveedorScalarFieldEnum | ProveedorScalarFieldEnum[]
  }

  /**
   * proveedor create
   */
  export type proveedorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proveedor
     */
    select?: proveedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the proveedor
     */
    omit?: proveedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proveedorInclude<ExtArgs> | null
    /**
     * The data needed to create a proveedor.
     */
    data?: XOR<proveedorCreateInput, proveedorUncheckedCreateInput>
  }

  /**
   * proveedor createMany
   */
  export type proveedorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many proveedors.
     */
    data: proveedorCreateManyInput | proveedorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * proveedor update
   */
  export type proveedorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proveedor
     */
    select?: proveedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the proveedor
     */
    omit?: proveedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proveedorInclude<ExtArgs> | null
    /**
     * The data needed to update a proveedor.
     */
    data: XOR<proveedorUpdateInput, proveedorUncheckedUpdateInput>
    /**
     * Choose, which proveedor to update.
     */
    where: proveedorWhereUniqueInput
  }

  /**
   * proveedor updateMany
   */
  export type proveedorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update proveedors.
     */
    data: XOR<proveedorUpdateManyMutationInput, proveedorUncheckedUpdateManyInput>
    /**
     * Filter which proveedors to update
     */
    where?: proveedorWhereInput
    /**
     * Limit how many proveedors to update.
     */
    limit?: number
  }

  /**
   * proveedor upsert
   */
  export type proveedorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proveedor
     */
    select?: proveedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the proveedor
     */
    omit?: proveedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proveedorInclude<ExtArgs> | null
    /**
     * The filter to search for the proveedor to update in case it exists.
     */
    where: proveedorWhereUniqueInput
    /**
     * In case the proveedor found by the `where` argument doesn't exist, create a new proveedor with this data.
     */
    create: XOR<proveedorCreateInput, proveedorUncheckedCreateInput>
    /**
     * In case the proveedor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<proveedorUpdateInput, proveedorUncheckedUpdateInput>
  }

  /**
   * proveedor delete
   */
  export type proveedorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proveedor
     */
    select?: proveedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the proveedor
     */
    omit?: proveedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proveedorInclude<ExtArgs> | null
    /**
     * Filter which proveedor to delete.
     */
    where: proveedorWhereUniqueInput
  }

  /**
   * proveedor deleteMany
   */
  export type proveedorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which proveedors to delete
     */
    where?: proveedorWhereInput
    /**
     * Limit how many proveedors to delete.
     */
    limit?: number
  }

  /**
   * proveedor.compra
   */
  export type proveedor$compraArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the compra
     */
    select?: compraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the compra
     */
    omit?: compraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: compraInclude<ExtArgs> | null
    where?: compraWhereInput
    orderBy?: compraOrderByWithRelationInput | compraOrderByWithRelationInput[]
    cursor?: compraWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CompraScalarFieldEnum | CompraScalarFieldEnum[]
  }

  /**
   * proveedor without action
   */
  export type proveedorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proveedor
     */
    select?: proveedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the proveedor
     */
    omit?: proveedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proveedorInclude<ExtArgs> | null
  }


  /**
   * Model tienda
   */

  export type AggregateTienda = {
    _count: TiendaCountAggregateOutputType | null
    _min: TiendaMinAggregateOutputType | null
    _max: TiendaMaxAggregateOutputType | null
  }

  export type TiendaMinAggregateOutputType = {
    Id: string | null
    nombre: string | null
    ubicacion: string | null
    telefono: string | null
  }

  export type TiendaMaxAggregateOutputType = {
    Id: string | null
    nombre: string | null
    ubicacion: string | null
    telefono: string | null
  }

  export type TiendaCountAggregateOutputType = {
    Id: number
    nombre: number
    ubicacion: number
    telefono: number
    _all: number
  }


  export type TiendaMinAggregateInputType = {
    Id?: true
    nombre?: true
    ubicacion?: true
    telefono?: true
  }

  export type TiendaMaxAggregateInputType = {
    Id?: true
    nombre?: true
    ubicacion?: true
    telefono?: true
  }

  export type TiendaCountAggregateInputType = {
    Id?: true
    nombre?: true
    ubicacion?: true
    telefono?: true
    _all?: true
  }

  export type TiendaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tienda to aggregate.
     */
    where?: tiendaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tiendas to fetch.
     */
    orderBy?: tiendaOrderByWithRelationInput | tiendaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: tiendaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tiendas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tiendas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned tiendas
    **/
    _count?: true | TiendaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TiendaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TiendaMaxAggregateInputType
  }

  export type GetTiendaAggregateType<T extends TiendaAggregateArgs> = {
        [P in keyof T & keyof AggregateTienda]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTienda[P]>
      : GetScalarType<T[P], AggregateTienda[P]>
  }




  export type tiendaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tiendaWhereInput
    orderBy?: tiendaOrderByWithAggregationInput | tiendaOrderByWithAggregationInput[]
    by: TiendaScalarFieldEnum[] | TiendaScalarFieldEnum
    having?: tiendaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TiendaCountAggregateInputType | true
    _min?: TiendaMinAggregateInputType
    _max?: TiendaMaxAggregateInputType
  }

  export type TiendaGroupByOutputType = {
    Id: string
    nombre: string | null
    ubicacion: string | null
    telefono: string | null
    _count: TiendaCountAggregateOutputType | null
    _min: TiendaMinAggregateOutputType | null
    _max: TiendaMaxAggregateOutputType | null
  }

  type GetTiendaGroupByPayload<T extends tiendaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TiendaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TiendaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TiendaGroupByOutputType[P]>
            : GetScalarType<T[P], TiendaGroupByOutputType[P]>
        }
      >
    >


  export type tiendaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    Id?: boolean
    nombre?: boolean
    ubicacion?: boolean
    telefono?: boolean
    almacen?: boolean | tienda$almacenArgs<ExtArgs>
    usuarios?: boolean | tienda$usuariosArgs<ExtArgs>
    _count?: boolean | TiendaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tienda"]>



  export type tiendaSelectScalar = {
    Id?: boolean
    nombre?: boolean
    ubicacion?: boolean
    telefono?: boolean
  }

  export type tiendaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"Id" | "nombre" | "ubicacion" | "telefono", ExtArgs["result"]["tienda"]>
  export type tiendaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    almacen?: boolean | tienda$almacenArgs<ExtArgs>
    usuarios?: boolean | tienda$usuariosArgs<ExtArgs>
    _count?: boolean | TiendaCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $tiendaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "tienda"
    objects: {
      almacen: Prisma.$almacenPayload<ExtArgs>[]
      usuarios: Prisma.$usuariosPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      Id: string
      nombre: string | null
      ubicacion: string | null
      telefono: string | null
    }, ExtArgs["result"]["tienda"]>
    composites: {}
  }

  type tiendaGetPayload<S extends boolean | null | undefined | tiendaDefaultArgs> = $Result.GetResult<Prisma.$tiendaPayload, S>

  type tiendaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<tiendaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TiendaCountAggregateInputType | true
    }

  export interface tiendaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['tienda'], meta: { name: 'tienda' } }
    /**
     * Find zero or one Tienda that matches the filter.
     * @param {tiendaFindUniqueArgs} args - Arguments to find a Tienda
     * @example
     * // Get one Tienda
     * const tienda = await prisma.tienda.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends tiendaFindUniqueArgs>(args: SelectSubset<T, tiendaFindUniqueArgs<ExtArgs>>): Prisma__tiendaClient<$Result.GetResult<Prisma.$tiendaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tienda that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {tiendaFindUniqueOrThrowArgs} args - Arguments to find a Tienda
     * @example
     * // Get one Tienda
     * const tienda = await prisma.tienda.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends tiendaFindUniqueOrThrowArgs>(args: SelectSubset<T, tiendaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__tiendaClient<$Result.GetResult<Prisma.$tiendaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tienda that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tiendaFindFirstArgs} args - Arguments to find a Tienda
     * @example
     * // Get one Tienda
     * const tienda = await prisma.tienda.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends tiendaFindFirstArgs>(args?: SelectSubset<T, tiendaFindFirstArgs<ExtArgs>>): Prisma__tiendaClient<$Result.GetResult<Prisma.$tiendaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tienda that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tiendaFindFirstOrThrowArgs} args - Arguments to find a Tienda
     * @example
     * // Get one Tienda
     * const tienda = await prisma.tienda.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends tiendaFindFirstOrThrowArgs>(args?: SelectSubset<T, tiendaFindFirstOrThrowArgs<ExtArgs>>): Prisma__tiendaClient<$Result.GetResult<Prisma.$tiendaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tiendas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tiendaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tiendas
     * const tiendas = await prisma.tienda.findMany()
     * 
     * // Get first 10 Tiendas
     * const tiendas = await prisma.tienda.findMany({ take: 10 })
     * 
     * // Only select the `Id`
     * const tiendaWithIdOnly = await prisma.tienda.findMany({ select: { Id: true } })
     * 
     */
    findMany<T extends tiendaFindManyArgs>(args?: SelectSubset<T, tiendaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tiendaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tienda.
     * @param {tiendaCreateArgs} args - Arguments to create a Tienda.
     * @example
     * // Create one Tienda
     * const Tienda = await prisma.tienda.create({
     *   data: {
     *     // ... data to create a Tienda
     *   }
     * })
     * 
     */
    create<T extends tiendaCreateArgs>(args: SelectSubset<T, tiendaCreateArgs<ExtArgs>>): Prisma__tiendaClient<$Result.GetResult<Prisma.$tiendaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tiendas.
     * @param {tiendaCreateManyArgs} args - Arguments to create many Tiendas.
     * @example
     * // Create many Tiendas
     * const tienda = await prisma.tienda.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends tiendaCreateManyArgs>(args?: SelectSubset<T, tiendaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Tienda.
     * @param {tiendaDeleteArgs} args - Arguments to delete one Tienda.
     * @example
     * // Delete one Tienda
     * const Tienda = await prisma.tienda.delete({
     *   where: {
     *     // ... filter to delete one Tienda
     *   }
     * })
     * 
     */
    delete<T extends tiendaDeleteArgs>(args: SelectSubset<T, tiendaDeleteArgs<ExtArgs>>): Prisma__tiendaClient<$Result.GetResult<Prisma.$tiendaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tienda.
     * @param {tiendaUpdateArgs} args - Arguments to update one Tienda.
     * @example
     * // Update one Tienda
     * const tienda = await prisma.tienda.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends tiendaUpdateArgs>(args: SelectSubset<T, tiendaUpdateArgs<ExtArgs>>): Prisma__tiendaClient<$Result.GetResult<Prisma.$tiendaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tiendas.
     * @param {tiendaDeleteManyArgs} args - Arguments to filter Tiendas to delete.
     * @example
     * // Delete a few Tiendas
     * const { count } = await prisma.tienda.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends tiendaDeleteManyArgs>(args?: SelectSubset<T, tiendaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tiendas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tiendaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tiendas
     * const tienda = await prisma.tienda.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends tiendaUpdateManyArgs>(args: SelectSubset<T, tiendaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tienda.
     * @param {tiendaUpsertArgs} args - Arguments to update or create a Tienda.
     * @example
     * // Update or create a Tienda
     * const tienda = await prisma.tienda.upsert({
     *   create: {
     *     // ... data to create a Tienda
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tienda we want to update
     *   }
     * })
     */
    upsert<T extends tiendaUpsertArgs>(args: SelectSubset<T, tiendaUpsertArgs<ExtArgs>>): Prisma__tiendaClient<$Result.GetResult<Prisma.$tiendaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tiendas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tiendaCountArgs} args - Arguments to filter Tiendas to count.
     * @example
     * // Count the number of Tiendas
     * const count = await prisma.tienda.count({
     *   where: {
     *     // ... the filter for the Tiendas we want to count
     *   }
     * })
    **/
    count<T extends tiendaCountArgs>(
      args?: Subset<T, tiendaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TiendaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tienda.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TiendaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TiendaAggregateArgs>(args: Subset<T, TiendaAggregateArgs>): Prisma.PrismaPromise<GetTiendaAggregateType<T>>

    /**
     * Group by Tienda.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tiendaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends tiendaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: tiendaGroupByArgs['orderBy'] }
        : { orderBy?: tiendaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, tiendaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTiendaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the tienda model
   */
  readonly fields: tiendaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for tienda.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__tiendaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    almacen<T extends tienda$almacenArgs<ExtArgs> = {}>(args?: Subset<T, tienda$almacenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$almacenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    usuarios<T extends tienda$usuariosArgs<ExtArgs> = {}>(args?: Subset<T, tienda$usuariosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the tienda model
   */
  interface tiendaFieldRefs {
    readonly Id: FieldRef<"tienda", 'String'>
    readonly nombre: FieldRef<"tienda", 'String'>
    readonly ubicacion: FieldRef<"tienda", 'String'>
    readonly telefono: FieldRef<"tienda", 'String'>
  }
    

  // Custom InputTypes
  /**
   * tienda findUnique
   */
  export type tiendaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tienda
     */
    select?: tiendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tienda
     */
    omit?: tiendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tiendaInclude<ExtArgs> | null
    /**
     * Filter, which tienda to fetch.
     */
    where: tiendaWhereUniqueInput
  }

  /**
   * tienda findUniqueOrThrow
   */
  export type tiendaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tienda
     */
    select?: tiendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tienda
     */
    omit?: tiendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tiendaInclude<ExtArgs> | null
    /**
     * Filter, which tienda to fetch.
     */
    where: tiendaWhereUniqueInput
  }

  /**
   * tienda findFirst
   */
  export type tiendaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tienda
     */
    select?: tiendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tienda
     */
    omit?: tiendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tiendaInclude<ExtArgs> | null
    /**
     * Filter, which tienda to fetch.
     */
    where?: tiendaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tiendas to fetch.
     */
    orderBy?: tiendaOrderByWithRelationInput | tiendaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tiendas.
     */
    cursor?: tiendaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tiendas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tiendas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tiendas.
     */
    distinct?: TiendaScalarFieldEnum | TiendaScalarFieldEnum[]
  }

  /**
   * tienda findFirstOrThrow
   */
  export type tiendaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tienda
     */
    select?: tiendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tienda
     */
    omit?: tiendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tiendaInclude<ExtArgs> | null
    /**
     * Filter, which tienda to fetch.
     */
    where?: tiendaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tiendas to fetch.
     */
    orderBy?: tiendaOrderByWithRelationInput | tiendaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tiendas.
     */
    cursor?: tiendaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tiendas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tiendas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tiendas.
     */
    distinct?: TiendaScalarFieldEnum | TiendaScalarFieldEnum[]
  }

  /**
   * tienda findMany
   */
  export type tiendaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tienda
     */
    select?: tiendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tienda
     */
    omit?: tiendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tiendaInclude<ExtArgs> | null
    /**
     * Filter, which tiendas to fetch.
     */
    where?: tiendaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tiendas to fetch.
     */
    orderBy?: tiendaOrderByWithRelationInput | tiendaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing tiendas.
     */
    cursor?: tiendaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tiendas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tiendas.
     */
    skip?: number
    distinct?: TiendaScalarFieldEnum | TiendaScalarFieldEnum[]
  }

  /**
   * tienda create
   */
  export type tiendaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tienda
     */
    select?: tiendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tienda
     */
    omit?: tiendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tiendaInclude<ExtArgs> | null
    /**
     * The data needed to create a tienda.
     */
    data?: XOR<tiendaCreateInput, tiendaUncheckedCreateInput>
  }

  /**
   * tienda createMany
   */
  export type tiendaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many tiendas.
     */
    data: tiendaCreateManyInput | tiendaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * tienda update
   */
  export type tiendaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tienda
     */
    select?: tiendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tienda
     */
    omit?: tiendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tiendaInclude<ExtArgs> | null
    /**
     * The data needed to update a tienda.
     */
    data: XOR<tiendaUpdateInput, tiendaUncheckedUpdateInput>
    /**
     * Choose, which tienda to update.
     */
    where: tiendaWhereUniqueInput
  }

  /**
   * tienda updateMany
   */
  export type tiendaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update tiendas.
     */
    data: XOR<tiendaUpdateManyMutationInput, tiendaUncheckedUpdateManyInput>
    /**
     * Filter which tiendas to update
     */
    where?: tiendaWhereInput
    /**
     * Limit how many tiendas to update.
     */
    limit?: number
  }

  /**
   * tienda upsert
   */
  export type tiendaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tienda
     */
    select?: tiendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tienda
     */
    omit?: tiendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tiendaInclude<ExtArgs> | null
    /**
     * The filter to search for the tienda to update in case it exists.
     */
    where: tiendaWhereUniqueInput
    /**
     * In case the tienda found by the `where` argument doesn't exist, create a new tienda with this data.
     */
    create: XOR<tiendaCreateInput, tiendaUncheckedCreateInput>
    /**
     * In case the tienda was found with the provided `where` argument, update it with this data.
     */
    update: XOR<tiendaUpdateInput, tiendaUncheckedUpdateInput>
  }

  /**
   * tienda delete
   */
  export type tiendaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tienda
     */
    select?: tiendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tienda
     */
    omit?: tiendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tiendaInclude<ExtArgs> | null
    /**
     * Filter which tienda to delete.
     */
    where: tiendaWhereUniqueInput
  }

  /**
   * tienda deleteMany
   */
  export type tiendaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tiendas to delete
     */
    where?: tiendaWhereInput
    /**
     * Limit how many tiendas to delete.
     */
    limit?: number
  }

  /**
   * tienda.almacen
   */
  export type tienda$almacenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the almacen
     */
    select?: almacenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the almacen
     */
    omit?: almacenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: almacenInclude<ExtArgs> | null
    where?: almacenWhereInput
    orderBy?: almacenOrderByWithRelationInput | almacenOrderByWithRelationInput[]
    cursor?: almacenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AlmacenScalarFieldEnum | AlmacenScalarFieldEnum[]
  }

  /**
   * tienda.usuarios
   */
  export type tienda$usuariosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    where?: usuariosWhereInput
    orderBy?: usuariosOrderByWithRelationInput | usuariosOrderByWithRelationInput[]
    cursor?: usuariosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsuariosScalarFieldEnum | UsuariosScalarFieldEnum[]
  }

  /**
   * tienda without action
   */
  export type tiendaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tienda
     */
    select?: tiendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tienda
     */
    omit?: tiendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tiendaInclude<ExtArgs> | null
  }


  /**
   * Model usuarios
   */

  export type AggregateUsuarios = {
    _count: UsuariosCountAggregateOutputType | null
    _min: UsuariosMinAggregateOutputType | null
    _max: UsuariosMaxAggregateOutputType | null
  }

  export type UsuariosMinAggregateOutputType = {
    Id: string | null
    nombre: string | null
    email: string | null
    contrasena: string | null
    fotoUrl: string | null
    codigoVerificacion: string | null
    codigoVerificacionExp: Date | null
    activo: boolean | null
    verificado: boolean | null
    rol: $Enums.usuarios_rol | null
    Id_tienda: string | null
  }

  export type UsuariosMaxAggregateOutputType = {
    Id: string | null
    nombre: string | null
    email: string | null
    contrasena: string | null
    fotoUrl: string | null
    codigoVerificacion: string | null
    codigoVerificacionExp: Date | null
    activo: boolean | null
    verificado: boolean | null
    rol: $Enums.usuarios_rol | null
    Id_tienda: string | null
  }

  export type UsuariosCountAggregateOutputType = {
    Id: number
    nombre: number
    email: number
    contrasena: number
    fotoUrl: number
    codigoVerificacion: number
    codigoVerificacionExp: number
    activo: number
    verificado: number
    rol: number
    Id_tienda: number
    _all: number
  }


  export type UsuariosMinAggregateInputType = {
    Id?: true
    nombre?: true
    email?: true
    contrasena?: true
    fotoUrl?: true
    codigoVerificacion?: true
    codigoVerificacionExp?: true
    activo?: true
    verificado?: true
    rol?: true
    Id_tienda?: true
  }

  export type UsuariosMaxAggregateInputType = {
    Id?: true
    nombre?: true
    email?: true
    contrasena?: true
    fotoUrl?: true
    codigoVerificacion?: true
    codigoVerificacionExp?: true
    activo?: true
    verificado?: true
    rol?: true
    Id_tienda?: true
  }

  export type UsuariosCountAggregateInputType = {
    Id?: true
    nombre?: true
    email?: true
    contrasena?: true
    fotoUrl?: true
    codigoVerificacion?: true
    codigoVerificacionExp?: true
    activo?: true
    verificado?: true
    rol?: true
    Id_tienda?: true
    _all?: true
  }

  export type UsuariosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which usuarios to aggregate.
     */
    where?: usuariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of usuarios to fetch.
     */
    orderBy?: usuariosOrderByWithRelationInput | usuariosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usuariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned usuarios
    **/
    _count?: true | UsuariosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuariosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuariosMaxAggregateInputType
  }

  export type GetUsuariosAggregateType<T extends UsuariosAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuarios]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuarios[P]>
      : GetScalarType<T[P], AggregateUsuarios[P]>
  }




  export type usuariosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usuariosWhereInput
    orderBy?: usuariosOrderByWithAggregationInput | usuariosOrderByWithAggregationInput[]
    by: UsuariosScalarFieldEnum[] | UsuariosScalarFieldEnum
    having?: usuariosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuariosCountAggregateInputType | true
    _min?: UsuariosMinAggregateInputType
    _max?: UsuariosMaxAggregateInputType
  }

  export type UsuariosGroupByOutputType = {
    Id: string
    nombre: string | null
    email: string
    contrasena: string
    fotoUrl: string | null
    codigoVerificacion: string | null
    codigoVerificacionExp: Date | null
    activo: boolean | null
    verificado: boolean | null
    rol: $Enums.usuarios_rol
    Id_tienda: string | null
    _count: UsuariosCountAggregateOutputType | null
    _min: UsuariosMinAggregateOutputType | null
    _max: UsuariosMaxAggregateOutputType | null
  }

  type GetUsuariosGroupByPayload<T extends usuariosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsuariosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuariosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuariosGroupByOutputType[P]>
            : GetScalarType<T[P], UsuariosGroupByOutputType[P]>
        }
      >
    >


  export type usuariosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    Id?: boolean
    nombre?: boolean
    email?: boolean
    contrasena?: boolean
    fotoUrl?: boolean
    codigoVerificacion?: boolean
    codigoVerificacionExp?: boolean
    activo?: boolean
    verificado?: boolean
    rol?: boolean
    Id_tienda?: boolean
    tienda?: boolean | usuarios$tiendaArgs<ExtArgs>
  }, ExtArgs["result"]["usuarios"]>



  export type usuariosSelectScalar = {
    Id?: boolean
    nombre?: boolean
    email?: boolean
    contrasena?: boolean
    fotoUrl?: boolean
    codigoVerificacion?: boolean
    codigoVerificacionExp?: boolean
    activo?: boolean
    verificado?: boolean
    rol?: boolean
    Id_tienda?: boolean
  }

  export type usuariosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"Id" | "nombre" | "email" | "contrasena" | "fotoUrl" | "codigoVerificacion" | "codigoVerificacionExp" | "activo" | "verificado" | "rol" | "Id_tienda", ExtArgs["result"]["usuarios"]>
  export type usuariosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tienda?: boolean | usuarios$tiendaArgs<ExtArgs>
  }

  export type $usuariosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "usuarios"
    objects: {
      tienda: Prisma.$tiendaPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      Id: string
      nombre: string | null
      email: string
      contrasena: string
      fotoUrl: string | null
      codigoVerificacion: string | null
      codigoVerificacionExp: Date | null
      activo: boolean | null
      verificado: boolean | null
      rol: $Enums.usuarios_rol
      Id_tienda: string | null
    }, ExtArgs["result"]["usuarios"]>
    composites: {}
  }

  type usuariosGetPayload<S extends boolean | null | undefined | usuariosDefaultArgs> = $Result.GetResult<Prisma.$usuariosPayload, S>

  type usuariosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usuariosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsuariosCountAggregateInputType | true
    }

  export interface usuariosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['usuarios'], meta: { name: 'usuarios' } }
    /**
     * Find zero or one Usuarios that matches the filter.
     * @param {usuariosFindUniqueArgs} args - Arguments to find a Usuarios
     * @example
     * // Get one Usuarios
     * const usuarios = await prisma.usuarios.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usuariosFindUniqueArgs>(args: SelectSubset<T, usuariosFindUniqueArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Usuarios that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usuariosFindUniqueOrThrowArgs} args - Arguments to find a Usuarios
     * @example
     * // Get one Usuarios
     * const usuarios = await prisma.usuarios.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usuariosFindUniqueOrThrowArgs>(args: SelectSubset<T, usuariosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuariosFindFirstArgs} args - Arguments to find a Usuarios
     * @example
     * // Get one Usuarios
     * const usuarios = await prisma.usuarios.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usuariosFindFirstArgs>(args?: SelectSubset<T, usuariosFindFirstArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuarios that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuariosFindFirstOrThrowArgs} args - Arguments to find a Usuarios
     * @example
     * // Get one Usuarios
     * const usuarios = await prisma.usuarios.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usuariosFindFirstOrThrowArgs>(args?: SelectSubset<T, usuariosFindFirstOrThrowArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuariosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuarios.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuarios.findMany({ take: 10 })
     * 
     * // Only select the `Id`
     * const usuariosWithIdOnly = await prisma.usuarios.findMany({ select: { Id: true } })
     * 
     */
    findMany<T extends usuariosFindManyArgs>(args?: SelectSubset<T, usuariosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Usuarios.
     * @param {usuariosCreateArgs} args - Arguments to create a Usuarios.
     * @example
     * // Create one Usuarios
     * const Usuarios = await prisma.usuarios.create({
     *   data: {
     *     // ... data to create a Usuarios
     *   }
     * })
     * 
     */
    create<T extends usuariosCreateArgs>(args: SelectSubset<T, usuariosCreateArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Usuarios.
     * @param {usuariosCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuarios = await prisma.usuarios.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usuariosCreateManyArgs>(args?: SelectSubset<T, usuariosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Usuarios.
     * @param {usuariosDeleteArgs} args - Arguments to delete one Usuarios.
     * @example
     * // Delete one Usuarios
     * const Usuarios = await prisma.usuarios.delete({
     *   where: {
     *     // ... filter to delete one Usuarios
     *   }
     * })
     * 
     */
    delete<T extends usuariosDeleteArgs>(args: SelectSubset<T, usuariosDeleteArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Usuarios.
     * @param {usuariosUpdateArgs} args - Arguments to update one Usuarios.
     * @example
     * // Update one Usuarios
     * const usuarios = await prisma.usuarios.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usuariosUpdateArgs>(args: SelectSubset<T, usuariosUpdateArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Usuarios.
     * @param {usuariosDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuarios.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usuariosDeleteManyArgs>(args?: SelectSubset<T, usuariosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuariosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuarios = await prisma.usuarios.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usuariosUpdateManyArgs>(args: SelectSubset<T, usuariosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Usuarios.
     * @param {usuariosUpsertArgs} args - Arguments to update or create a Usuarios.
     * @example
     * // Update or create a Usuarios
     * const usuarios = await prisma.usuarios.upsert({
     *   create: {
     *     // ... data to create a Usuarios
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuarios we want to update
     *   }
     * })
     */
    upsert<T extends usuariosUpsertArgs>(args: SelectSubset<T, usuariosUpsertArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuariosCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuarios.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends usuariosCountArgs>(
      args?: Subset<T, usuariosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuariosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuariosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsuariosAggregateArgs>(args: Subset<T, UsuariosAggregateArgs>): Prisma.PrismaPromise<GetUsuariosAggregateType<T>>

    /**
     * Group by Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuariosGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usuariosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usuariosGroupByArgs['orderBy'] }
        : { orderBy?: usuariosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usuariosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuariosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the usuarios model
   */
  readonly fields: usuariosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for usuarios.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usuariosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tienda<T extends usuarios$tiendaArgs<ExtArgs> = {}>(args?: Subset<T, usuarios$tiendaArgs<ExtArgs>>): Prisma__tiendaClient<$Result.GetResult<Prisma.$tiendaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the usuarios model
   */
  interface usuariosFieldRefs {
    readonly Id: FieldRef<"usuarios", 'String'>
    readonly nombre: FieldRef<"usuarios", 'String'>
    readonly email: FieldRef<"usuarios", 'String'>
    readonly contrasena: FieldRef<"usuarios", 'String'>
    readonly fotoUrl: FieldRef<"usuarios", 'String'>
    readonly codigoVerificacion: FieldRef<"usuarios", 'String'>
    readonly codigoVerificacionExp: FieldRef<"usuarios", 'DateTime'>
    readonly activo: FieldRef<"usuarios", 'Boolean'>
    readonly verificado: FieldRef<"usuarios", 'Boolean'>
    readonly rol: FieldRef<"usuarios", 'usuarios_rol'>
    readonly Id_tienda: FieldRef<"usuarios", 'String'>
  }
    

  // Custom InputTypes
  /**
   * usuarios findUnique
   */
  export type usuariosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    /**
     * Filter, which usuarios to fetch.
     */
    where: usuariosWhereUniqueInput
  }

  /**
   * usuarios findUniqueOrThrow
   */
  export type usuariosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    /**
     * Filter, which usuarios to fetch.
     */
    where: usuariosWhereUniqueInput
  }

  /**
   * usuarios findFirst
   */
  export type usuariosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    /**
     * Filter, which usuarios to fetch.
     */
    where?: usuariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of usuarios to fetch.
     */
    orderBy?: usuariosOrderByWithRelationInput | usuariosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for usuarios.
     */
    cursor?: usuariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of usuarios.
     */
    distinct?: UsuariosScalarFieldEnum | UsuariosScalarFieldEnum[]
  }

  /**
   * usuarios findFirstOrThrow
   */
  export type usuariosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    /**
     * Filter, which usuarios to fetch.
     */
    where?: usuariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of usuarios to fetch.
     */
    orderBy?: usuariosOrderByWithRelationInput | usuariosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for usuarios.
     */
    cursor?: usuariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of usuarios.
     */
    distinct?: UsuariosScalarFieldEnum | UsuariosScalarFieldEnum[]
  }

  /**
   * usuarios findMany
   */
  export type usuariosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    /**
     * Filter, which usuarios to fetch.
     */
    where?: usuariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of usuarios to fetch.
     */
    orderBy?: usuariosOrderByWithRelationInput | usuariosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing usuarios.
     */
    cursor?: usuariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` usuarios.
     */
    skip?: number
    distinct?: UsuariosScalarFieldEnum | UsuariosScalarFieldEnum[]
  }

  /**
   * usuarios create
   */
  export type usuariosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    /**
     * The data needed to create a usuarios.
     */
    data: XOR<usuariosCreateInput, usuariosUncheckedCreateInput>
  }

  /**
   * usuarios createMany
   */
  export type usuariosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many usuarios.
     */
    data: usuariosCreateManyInput | usuariosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * usuarios update
   */
  export type usuariosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    /**
     * The data needed to update a usuarios.
     */
    data: XOR<usuariosUpdateInput, usuariosUncheckedUpdateInput>
    /**
     * Choose, which usuarios to update.
     */
    where: usuariosWhereUniqueInput
  }

  /**
   * usuarios updateMany
   */
  export type usuariosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update usuarios.
     */
    data: XOR<usuariosUpdateManyMutationInput, usuariosUncheckedUpdateManyInput>
    /**
     * Filter which usuarios to update
     */
    where?: usuariosWhereInput
    /**
     * Limit how many usuarios to update.
     */
    limit?: number
  }

  /**
   * usuarios upsert
   */
  export type usuariosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    /**
     * The filter to search for the usuarios to update in case it exists.
     */
    where: usuariosWhereUniqueInput
    /**
     * In case the usuarios found by the `where` argument doesn't exist, create a new usuarios with this data.
     */
    create: XOR<usuariosCreateInput, usuariosUncheckedCreateInput>
    /**
     * In case the usuarios was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usuariosUpdateInput, usuariosUncheckedUpdateInput>
  }

  /**
   * usuarios delete
   */
  export type usuariosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    /**
     * Filter which usuarios to delete.
     */
    where: usuariosWhereUniqueInput
  }

  /**
   * usuarios deleteMany
   */
  export type usuariosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which usuarios to delete
     */
    where?: usuariosWhereInput
    /**
     * Limit how many usuarios to delete.
     */
    limit?: number
  }

  /**
   * usuarios.tienda
   */
  export type usuarios$tiendaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tienda
     */
    select?: tiendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tienda
     */
    omit?: tiendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tiendaInclude<ExtArgs> | null
    where?: tiendaWhereInput
  }

  /**
   * usuarios without action
   */
  export type usuariosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
  }


  /**
   * Model venta
   */

  export type AggregateVenta = {
    _count: VentaCountAggregateOutputType | null
    _avg: VentaAvgAggregateOutputType | null
    _sum: VentaSumAggregateOutputType | null
    _min: VentaMinAggregateOutputType | null
    _max: VentaMaxAggregateOutputType | null
  }

  export type VentaAvgAggregateOutputType = {
    totaldeganancias: Decimal | null
  }

  export type VentaSumAggregateOutputType = {
    totaldeganancias: Decimal | null
  }

  export type VentaMinAggregateOutputType = {
    Id: string | null
    totaldeganancias: Decimal | null
    fechaDeVenta: Date | null
  }

  export type VentaMaxAggregateOutputType = {
    Id: string | null
    totaldeganancias: Decimal | null
    fechaDeVenta: Date | null
  }

  export type VentaCountAggregateOutputType = {
    Id: number
    totaldeganancias: number
    fechaDeVenta: number
    _all: number
  }


  export type VentaAvgAggregateInputType = {
    totaldeganancias?: true
  }

  export type VentaSumAggregateInputType = {
    totaldeganancias?: true
  }

  export type VentaMinAggregateInputType = {
    Id?: true
    totaldeganancias?: true
    fechaDeVenta?: true
  }

  export type VentaMaxAggregateInputType = {
    Id?: true
    totaldeganancias?: true
    fechaDeVenta?: true
  }

  export type VentaCountAggregateInputType = {
    Id?: true
    totaldeganancias?: true
    fechaDeVenta?: true
    _all?: true
  }

  export type VentaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which venta to aggregate.
     */
    where?: ventaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ventas to fetch.
     */
    orderBy?: ventaOrderByWithRelationInput | ventaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ventaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ventas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ventas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ventas
    **/
    _count?: true | VentaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VentaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VentaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VentaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VentaMaxAggregateInputType
  }

  export type GetVentaAggregateType<T extends VentaAggregateArgs> = {
        [P in keyof T & keyof AggregateVenta]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVenta[P]>
      : GetScalarType<T[P], AggregateVenta[P]>
  }




  export type ventaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ventaWhereInput
    orderBy?: ventaOrderByWithAggregationInput | ventaOrderByWithAggregationInput[]
    by: VentaScalarFieldEnum[] | VentaScalarFieldEnum
    having?: ventaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VentaCountAggregateInputType | true
    _avg?: VentaAvgAggregateInputType
    _sum?: VentaSumAggregateInputType
    _min?: VentaMinAggregateInputType
    _max?: VentaMaxAggregateInputType
  }

  export type VentaGroupByOutputType = {
    Id: string
    totaldeganancias: Decimal | null
    fechaDeVenta: Date | null
    _count: VentaCountAggregateOutputType | null
    _avg: VentaAvgAggregateOutputType | null
    _sum: VentaSumAggregateOutputType | null
    _min: VentaMinAggregateOutputType | null
    _max: VentaMaxAggregateOutputType | null
  }

  type GetVentaGroupByPayload<T extends ventaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VentaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VentaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VentaGroupByOutputType[P]>
            : GetScalarType<T[P], VentaGroupByOutputType[P]>
        }
      >
    >


  export type ventaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    Id?: boolean
    totaldeganancias?: boolean
    fechaDeVenta?: boolean
    detallesventa?: boolean | venta$detallesventaArgs<ExtArgs>
    _count?: boolean | VentaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["venta"]>



  export type ventaSelectScalar = {
    Id?: boolean
    totaldeganancias?: boolean
    fechaDeVenta?: boolean
  }

  export type ventaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"Id" | "totaldeganancias" | "fechaDeVenta", ExtArgs["result"]["venta"]>
  export type ventaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    detallesventa?: boolean | venta$detallesventaArgs<ExtArgs>
    _count?: boolean | VentaCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ventaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "venta"
    objects: {
      detallesventa: Prisma.$detallesventaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      Id: string
      totaldeganancias: Prisma.Decimal | null
      fechaDeVenta: Date | null
    }, ExtArgs["result"]["venta"]>
    composites: {}
  }

  type ventaGetPayload<S extends boolean | null | undefined | ventaDefaultArgs> = $Result.GetResult<Prisma.$ventaPayload, S>

  type ventaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ventaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VentaCountAggregateInputType | true
    }

  export interface ventaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['venta'], meta: { name: 'venta' } }
    /**
     * Find zero or one Venta that matches the filter.
     * @param {ventaFindUniqueArgs} args - Arguments to find a Venta
     * @example
     * // Get one Venta
     * const venta = await prisma.venta.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ventaFindUniqueArgs>(args: SelectSubset<T, ventaFindUniqueArgs<ExtArgs>>): Prisma__ventaClient<$Result.GetResult<Prisma.$ventaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Venta that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ventaFindUniqueOrThrowArgs} args - Arguments to find a Venta
     * @example
     * // Get one Venta
     * const venta = await prisma.venta.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ventaFindUniqueOrThrowArgs>(args: SelectSubset<T, ventaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ventaClient<$Result.GetResult<Prisma.$ventaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Venta that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ventaFindFirstArgs} args - Arguments to find a Venta
     * @example
     * // Get one Venta
     * const venta = await prisma.venta.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ventaFindFirstArgs>(args?: SelectSubset<T, ventaFindFirstArgs<ExtArgs>>): Prisma__ventaClient<$Result.GetResult<Prisma.$ventaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Venta that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ventaFindFirstOrThrowArgs} args - Arguments to find a Venta
     * @example
     * // Get one Venta
     * const venta = await prisma.venta.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ventaFindFirstOrThrowArgs>(args?: SelectSubset<T, ventaFindFirstOrThrowArgs<ExtArgs>>): Prisma__ventaClient<$Result.GetResult<Prisma.$ventaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Ventas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ventaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ventas
     * const ventas = await prisma.venta.findMany()
     * 
     * // Get first 10 Ventas
     * const ventas = await prisma.venta.findMany({ take: 10 })
     * 
     * // Only select the `Id`
     * const ventaWithIdOnly = await prisma.venta.findMany({ select: { Id: true } })
     * 
     */
    findMany<T extends ventaFindManyArgs>(args?: SelectSubset<T, ventaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ventaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Venta.
     * @param {ventaCreateArgs} args - Arguments to create a Venta.
     * @example
     * // Create one Venta
     * const Venta = await prisma.venta.create({
     *   data: {
     *     // ... data to create a Venta
     *   }
     * })
     * 
     */
    create<T extends ventaCreateArgs>(args: SelectSubset<T, ventaCreateArgs<ExtArgs>>): Prisma__ventaClient<$Result.GetResult<Prisma.$ventaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Ventas.
     * @param {ventaCreateManyArgs} args - Arguments to create many Ventas.
     * @example
     * // Create many Ventas
     * const venta = await prisma.venta.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ventaCreateManyArgs>(args?: SelectSubset<T, ventaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Venta.
     * @param {ventaDeleteArgs} args - Arguments to delete one Venta.
     * @example
     * // Delete one Venta
     * const Venta = await prisma.venta.delete({
     *   where: {
     *     // ... filter to delete one Venta
     *   }
     * })
     * 
     */
    delete<T extends ventaDeleteArgs>(args: SelectSubset<T, ventaDeleteArgs<ExtArgs>>): Prisma__ventaClient<$Result.GetResult<Prisma.$ventaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Venta.
     * @param {ventaUpdateArgs} args - Arguments to update one Venta.
     * @example
     * // Update one Venta
     * const venta = await prisma.venta.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ventaUpdateArgs>(args: SelectSubset<T, ventaUpdateArgs<ExtArgs>>): Prisma__ventaClient<$Result.GetResult<Prisma.$ventaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Ventas.
     * @param {ventaDeleteManyArgs} args - Arguments to filter Ventas to delete.
     * @example
     * // Delete a few Ventas
     * const { count } = await prisma.venta.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ventaDeleteManyArgs>(args?: SelectSubset<T, ventaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ventas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ventaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ventas
     * const venta = await prisma.venta.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ventaUpdateManyArgs>(args: SelectSubset<T, ventaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Venta.
     * @param {ventaUpsertArgs} args - Arguments to update or create a Venta.
     * @example
     * // Update or create a Venta
     * const venta = await prisma.venta.upsert({
     *   create: {
     *     // ... data to create a Venta
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Venta we want to update
     *   }
     * })
     */
    upsert<T extends ventaUpsertArgs>(args: SelectSubset<T, ventaUpsertArgs<ExtArgs>>): Prisma__ventaClient<$Result.GetResult<Prisma.$ventaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Ventas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ventaCountArgs} args - Arguments to filter Ventas to count.
     * @example
     * // Count the number of Ventas
     * const count = await prisma.venta.count({
     *   where: {
     *     // ... the filter for the Ventas we want to count
     *   }
     * })
    **/
    count<T extends ventaCountArgs>(
      args?: Subset<T, ventaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VentaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Venta.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VentaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VentaAggregateArgs>(args: Subset<T, VentaAggregateArgs>): Prisma.PrismaPromise<GetVentaAggregateType<T>>

    /**
     * Group by Venta.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ventaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ventaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ventaGroupByArgs['orderBy'] }
        : { orderBy?: ventaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ventaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVentaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the venta model
   */
  readonly fields: ventaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for venta.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ventaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    detallesventa<T extends venta$detallesventaArgs<ExtArgs> = {}>(args?: Subset<T, venta$detallesventaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$detallesventaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the venta model
   */
  interface ventaFieldRefs {
    readonly Id: FieldRef<"venta", 'String'>
    readonly totaldeganancias: FieldRef<"venta", 'Decimal'>
    readonly fechaDeVenta: FieldRef<"venta", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * venta findUnique
   */
  export type ventaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the venta
     */
    select?: ventaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the venta
     */
    omit?: ventaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ventaInclude<ExtArgs> | null
    /**
     * Filter, which venta to fetch.
     */
    where: ventaWhereUniqueInput
  }

  /**
   * venta findUniqueOrThrow
   */
  export type ventaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the venta
     */
    select?: ventaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the venta
     */
    omit?: ventaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ventaInclude<ExtArgs> | null
    /**
     * Filter, which venta to fetch.
     */
    where: ventaWhereUniqueInput
  }

  /**
   * venta findFirst
   */
  export type ventaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the venta
     */
    select?: ventaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the venta
     */
    omit?: ventaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ventaInclude<ExtArgs> | null
    /**
     * Filter, which venta to fetch.
     */
    where?: ventaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ventas to fetch.
     */
    orderBy?: ventaOrderByWithRelationInput | ventaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ventas.
     */
    cursor?: ventaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ventas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ventas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ventas.
     */
    distinct?: VentaScalarFieldEnum | VentaScalarFieldEnum[]
  }

  /**
   * venta findFirstOrThrow
   */
  export type ventaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the venta
     */
    select?: ventaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the venta
     */
    omit?: ventaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ventaInclude<ExtArgs> | null
    /**
     * Filter, which venta to fetch.
     */
    where?: ventaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ventas to fetch.
     */
    orderBy?: ventaOrderByWithRelationInput | ventaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ventas.
     */
    cursor?: ventaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ventas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ventas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ventas.
     */
    distinct?: VentaScalarFieldEnum | VentaScalarFieldEnum[]
  }

  /**
   * venta findMany
   */
  export type ventaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the venta
     */
    select?: ventaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the venta
     */
    omit?: ventaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ventaInclude<ExtArgs> | null
    /**
     * Filter, which ventas to fetch.
     */
    where?: ventaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ventas to fetch.
     */
    orderBy?: ventaOrderByWithRelationInput | ventaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ventas.
     */
    cursor?: ventaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ventas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ventas.
     */
    skip?: number
    distinct?: VentaScalarFieldEnum | VentaScalarFieldEnum[]
  }

  /**
   * venta create
   */
  export type ventaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the venta
     */
    select?: ventaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the venta
     */
    omit?: ventaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ventaInclude<ExtArgs> | null
    /**
     * The data needed to create a venta.
     */
    data?: XOR<ventaCreateInput, ventaUncheckedCreateInput>
  }

  /**
   * venta createMany
   */
  export type ventaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ventas.
     */
    data: ventaCreateManyInput | ventaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * venta update
   */
  export type ventaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the venta
     */
    select?: ventaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the venta
     */
    omit?: ventaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ventaInclude<ExtArgs> | null
    /**
     * The data needed to update a venta.
     */
    data: XOR<ventaUpdateInput, ventaUncheckedUpdateInput>
    /**
     * Choose, which venta to update.
     */
    where: ventaWhereUniqueInput
  }

  /**
   * venta updateMany
   */
  export type ventaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ventas.
     */
    data: XOR<ventaUpdateManyMutationInput, ventaUncheckedUpdateManyInput>
    /**
     * Filter which ventas to update
     */
    where?: ventaWhereInput
    /**
     * Limit how many ventas to update.
     */
    limit?: number
  }

  /**
   * venta upsert
   */
  export type ventaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the venta
     */
    select?: ventaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the venta
     */
    omit?: ventaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ventaInclude<ExtArgs> | null
    /**
     * The filter to search for the venta to update in case it exists.
     */
    where: ventaWhereUniqueInput
    /**
     * In case the venta found by the `where` argument doesn't exist, create a new venta with this data.
     */
    create: XOR<ventaCreateInput, ventaUncheckedCreateInput>
    /**
     * In case the venta was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ventaUpdateInput, ventaUncheckedUpdateInput>
  }

  /**
   * venta delete
   */
  export type ventaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the venta
     */
    select?: ventaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the venta
     */
    omit?: ventaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ventaInclude<ExtArgs> | null
    /**
     * Filter which venta to delete.
     */
    where: ventaWhereUniqueInput
  }

  /**
   * venta deleteMany
   */
  export type ventaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ventas to delete
     */
    where?: ventaWhereInput
    /**
     * Limit how many ventas to delete.
     */
    limit?: number
  }

  /**
   * venta.detallesventa
   */
  export type venta$detallesventaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the detallesventa
     */
    select?: detallesventaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the detallesventa
     */
    omit?: detallesventaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: detallesventaInclude<ExtArgs> | null
    where?: detallesventaWhereInput
    orderBy?: detallesventaOrderByWithRelationInput | detallesventaOrderByWithRelationInput[]
    cursor?: detallesventaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DetallesventaScalarFieldEnum | DetallesventaScalarFieldEnum[]
  }

  /**
   * venta without action
   */
  export type ventaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the venta
     */
    select?: ventaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the venta
     */
    omit?: ventaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ventaInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AlmacenScalarFieldEnum: {
    Id: 'Id',
    nombre: 'nombre',
    Id_tienda: 'Id_tienda'
  };

  export type AlmacenScalarFieldEnum = (typeof AlmacenScalarFieldEnum)[keyof typeof AlmacenScalarFieldEnum]


  export const CategoriaScalarFieldEnum: {
    Id: 'Id',
    nombre: 'nombre',
    descripcion: 'descripcion',
    Id_producto: 'Id_producto'
  };

  export type CategoriaScalarFieldEnum = (typeof CategoriaScalarFieldEnum)[keyof typeof CategoriaScalarFieldEnum]


  export const CompraScalarFieldEnum: {
    Id: 'Id',
    fecha: 'fecha',
    total: 'total',
    sku: 'sku',
    Id_proveedor: 'Id_proveedor'
  };

  export type CompraScalarFieldEnum = (typeof CompraScalarFieldEnum)[keyof typeof CompraScalarFieldEnum]


  export const DetallesventaScalarFieldEnum: {
    Id: 'Id',
    cantidad_recibida: 'cantidad_recibida',
    devuelto: 'devuelto',
    Id_venta: 'Id_venta',
    Id_producto: 'Id_producto'
  };

  export type DetallesventaScalarFieldEnum = (typeof DetallesventaScalarFieldEnum)[keyof typeof DetallesventaScalarFieldEnum]


  export const ProductoScalarFieldEnum: {
    Id: 'Id',
    nombre: 'nombre',
    descripcion: 'descripcion',
    codigobarra: 'codigobarra',
    fotoUrl: 'fotoUrl',
    precioventa: 'precioventa',
    preciodeproveedor: 'preciodeproveedor',
    preciokilo: 'preciokilo',
    unidaddemedida: 'unidaddemedida',
    esgranel: 'esgranel',
    Id_almacen: 'Id_almacen'
  };

  export type ProductoScalarFieldEnum = (typeof ProductoScalarFieldEnum)[keyof typeof ProductoScalarFieldEnum]


  export const ProductocompraScalarFieldEnum: {
    Id: 'Id',
    cantidad: 'cantidad',
    Id_producto: 'Id_producto',
    Id_compra: 'Id_compra'
  };

  export type ProductocompraScalarFieldEnum = (typeof ProductocompraScalarFieldEnum)[keyof typeof ProductocompraScalarFieldEnum]


  export const ProveedorScalarFieldEnum: {
    Id: 'Id',
    nombre: 'nombre',
    telefono: 'telefono',
    empresa: 'empresa'
  };

  export type ProveedorScalarFieldEnum = (typeof ProveedorScalarFieldEnum)[keyof typeof ProveedorScalarFieldEnum]


  export const TiendaScalarFieldEnum: {
    Id: 'Id',
    nombre: 'nombre',
    ubicacion: 'ubicacion',
    telefono: 'telefono'
  };

  export type TiendaScalarFieldEnum = (typeof TiendaScalarFieldEnum)[keyof typeof TiendaScalarFieldEnum]


  export const UsuariosScalarFieldEnum: {
    Id: 'Id',
    nombre: 'nombre',
    email: 'email',
    contrasena: 'contrasena',
    fotoUrl: 'fotoUrl',
    codigoVerificacion: 'codigoVerificacion',
    codigoVerificacionExp: 'codigoVerificacionExp',
    activo: 'activo',
    verificado: 'verificado',
    rol: 'rol',
    Id_tienda: 'Id_tienda'
  };

  export type UsuariosScalarFieldEnum = (typeof UsuariosScalarFieldEnum)[keyof typeof UsuariosScalarFieldEnum]


  export const VentaScalarFieldEnum: {
    Id: 'Id',
    totaldeganancias: 'totaldeganancias',
    fechaDeVenta: 'fechaDeVenta'
  };

  export type VentaScalarFieldEnum = (typeof VentaScalarFieldEnum)[keyof typeof VentaScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const almacenOrderByRelevanceFieldEnum: {
    Id: 'Id',
    nombre: 'nombre',
    Id_tienda: 'Id_tienda'
  };

  export type almacenOrderByRelevanceFieldEnum = (typeof almacenOrderByRelevanceFieldEnum)[keyof typeof almacenOrderByRelevanceFieldEnum]


  export const categoriaOrderByRelevanceFieldEnum: {
    Id: 'Id',
    nombre: 'nombre',
    descripcion: 'descripcion',
    Id_producto: 'Id_producto'
  };

  export type categoriaOrderByRelevanceFieldEnum = (typeof categoriaOrderByRelevanceFieldEnum)[keyof typeof categoriaOrderByRelevanceFieldEnum]


  export const compraOrderByRelevanceFieldEnum: {
    Id: 'Id',
    sku: 'sku',
    Id_proveedor: 'Id_proveedor'
  };

  export type compraOrderByRelevanceFieldEnum = (typeof compraOrderByRelevanceFieldEnum)[keyof typeof compraOrderByRelevanceFieldEnum]


  export const detallesventaOrderByRelevanceFieldEnum: {
    Id: 'Id',
    Id_venta: 'Id_venta',
    Id_producto: 'Id_producto'
  };

  export type detallesventaOrderByRelevanceFieldEnum = (typeof detallesventaOrderByRelevanceFieldEnum)[keyof typeof detallesventaOrderByRelevanceFieldEnum]


  export const productoOrderByRelevanceFieldEnum: {
    Id: 'Id',
    nombre: 'nombre',
    descripcion: 'descripcion',
    codigobarra: 'codigobarra',
    fotoUrl: 'fotoUrl',
    unidaddemedida: 'unidaddemedida',
    Id_almacen: 'Id_almacen'
  };

  export type productoOrderByRelevanceFieldEnum = (typeof productoOrderByRelevanceFieldEnum)[keyof typeof productoOrderByRelevanceFieldEnum]


  export const productocompraOrderByRelevanceFieldEnum: {
    Id: 'Id',
    Id_producto: 'Id_producto',
    Id_compra: 'Id_compra'
  };

  export type productocompraOrderByRelevanceFieldEnum = (typeof productocompraOrderByRelevanceFieldEnum)[keyof typeof productocompraOrderByRelevanceFieldEnum]


  export const proveedorOrderByRelevanceFieldEnum: {
    Id: 'Id',
    nombre: 'nombre',
    telefono: 'telefono',
    empresa: 'empresa'
  };

  export type proveedorOrderByRelevanceFieldEnum = (typeof proveedorOrderByRelevanceFieldEnum)[keyof typeof proveedorOrderByRelevanceFieldEnum]


  export const tiendaOrderByRelevanceFieldEnum: {
    Id: 'Id',
    nombre: 'nombre',
    ubicacion: 'ubicacion',
    telefono: 'telefono'
  };

  export type tiendaOrderByRelevanceFieldEnum = (typeof tiendaOrderByRelevanceFieldEnum)[keyof typeof tiendaOrderByRelevanceFieldEnum]


  export const usuariosOrderByRelevanceFieldEnum: {
    Id: 'Id',
    nombre: 'nombre',
    email: 'email',
    contrasena: 'contrasena',
    fotoUrl: 'fotoUrl',
    codigoVerificacion: 'codigoVerificacion',
    Id_tienda: 'Id_tienda'
  };

  export type usuariosOrderByRelevanceFieldEnum = (typeof usuariosOrderByRelevanceFieldEnum)[keyof typeof usuariosOrderByRelevanceFieldEnum]


  export const ventaOrderByRelevanceFieldEnum: {
    Id: 'Id'
  };

  export type ventaOrderByRelevanceFieldEnum = (typeof ventaOrderByRelevanceFieldEnum)[keyof typeof ventaOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'usuarios_rol'
   */
  export type Enumusuarios_rolFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'usuarios_rol'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type almacenWhereInput = {
    AND?: almacenWhereInput | almacenWhereInput[]
    OR?: almacenWhereInput[]
    NOT?: almacenWhereInput | almacenWhereInput[]
    Id?: StringFilter<"almacen"> | string
    nombre?: StringNullableFilter<"almacen"> | string | null
    Id_tienda?: StringNullableFilter<"almacen"> | string | null
    tienda?: XOR<TiendaNullableScalarRelationFilter, tiendaWhereInput> | null
    producto?: ProductoListRelationFilter
  }

  export type almacenOrderByWithRelationInput = {
    Id?: SortOrder
    nombre?: SortOrderInput | SortOrder
    Id_tienda?: SortOrderInput | SortOrder
    tienda?: tiendaOrderByWithRelationInput
    producto?: productoOrderByRelationAggregateInput
    _relevance?: almacenOrderByRelevanceInput
  }

  export type almacenWhereUniqueInput = Prisma.AtLeast<{
    Id?: string
    AND?: almacenWhereInput | almacenWhereInput[]
    OR?: almacenWhereInput[]
    NOT?: almacenWhereInput | almacenWhereInput[]
    nombre?: StringNullableFilter<"almacen"> | string | null
    Id_tienda?: StringNullableFilter<"almacen"> | string | null
    tienda?: XOR<TiendaNullableScalarRelationFilter, tiendaWhereInput> | null
    producto?: ProductoListRelationFilter
  }, "Id">

  export type almacenOrderByWithAggregationInput = {
    Id?: SortOrder
    nombre?: SortOrderInput | SortOrder
    Id_tienda?: SortOrderInput | SortOrder
    _count?: almacenCountOrderByAggregateInput
    _max?: almacenMaxOrderByAggregateInput
    _min?: almacenMinOrderByAggregateInput
  }

  export type almacenScalarWhereWithAggregatesInput = {
    AND?: almacenScalarWhereWithAggregatesInput | almacenScalarWhereWithAggregatesInput[]
    OR?: almacenScalarWhereWithAggregatesInput[]
    NOT?: almacenScalarWhereWithAggregatesInput | almacenScalarWhereWithAggregatesInput[]
    Id?: StringWithAggregatesFilter<"almacen"> | string
    nombre?: StringNullableWithAggregatesFilter<"almacen"> | string | null
    Id_tienda?: StringNullableWithAggregatesFilter<"almacen"> | string | null
  }

  export type categoriaWhereInput = {
    AND?: categoriaWhereInput | categoriaWhereInput[]
    OR?: categoriaWhereInput[]
    NOT?: categoriaWhereInput | categoriaWhereInput[]
    Id?: StringFilter<"categoria"> | string
    nombre?: StringNullableFilter<"categoria"> | string | null
    descripcion?: StringNullableFilter<"categoria"> | string | null
    Id_producto?: StringNullableFilter<"categoria"> | string | null
    producto?: XOR<ProductoNullableScalarRelationFilter, productoWhereInput> | null
  }

  export type categoriaOrderByWithRelationInput = {
    Id?: SortOrder
    nombre?: SortOrderInput | SortOrder
    descripcion?: SortOrderInput | SortOrder
    Id_producto?: SortOrderInput | SortOrder
    producto?: productoOrderByWithRelationInput
    _relevance?: categoriaOrderByRelevanceInput
  }

  export type categoriaWhereUniqueInput = Prisma.AtLeast<{
    Id?: string
    AND?: categoriaWhereInput | categoriaWhereInput[]
    OR?: categoriaWhereInput[]
    NOT?: categoriaWhereInput | categoriaWhereInput[]
    nombre?: StringNullableFilter<"categoria"> | string | null
    descripcion?: StringNullableFilter<"categoria"> | string | null
    Id_producto?: StringNullableFilter<"categoria"> | string | null
    producto?: XOR<ProductoNullableScalarRelationFilter, productoWhereInput> | null
  }, "Id">

  export type categoriaOrderByWithAggregationInput = {
    Id?: SortOrder
    nombre?: SortOrderInput | SortOrder
    descripcion?: SortOrderInput | SortOrder
    Id_producto?: SortOrderInput | SortOrder
    _count?: categoriaCountOrderByAggregateInput
    _max?: categoriaMaxOrderByAggregateInput
    _min?: categoriaMinOrderByAggregateInput
  }

  export type categoriaScalarWhereWithAggregatesInput = {
    AND?: categoriaScalarWhereWithAggregatesInput | categoriaScalarWhereWithAggregatesInput[]
    OR?: categoriaScalarWhereWithAggregatesInput[]
    NOT?: categoriaScalarWhereWithAggregatesInput | categoriaScalarWhereWithAggregatesInput[]
    Id?: StringWithAggregatesFilter<"categoria"> | string
    nombre?: StringNullableWithAggregatesFilter<"categoria"> | string | null
    descripcion?: StringNullableWithAggregatesFilter<"categoria"> | string | null
    Id_producto?: StringNullableWithAggregatesFilter<"categoria"> | string | null
  }

  export type compraWhereInput = {
    AND?: compraWhereInput | compraWhereInput[]
    OR?: compraWhereInput[]
    NOT?: compraWhereInput | compraWhereInput[]
    Id?: StringFilter<"compra"> | string
    fecha?: DateTimeNullableFilter<"compra"> | Date | string | null
    total?: DecimalNullableFilter<"compra"> | Decimal | DecimalJsLike | number | string | null
    sku?: StringNullableFilter<"compra"> | string | null
    Id_proveedor?: StringNullableFilter<"compra"> | string | null
    proveedor?: XOR<ProveedorNullableScalarRelationFilter, proveedorWhereInput> | null
    productocompra?: ProductocompraListRelationFilter
  }

  export type compraOrderByWithRelationInput = {
    Id?: SortOrder
    fecha?: SortOrderInput | SortOrder
    total?: SortOrderInput | SortOrder
    sku?: SortOrderInput | SortOrder
    Id_proveedor?: SortOrderInput | SortOrder
    proveedor?: proveedorOrderByWithRelationInput
    productocompra?: productocompraOrderByRelationAggregateInput
    _relevance?: compraOrderByRelevanceInput
  }

  export type compraWhereUniqueInput = Prisma.AtLeast<{
    Id?: string
    AND?: compraWhereInput | compraWhereInput[]
    OR?: compraWhereInput[]
    NOT?: compraWhereInput | compraWhereInput[]
    fecha?: DateTimeNullableFilter<"compra"> | Date | string | null
    total?: DecimalNullableFilter<"compra"> | Decimal | DecimalJsLike | number | string | null
    sku?: StringNullableFilter<"compra"> | string | null
    Id_proveedor?: StringNullableFilter<"compra"> | string | null
    proveedor?: XOR<ProveedorNullableScalarRelationFilter, proveedorWhereInput> | null
    productocompra?: ProductocompraListRelationFilter
  }, "Id">

  export type compraOrderByWithAggregationInput = {
    Id?: SortOrder
    fecha?: SortOrderInput | SortOrder
    total?: SortOrderInput | SortOrder
    sku?: SortOrderInput | SortOrder
    Id_proveedor?: SortOrderInput | SortOrder
    _count?: compraCountOrderByAggregateInput
    _avg?: compraAvgOrderByAggregateInput
    _max?: compraMaxOrderByAggregateInput
    _min?: compraMinOrderByAggregateInput
    _sum?: compraSumOrderByAggregateInput
  }

  export type compraScalarWhereWithAggregatesInput = {
    AND?: compraScalarWhereWithAggregatesInput | compraScalarWhereWithAggregatesInput[]
    OR?: compraScalarWhereWithAggregatesInput[]
    NOT?: compraScalarWhereWithAggregatesInput | compraScalarWhereWithAggregatesInput[]
    Id?: StringWithAggregatesFilter<"compra"> | string
    fecha?: DateTimeNullableWithAggregatesFilter<"compra"> | Date | string | null
    total?: DecimalNullableWithAggregatesFilter<"compra"> | Decimal | DecimalJsLike | number | string | null
    sku?: StringNullableWithAggregatesFilter<"compra"> | string | null
    Id_proveedor?: StringNullableWithAggregatesFilter<"compra"> | string | null
  }

  export type detallesventaWhereInput = {
    AND?: detallesventaWhereInput | detallesventaWhereInput[]
    OR?: detallesventaWhereInput[]
    NOT?: detallesventaWhereInput | detallesventaWhereInput[]
    Id?: StringFilter<"detallesventa"> | string
    cantidad_recibida?: DecimalNullableFilter<"detallesventa"> | Decimal | DecimalJsLike | number | string | null
    devuelto?: DecimalNullableFilter<"detallesventa"> | Decimal | DecimalJsLike | number | string | null
    Id_venta?: StringNullableFilter<"detallesventa"> | string | null
    Id_producto?: StringNullableFilter<"detallesventa"> | string | null
    venta?: XOR<VentaNullableScalarRelationFilter, ventaWhereInput> | null
    producto?: XOR<ProductoNullableScalarRelationFilter, productoWhereInput> | null
  }

  export type detallesventaOrderByWithRelationInput = {
    Id?: SortOrder
    cantidad_recibida?: SortOrderInput | SortOrder
    devuelto?: SortOrderInput | SortOrder
    Id_venta?: SortOrderInput | SortOrder
    Id_producto?: SortOrderInput | SortOrder
    venta?: ventaOrderByWithRelationInput
    producto?: productoOrderByWithRelationInput
    _relevance?: detallesventaOrderByRelevanceInput
  }

  export type detallesventaWhereUniqueInput = Prisma.AtLeast<{
    Id?: string
    AND?: detallesventaWhereInput | detallesventaWhereInput[]
    OR?: detallesventaWhereInput[]
    NOT?: detallesventaWhereInput | detallesventaWhereInput[]
    cantidad_recibida?: DecimalNullableFilter<"detallesventa"> | Decimal | DecimalJsLike | number | string | null
    devuelto?: DecimalNullableFilter<"detallesventa"> | Decimal | DecimalJsLike | number | string | null
    Id_venta?: StringNullableFilter<"detallesventa"> | string | null
    Id_producto?: StringNullableFilter<"detallesventa"> | string | null
    venta?: XOR<VentaNullableScalarRelationFilter, ventaWhereInput> | null
    producto?: XOR<ProductoNullableScalarRelationFilter, productoWhereInput> | null
  }, "Id">

  export type detallesventaOrderByWithAggregationInput = {
    Id?: SortOrder
    cantidad_recibida?: SortOrderInput | SortOrder
    devuelto?: SortOrderInput | SortOrder
    Id_venta?: SortOrderInput | SortOrder
    Id_producto?: SortOrderInput | SortOrder
    _count?: detallesventaCountOrderByAggregateInput
    _avg?: detallesventaAvgOrderByAggregateInput
    _max?: detallesventaMaxOrderByAggregateInput
    _min?: detallesventaMinOrderByAggregateInput
    _sum?: detallesventaSumOrderByAggregateInput
  }

  export type detallesventaScalarWhereWithAggregatesInput = {
    AND?: detallesventaScalarWhereWithAggregatesInput | detallesventaScalarWhereWithAggregatesInput[]
    OR?: detallesventaScalarWhereWithAggregatesInput[]
    NOT?: detallesventaScalarWhereWithAggregatesInput | detallesventaScalarWhereWithAggregatesInput[]
    Id?: StringWithAggregatesFilter<"detallesventa"> | string
    cantidad_recibida?: DecimalNullableWithAggregatesFilter<"detallesventa"> | Decimal | DecimalJsLike | number | string | null
    devuelto?: DecimalNullableWithAggregatesFilter<"detallesventa"> | Decimal | DecimalJsLike | number | string | null
    Id_venta?: StringNullableWithAggregatesFilter<"detallesventa"> | string | null
    Id_producto?: StringNullableWithAggregatesFilter<"detallesventa"> | string | null
  }

  export type productoWhereInput = {
    AND?: productoWhereInput | productoWhereInput[]
    OR?: productoWhereInput[]
    NOT?: productoWhereInput | productoWhereInput[]
    Id?: StringFilter<"producto"> | string
    nombre?: StringNullableFilter<"producto"> | string | null
    descripcion?: StringNullableFilter<"producto"> | string | null
    codigobarra?: StringNullableFilter<"producto"> | string | null
    fotoUrl?: StringNullableFilter<"producto"> | string | null
    precioventa?: DecimalNullableFilter<"producto"> | Decimal | DecimalJsLike | number | string | null
    preciodeproveedor?: DecimalNullableFilter<"producto"> | Decimal | DecimalJsLike | number | string | null
    preciokilo?: DecimalNullableFilter<"producto"> | Decimal | DecimalJsLike | number | string | null
    unidaddemedida?: StringNullableFilter<"producto"> | string | null
    esgranel?: BoolNullableFilter<"producto"> | boolean | null
    Id_almacen?: StringNullableFilter<"producto"> | string | null
    categoria?: CategoriaListRelationFilter
    detallesventa?: DetallesventaListRelationFilter
    almacen?: XOR<AlmacenNullableScalarRelationFilter, almacenWhereInput> | null
    productocompra?: ProductocompraListRelationFilter
  }

  export type productoOrderByWithRelationInput = {
    Id?: SortOrder
    nombre?: SortOrderInput | SortOrder
    descripcion?: SortOrderInput | SortOrder
    codigobarra?: SortOrderInput | SortOrder
    fotoUrl?: SortOrderInput | SortOrder
    precioventa?: SortOrderInput | SortOrder
    preciodeproveedor?: SortOrderInput | SortOrder
    preciokilo?: SortOrderInput | SortOrder
    unidaddemedida?: SortOrderInput | SortOrder
    esgranel?: SortOrderInput | SortOrder
    Id_almacen?: SortOrderInput | SortOrder
    categoria?: categoriaOrderByRelationAggregateInput
    detallesventa?: detallesventaOrderByRelationAggregateInput
    almacen?: almacenOrderByWithRelationInput
    productocompra?: productocompraOrderByRelationAggregateInput
    _relevance?: productoOrderByRelevanceInput
  }

  export type productoWhereUniqueInput = Prisma.AtLeast<{
    Id?: string
    AND?: productoWhereInput | productoWhereInput[]
    OR?: productoWhereInput[]
    NOT?: productoWhereInput | productoWhereInput[]
    nombre?: StringNullableFilter<"producto"> | string | null
    descripcion?: StringNullableFilter<"producto"> | string | null
    codigobarra?: StringNullableFilter<"producto"> | string | null
    fotoUrl?: StringNullableFilter<"producto"> | string | null
    precioventa?: DecimalNullableFilter<"producto"> | Decimal | DecimalJsLike | number | string | null
    preciodeproveedor?: DecimalNullableFilter<"producto"> | Decimal | DecimalJsLike | number | string | null
    preciokilo?: DecimalNullableFilter<"producto"> | Decimal | DecimalJsLike | number | string | null
    unidaddemedida?: StringNullableFilter<"producto"> | string | null
    esgranel?: BoolNullableFilter<"producto"> | boolean | null
    Id_almacen?: StringNullableFilter<"producto"> | string | null
    categoria?: CategoriaListRelationFilter
    detallesventa?: DetallesventaListRelationFilter
    almacen?: XOR<AlmacenNullableScalarRelationFilter, almacenWhereInput> | null
    productocompra?: ProductocompraListRelationFilter
  }, "Id">

  export type productoOrderByWithAggregationInput = {
    Id?: SortOrder
    nombre?: SortOrderInput | SortOrder
    descripcion?: SortOrderInput | SortOrder
    codigobarra?: SortOrderInput | SortOrder
    fotoUrl?: SortOrderInput | SortOrder
    precioventa?: SortOrderInput | SortOrder
    preciodeproveedor?: SortOrderInput | SortOrder
    preciokilo?: SortOrderInput | SortOrder
    unidaddemedida?: SortOrderInput | SortOrder
    esgranel?: SortOrderInput | SortOrder
    Id_almacen?: SortOrderInput | SortOrder
    _count?: productoCountOrderByAggregateInput
    _avg?: productoAvgOrderByAggregateInput
    _max?: productoMaxOrderByAggregateInput
    _min?: productoMinOrderByAggregateInput
    _sum?: productoSumOrderByAggregateInput
  }

  export type productoScalarWhereWithAggregatesInput = {
    AND?: productoScalarWhereWithAggregatesInput | productoScalarWhereWithAggregatesInput[]
    OR?: productoScalarWhereWithAggregatesInput[]
    NOT?: productoScalarWhereWithAggregatesInput | productoScalarWhereWithAggregatesInput[]
    Id?: StringWithAggregatesFilter<"producto"> | string
    nombre?: StringNullableWithAggregatesFilter<"producto"> | string | null
    descripcion?: StringNullableWithAggregatesFilter<"producto"> | string | null
    codigobarra?: StringNullableWithAggregatesFilter<"producto"> | string | null
    fotoUrl?: StringNullableWithAggregatesFilter<"producto"> | string | null
    precioventa?: DecimalNullableWithAggregatesFilter<"producto"> | Decimal | DecimalJsLike | number | string | null
    preciodeproveedor?: DecimalNullableWithAggregatesFilter<"producto"> | Decimal | DecimalJsLike | number | string | null
    preciokilo?: DecimalNullableWithAggregatesFilter<"producto"> | Decimal | DecimalJsLike | number | string | null
    unidaddemedida?: StringNullableWithAggregatesFilter<"producto"> | string | null
    esgranel?: BoolNullableWithAggregatesFilter<"producto"> | boolean | null
    Id_almacen?: StringNullableWithAggregatesFilter<"producto"> | string | null
  }

  export type productocompraWhereInput = {
    AND?: productocompraWhereInput | productocompraWhereInput[]
    OR?: productocompraWhereInput[]
    NOT?: productocompraWhereInput | productocompraWhereInput[]
    Id?: StringFilter<"productocompra"> | string
    cantidad?: IntNullableFilter<"productocompra"> | number | null
    Id_producto?: StringNullableFilter<"productocompra"> | string | null
    Id_compra?: StringNullableFilter<"productocompra"> | string | null
    producto?: XOR<ProductoNullableScalarRelationFilter, productoWhereInput> | null
    compra?: XOR<CompraNullableScalarRelationFilter, compraWhereInput> | null
  }

  export type productocompraOrderByWithRelationInput = {
    Id?: SortOrder
    cantidad?: SortOrderInput | SortOrder
    Id_producto?: SortOrderInput | SortOrder
    Id_compra?: SortOrderInput | SortOrder
    producto?: productoOrderByWithRelationInput
    compra?: compraOrderByWithRelationInput
    _relevance?: productocompraOrderByRelevanceInput
  }

  export type productocompraWhereUniqueInput = Prisma.AtLeast<{
    Id?: string
    AND?: productocompraWhereInput | productocompraWhereInput[]
    OR?: productocompraWhereInput[]
    NOT?: productocompraWhereInput | productocompraWhereInput[]
    cantidad?: IntNullableFilter<"productocompra"> | number | null
    Id_producto?: StringNullableFilter<"productocompra"> | string | null
    Id_compra?: StringNullableFilter<"productocompra"> | string | null
    producto?: XOR<ProductoNullableScalarRelationFilter, productoWhereInput> | null
    compra?: XOR<CompraNullableScalarRelationFilter, compraWhereInput> | null
  }, "Id">

  export type productocompraOrderByWithAggregationInput = {
    Id?: SortOrder
    cantidad?: SortOrderInput | SortOrder
    Id_producto?: SortOrderInput | SortOrder
    Id_compra?: SortOrderInput | SortOrder
    _count?: productocompraCountOrderByAggregateInput
    _avg?: productocompraAvgOrderByAggregateInput
    _max?: productocompraMaxOrderByAggregateInput
    _min?: productocompraMinOrderByAggregateInput
    _sum?: productocompraSumOrderByAggregateInput
  }

  export type productocompraScalarWhereWithAggregatesInput = {
    AND?: productocompraScalarWhereWithAggregatesInput | productocompraScalarWhereWithAggregatesInput[]
    OR?: productocompraScalarWhereWithAggregatesInput[]
    NOT?: productocompraScalarWhereWithAggregatesInput | productocompraScalarWhereWithAggregatesInput[]
    Id?: StringWithAggregatesFilter<"productocompra"> | string
    cantidad?: IntNullableWithAggregatesFilter<"productocompra"> | number | null
    Id_producto?: StringNullableWithAggregatesFilter<"productocompra"> | string | null
    Id_compra?: StringNullableWithAggregatesFilter<"productocompra"> | string | null
  }

  export type proveedorWhereInput = {
    AND?: proveedorWhereInput | proveedorWhereInput[]
    OR?: proveedorWhereInput[]
    NOT?: proveedorWhereInput | proveedorWhereInput[]
    Id?: StringFilter<"proveedor"> | string
    nombre?: StringNullableFilter<"proveedor"> | string | null
    telefono?: StringNullableFilter<"proveedor"> | string | null
    empresa?: StringNullableFilter<"proveedor"> | string | null
    compra?: CompraListRelationFilter
  }

  export type proveedorOrderByWithRelationInput = {
    Id?: SortOrder
    nombre?: SortOrderInput | SortOrder
    telefono?: SortOrderInput | SortOrder
    empresa?: SortOrderInput | SortOrder
    compra?: compraOrderByRelationAggregateInput
    _relevance?: proveedorOrderByRelevanceInput
  }

  export type proveedorWhereUniqueInput = Prisma.AtLeast<{
    Id?: string
    AND?: proveedorWhereInput | proveedorWhereInput[]
    OR?: proveedorWhereInput[]
    NOT?: proveedorWhereInput | proveedorWhereInput[]
    nombre?: StringNullableFilter<"proveedor"> | string | null
    telefono?: StringNullableFilter<"proveedor"> | string | null
    empresa?: StringNullableFilter<"proveedor"> | string | null
    compra?: CompraListRelationFilter
  }, "Id">

  export type proveedorOrderByWithAggregationInput = {
    Id?: SortOrder
    nombre?: SortOrderInput | SortOrder
    telefono?: SortOrderInput | SortOrder
    empresa?: SortOrderInput | SortOrder
    _count?: proveedorCountOrderByAggregateInput
    _max?: proveedorMaxOrderByAggregateInput
    _min?: proveedorMinOrderByAggregateInput
  }

  export type proveedorScalarWhereWithAggregatesInput = {
    AND?: proveedorScalarWhereWithAggregatesInput | proveedorScalarWhereWithAggregatesInput[]
    OR?: proveedorScalarWhereWithAggregatesInput[]
    NOT?: proveedorScalarWhereWithAggregatesInput | proveedorScalarWhereWithAggregatesInput[]
    Id?: StringWithAggregatesFilter<"proveedor"> | string
    nombre?: StringNullableWithAggregatesFilter<"proveedor"> | string | null
    telefono?: StringNullableWithAggregatesFilter<"proveedor"> | string | null
    empresa?: StringNullableWithAggregatesFilter<"proveedor"> | string | null
  }

  export type tiendaWhereInput = {
    AND?: tiendaWhereInput | tiendaWhereInput[]
    OR?: tiendaWhereInput[]
    NOT?: tiendaWhereInput | tiendaWhereInput[]
    Id?: StringFilter<"tienda"> | string
    nombre?: StringNullableFilter<"tienda"> | string | null
    ubicacion?: StringNullableFilter<"tienda"> | string | null
    telefono?: StringNullableFilter<"tienda"> | string | null
    almacen?: AlmacenListRelationFilter
    usuarios?: UsuariosListRelationFilter
  }

  export type tiendaOrderByWithRelationInput = {
    Id?: SortOrder
    nombre?: SortOrderInput | SortOrder
    ubicacion?: SortOrderInput | SortOrder
    telefono?: SortOrderInput | SortOrder
    almacen?: almacenOrderByRelationAggregateInput
    usuarios?: usuariosOrderByRelationAggregateInput
    _relevance?: tiendaOrderByRelevanceInput
  }

  export type tiendaWhereUniqueInput = Prisma.AtLeast<{
    Id?: string
    AND?: tiendaWhereInput | tiendaWhereInput[]
    OR?: tiendaWhereInput[]
    NOT?: tiendaWhereInput | tiendaWhereInput[]
    nombre?: StringNullableFilter<"tienda"> | string | null
    ubicacion?: StringNullableFilter<"tienda"> | string | null
    telefono?: StringNullableFilter<"tienda"> | string | null
    almacen?: AlmacenListRelationFilter
    usuarios?: UsuariosListRelationFilter
  }, "Id">

  export type tiendaOrderByWithAggregationInput = {
    Id?: SortOrder
    nombre?: SortOrderInput | SortOrder
    ubicacion?: SortOrderInput | SortOrder
    telefono?: SortOrderInput | SortOrder
    _count?: tiendaCountOrderByAggregateInput
    _max?: tiendaMaxOrderByAggregateInput
    _min?: tiendaMinOrderByAggregateInput
  }

  export type tiendaScalarWhereWithAggregatesInput = {
    AND?: tiendaScalarWhereWithAggregatesInput | tiendaScalarWhereWithAggregatesInput[]
    OR?: tiendaScalarWhereWithAggregatesInput[]
    NOT?: tiendaScalarWhereWithAggregatesInput | tiendaScalarWhereWithAggregatesInput[]
    Id?: StringWithAggregatesFilter<"tienda"> | string
    nombre?: StringNullableWithAggregatesFilter<"tienda"> | string | null
    ubicacion?: StringNullableWithAggregatesFilter<"tienda"> | string | null
    telefono?: StringNullableWithAggregatesFilter<"tienda"> | string | null
  }

  export type usuariosWhereInput = {
    AND?: usuariosWhereInput | usuariosWhereInput[]
    OR?: usuariosWhereInput[]
    NOT?: usuariosWhereInput | usuariosWhereInput[]
    Id?: StringFilter<"usuarios"> | string
    nombre?: StringNullableFilter<"usuarios"> | string | null
    email?: StringFilter<"usuarios"> | string
    contrasena?: StringFilter<"usuarios"> | string
    fotoUrl?: StringNullableFilter<"usuarios"> | string | null
    codigoVerificacion?: StringNullableFilter<"usuarios"> | string | null
    codigoVerificacionExp?: DateTimeNullableFilter<"usuarios"> | Date | string | null
    activo?: BoolNullableFilter<"usuarios"> | boolean | null
    verificado?: BoolNullableFilter<"usuarios"> | boolean | null
    rol?: Enumusuarios_rolFilter<"usuarios"> | $Enums.usuarios_rol
    Id_tienda?: StringNullableFilter<"usuarios"> | string | null
    tienda?: XOR<TiendaNullableScalarRelationFilter, tiendaWhereInput> | null
  }

  export type usuariosOrderByWithRelationInput = {
    Id?: SortOrder
    nombre?: SortOrderInput | SortOrder
    email?: SortOrder
    contrasena?: SortOrder
    fotoUrl?: SortOrderInput | SortOrder
    codigoVerificacion?: SortOrderInput | SortOrder
    codigoVerificacionExp?: SortOrderInput | SortOrder
    activo?: SortOrderInput | SortOrder
    verificado?: SortOrderInput | SortOrder
    rol?: SortOrder
    Id_tienda?: SortOrderInput | SortOrder
    tienda?: tiendaOrderByWithRelationInput
    _relevance?: usuariosOrderByRelevanceInput
  }

  export type usuariosWhereUniqueInput = Prisma.AtLeast<{
    Id?: string
    email?: string
    AND?: usuariosWhereInput | usuariosWhereInput[]
    OR?: usuariosWhereInput[]
    NOT?: usuariosWhereInput | usuariosWhereInput[]
    nombre?: StringNullableFilter<"usuarios"> | string | null
    contrasena?: StringFilter<"usuarios"> | string
    fotoUrl?: StringNullableFilter<"usuarios"> | string | null
    codigoVerificacion?: StringNullableFilter<"usuarios"> | string | null
    codigoVerificacionExp?: DateTimeNullableFilter<"usuarios"> | Date | string | null
    activo?: BoolNullableFilter<"usuarios"> | boolean | null
    verificado?: BoolNullableFilter<"usuarios"> | boolean | null
    rol?: Enumusuarios_rolFilter<"usuarios"> | $Enums.usuarios_rol
    Id_tienda?: StringNullableFilter<"usuarios"> | string | null
    tienda?: XOR<TiendaNullableScalarRelationFilter, tiendaWhereInput> | null
  }, "Id" | "email">

  export type usuariosOrderByWithAggregationInput = {
    Id?: SortOrder
    nombre?: SortOrderInput | SortOrder
    email?: SortOrder
    contrasena?: SortOrder
    fotoUrl?: SortOrderInput | SortOrder
    codigoVerificacion?: SortOrderInput | SortOrder
    codigoVerificacionExp?: SortOrderInput | SortOrder
    activo?: SortOrderInput | SortOrder
    verificado?: SortOrderInput | SortOrder
    rol?: SortOrder
    Id_tienda?: SortOrderInput | SortOrder
    _count?: usuariosCountOrderByAggregateInput
    _max?: usuariosMaxOrderByAggregateInput
    _min?: usuariosMinOrderByAggregateInput
  }

  export type usuariosScalarWhereWithAggregatesInput = {
    AND?: usuariosScalarWhereWithAggregatesInput | usuariosScalarWhereWithAggregatesInput[]
    OR?: usuariosScalarWhereWithAggregatesInput[]
    NOT?: usuariosScalarWhereWithAggregatesInput | usuariosScalarWhereWithAggregatesInput[]
    Id?: StringWithAggregatesFilter<"usuarios"> | string
    nombre?: StringNullableWithAggregatesFilter<"usuarios"> | string | null
    email?: StringWithAggregatesFilter<"usuarios"> | string
    contrasena?: StringWithAggregatesFilter<"usuarios"> | string
    fotoUrl?: StringNullableWithAggregatesFilter<"usuarios"> | string | null
    codigoVerificacion?: StringNullableWithAggregatesFilter<"usuarios"> | string | null
    codigoVerificacionExp?: DateTimeNullableWithAggregatesFilter<"usuarios"> | Date | string | null
    activo?: BoolNullableWithAggregatesFilter<"usuarios"> | boolean | null
    verificado?: BoolNullableWithAggregatesFilter<"usuarios"> | boolean | null
    rol?: Enumusuarios_rolWithAggregatesFilter<"usuarios"> | $Enums.usuarios_rol
    Id_tienda?: StringNullableWithAggregatesFilter<"usuarios"> | string | null
  }

  export type ventaWhereInput = {
    AND?: ventaWhereInput | ventaWhereInput[]
    OR?: ventaWhereInput[]
    NOT?: ventaWhereInput | ventaWhereInput[]
    Id?: StringFilter<"venta"> | string
    totaldeganancias?: DecimalNullableFilter<"venta"> | Decimal | DecimalJsLike | number | string | null
    fechaDeVenta?: DateTimeNullableFilter<"venta"> | Date | string | null
    detallesventa?: DetallesventaListRelationFilter
  }

  export type ventaOrderByWithRelationInput = {
    Id?: SortOrder
    totaldeganancias?: SortOrderInput | SortOrder
    fechaDeVenta?: SortOrderInput | SortOrder
    detallesventa?: detallesventaOrderByRelationAggregateInput
    _relevance?: ventaOrderByRelevanceInput
  }

  export type ventaWhereUniqueInput = Prisma.AtLeast<{
    Id?: string
    AND?: ventaWhereInput | ventaWhereInput[]
    OR?: ventaWhereInput[]
    NOT?: ventaWhereInput | ventaWhereInput[]
    totaldeganancias?: DecimalNullableFilter<"venta"> | Decimal | DecimalJsLike | number | string | null
    fechaDeVenta?: DateTimeNullableFilter<"venta"> | Date | string | null
    detallesventa?: DetallesventaListRelationFilter
  }, "Id">

  export type ventaOrderByWithAggregationInput = {
    Id?: SortOrder
    totaldeganancias?: SortOrderInput | SortOrder
    fechaDeVenta?: SortOrderInput | SortOrder
    _count?: ventaCountOrderByAggregateInput
    _avg?: ventaAvgOrderByAggregateInput
    _max?: ventaMaxOrderByAggregateInput
    _min?: ventaMinOrderByAggregateInput
    _sum?: ventaSumOrderByAggregateInput
  }

  export type ventaScalarWhereWithAggregatesInput = {
    AND?: ventaScalarWhereWithAggregatesInput | ventaScalarWhereWithAggregatesInput[]
    OR?: ventaScalarWhereWithAggregatesInput[]
    NOT?: ventaScalarWhereWithAggregatesInput | ventaScalarWhereWithAggregatesInput[]
    Id?: StringWithAggregatesFilter<"venta"> | string
    totaldeganancias?: DecimalNullableWithAggregatesFilter<"venta"> | Decimal | DecimalJsLike | number | string | null
    fechaDeVenta?: DateTimeNullableWithAggregatesFilter<"venta"> | Date | string | null
  }

  export type almacenCreateInput = {
    Id?: string
    nombre?: string | null
    tienda?: tiendaCreateNestedOneWithoutAlmacenInput
    producto?: productoCreateNestedManyWithoutAlmacenInput
  }

  export type almacenUncheckedCreateInput = {
    Id?: string
    nombre?: string | null
    Id_tienda?: string | null
    producto?: productoUncheckedCreateNestedManyWithoutAlmacenInput
  }

  export type almacenUpdateInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    tienda?: tiendaUpdateOneWithoutAlmacenNestedInput
    producto?: productoUpdateManyWithoutAlmacenNestedInput
  }

  export type almacenUncheckedUpdateInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    Id_tienda?: NullableStringFieldUpdateOperationsInput | string | null
    producto?: productoUncheckedUpdateManyWithoutAlmacenNestedInput
  }

  export type almacenCreateManyInput = {
    Id?: string
    nombre?: string | null
    Id_tienda?: string | null
  }

  export type almacenUpdateManyMutationInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type almacenUncheckedUpdateManyInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    Id_tienda?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type categoriaCreateInput = {
    Id?: string
    nombre?: string | null
    descripcion?: string | null
    producto?: productoCreateNestedOneWithoutCategoriaInput
  }

  export type categoriaUncheckedCreateInput = {
    Id?: string
    nombre?: string | null
    descripcion?: string | null
    Id_producto?: string | null
  }

  export type categoriaUpdateInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    producto?: productoUpdateOneWithoutCategoriaNestedInput
  }

  export type categoriaUncheckedUpdateInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    Id_producto?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type categoriaCreateManyInput = {
    Id?: string
    nombre?: string | null
    descripcion?: string | null
    Id_producto?: string | null
  }

  export type categoriaUpdateManyMutationInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type categoriaUncheckedUpdateManyInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    Id_producto?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type compraCreateInput = {
    Id?: string
    fecha?: Date | string | null
    total?: Decimal | DecimalJsLike | number | string | null
    sku?: string | null
    proveedor?: proveedorCreateNestedOneWithoutCompraInput
    productocompra?: productocompraCreateNestedManyWithoutCompraInput
  }

  export type compraUncheckedCreateInput = {
    Id?: string
    fecha?: Date | string | null
    total?: Decimal | DecimalJsLike | number | string | null
    sku?: string | null
    Id_proveedor?: string | null
    productocompra?: productocompraUncheckedCreateNestedManyWithoutCompraInput
  }

  export type compraUpdateInput = {
    Id?: StringFieldUpdateOperationsInput | string
    fecha?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    proveedor?: proveedorUpdateOneWithoutCompraNestedInput
    productocompra?: productocompraUpdateManyWithoutCompraNestedInput
  }

  export type compraUncheckedUpdateInput = {
    Id?: StringFieldUpdateOperationsInput | string
    fecha?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    Id_proveedor?: NullableStringFieldUpdateOperationsInput | string | null
    productocompra?: productocompraUncheckedUpdateManyWithoutCompraNestedInput
  }

  export type compraCreateManyInput = {
    Id?: string
    fecha?: Date | string | null
    total?: Decimal | DecimalJsLike | number | string | null
    sku?: string | null
    Id_proveedor?: string | null
  }

  export type compraUpdateManyMutationInput = {
    Id?: StringFieldUpdateOperationsInput | string
    fecha?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type compraUncheckedUpdateManyInput = {
    Id?: StringFieldUpdateOperationsInput | string
    fecha?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    Id_proveedor?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type detallesventaCreateInput = {
    Id?: string
    cantidad_recibida?: Decimal | DecimalJsLike | number | string | null
    devuelto?: Decimal | DecimalJsLike | number | string | null
    venta?: ventaCreateNestedOneWithoutDetallesventaInput
    producto?: productoCreateNestedOneWithoutDetallesventaInput
  }

  export type detallesventaUncheckedCreateInput = {
    Id?: string
    cantidad_recibida?: Decimal | DecimalJsLike | number | string | null
    devuelto?: Decimal | DecimalJsLike | number | string | null
    Id_venta?: string | null
    Id_producto?: string | null
  }

  export type detallesventaUpdateInput = {
    Id?: StringFieldUpdateOperationsInput | string
    cantidad_recibida?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    devuelto?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    venta?: ventaUpdateOneWithoutDetallesventaNestedInput
    producto?: productoUpdateOneWithoutDetallesventaNestedInput
  }

  export type detallesventaUncheckedUpdateInput = {
    Id?: StringFieldUpdateOperationsInput | string
    cantidad_recibida?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    devuelto?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    Id_venta?: NullableStringFieldUpdateOperationsInput | string | null
    Id_producto?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type detallesventaCreateManyInput = {
    Id?: string
    cantidad_recibida?: Decimal | DecimalJsLike | number | string | null
    devuelto?: Decimal | DecimalJsLike | number | string | null
    Id_venta?: string | null
    Id_producto?: string | null
  }

  export type detallesventaUpdateManyMutationInput = {
    Id?: StringFieldUpdateOperationsInput | string
    cantidad_recibida?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    devuelto?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
  }

  export type detallesventaUncheckedUpdateManyInput = {
    Id?: StringFieldUpdateOperationsInput | string
    cantidad_recibida?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    devuelto?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    Id_venta?: NullableStringFieldUpdateOperationsInput | string | null
    Id_producto?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type productoCreateInput = {
    Id?: string
    nombre?: string | null
    descripcion?: string | null
    codigobarra?: string | null
    fotoUrl?: string | null
    precioventa?: Decimal | DecimalJsLike | number | string | null
    preciodeproveedor?: Decimal | DecimalJsLike | number | string | null
    preciokilo?: Decimal | DecimalJsLike | number | string | null
    unidaddemedida?: string | null
    esgranel?: boolean | null
    categoria?: categoriaCreateNestedManyWithoutProductoInput
    detallesventa?: detallesventaCreateNestedManyWithoutProductoInput
    almacen?: almacenCreateNestedOneWithoutProductoInput
    productocompra?: productocompraCreateNestedManyWithoutProductoInput
  }

  export type productoUncheckedCreateInput = {
    Id?: string
    nombre?: string | null
    descripcion?: string | null
    codigobarra?: string | null
    fotoUrl?: string | null
    precioventa?: Decimal | DecimalJsLike | number | string | null
    preciodeproveedor?: Decimal | DecimalJsLike | number | string | null
    preciokilo?: Decimal | DecimalJsLike | number | string | null
    unidaddemedida?: string | null
    esgranel?: boolean | null
    Id_almacen?: string | null
    categoria?: categoriaUncheckedCreateNestedManyWithoutProductoInput
    detallesventa?: detallesventaUncheckedCreateNestedManyWithoutProductoInput
    productocompra?: productocompraUncheckedCreateNestedManyWithoutProductoInput
  }

  export type productoUpdateInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    codigobarra?: NullableStringFieldUpdateOperationsInput | string | null
    fotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    precioventa?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    preciodeproveedor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    preciokilo?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    unidaddemedida?: NullableStringFieldUpdateOperationsInput | string | null
    esgranel?: NullableBoolFieldUpdateOperationsInput | boolean | null
    categoria?: categoriaUpdateManyWithoutProductoNestedInput
    detallesventa?: detallesventaUpdateManyWithoutProductoNestedInput
    almacen?: almacenUpdateOneWithoutProductoNestedInput
    productocompra?: productocompraUpdateManyWithoutProductoNestedInput
  }

  export type productoUncheckedUpdateInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    codigobarra?: NullableStringFieldUpdateOperationsInput | string | null
    fotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    precioventa?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    preciodeproveedor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    preciokilo?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    unidaddemedida?: NullableStringFieldUpdateOperationsInput | string | null
    esgranel?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Id_almacen?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: categoriaUncheckedUpdateManyWithoutProductoNestedInput
    detallesventa?: detallesventaUncheckedUpdateManyWithoutProductoNestedInput
    productocompra?: productocompraUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type productoCreateManyInput = {
    Id?: string
    nombre?: string | null
    descripcion?: string | null
    codigobarra?: string | null
    fotoUrl?: string | null
    precioventa?: Decimal | DecimalJsLike | number | string | null
    preciodeproveedor?: Decimal | DecimalJsLike | number | string | null
    preciokilo?: Decimal | DecimalJsLike | number | string | null
    unidaddemedida?: string | null
    esgranel?: boolean | null
    Id_almacen?: string | null
  }

  export type productoUpdateManyMutationInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    codigobarra?: NullableStringFieldUpdateOperationsInput | string | null
    fotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    precioventa?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    preciodeproveedor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    preciokilo?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    unidaddemedida?: NullableStringFieldUpdateOperationsInput | string | null
    esgranel?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type productoUncheckedUpdateManyInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    codigobarra?: NullableStringFieldUpdateOperationsInput | string | null
    fotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    precioventa?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    preciodeproveedor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    preciokilo?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    unidaddemedida?: NullableStringFieldUpdateOperationsInput | string | null
    esgranel?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Id_almacen?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type productocompraCreateInput = {
    Id?: string
    cantidad?: number | null
    producto?: productoCreateNestedOneWithoutProductocompraInput
    compra?: compraCreateNestedOneWithoutProductocompraInput
  }

  export type productocompraUncheckedCreateInput = {
    Id?: string
    cantidad?: number | null
    Id_producto?: string | null
    Id_compra?: string | null
  }

  export type productocompraUpdateInput = {
    Id?: StringFieldUpdateOperationsInput | string
    cantidad?: NullableIntFieldUpdateOperationsInput | number | null
    producto?: productoUpdateOneWithoutProductocompraNestedInput
    compra?: compraUpdateOneWithoutProductocompraNestedInput
  }

  export type productocompraUncheckedUpdateInput = {
    Id?: StringFieldUpdateOperationsInput | string
    cantidad?: NullableIntFieldUpdateOperationsInput | number | null
    Id_producto?: NullableStringFieldUpdateOperationsInput | string | null
    Id_compra?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type productocompraCreateManyInput = {
    Id?: string
    cantidad?: number | null
    Id_producto?: string | null
    Id_compra?: string | null
  }

  export type productocompraUpdateManyMutationInput = {
    Id?: StringFieldUpdateOperationsInput | string
    cantidad?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type productocompraUncheckedUpdateManyInput = {
    Id?: StringFieldUpdateOperationsInput | string
    cantidad?: NullableIntFieldUpdateOperationsInput | number | null
    Id_producto?: NullableStringFieldUpdateOperationsInput | string | null
    Id_compra?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type proveedorCreateInput = {
    Id?: string
    nombre?: string | null
    telefono?: string | null
    empresa?: string | null
    compra?: compraCreateNestedManyWithoutProveedorInput
  }

  export type proveedorUncheckedCreateInput = {
    Id?: string
    nombre?: string | null
    telefono?: string | null
    empresa?: string | null
    compra?: compraUncheckedCreateNestedManyWithoutProveedorInput
  }

  export type proveedorUpdateInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    empresa?: NullableStringFieldUpdateOperationsInput | string | null
    compra?: compraUpdateManyWithoutProveedorNestedInput
  }

  export type proveedorUncheckedUpdateInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    empresa?: NullableStringFieldUpdateOperationsInput | string | null
    compra?: compraUncheckedUpdateManyWithoutProveedorNestedInput
  }

  export type proveedorCreateManyInput = {
    Id?: string
    nombre?: string | null
    telefono?: string | null
    empresa?: string | null
  }

  export type proveedorUpdateManyMutationInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    empresa?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type proveedorUncheckedUpdateManyInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    empresa?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type tiendaCreateInput = {
    Id?: string
    nombre?: string | null
    ubicacion?: string | null
    telefono?: string | null
    almacen?: almacenCreateNestedManyWithoutTiendaInput
    usuarios?: usuariosCreateNestedManyWithoutTiendaInput
  }

  export type tiendaUncheckedCreateInput = {
    Id?: string
    nombre?: string | null
    ubicacion?: string | null
    telefono?: string | null
    almacen?: almacenUncheckedCreateNestedManyWithoutTiendaInput
    usuarios?: usuariosUncheckedCreateNestedManyWithoutTiendaInput
  }

  export type tiendaUpdateInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    ubicacion?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    almacen?: almacenUpdateManyWithoutTiendaNestedInput
    usuarios?: usuariosUpdateManyWithoutTiendaNestedInput
  }

  export type tiendaUncheckedUpdateInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    ubicacion?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    almacen?: almacenUncheckedUpdateManyWithoutTiendaNestedInput
    usuarios?: usuariosUncheckedUpdateManyWithoutTiendaNestedInput
  }

  export type tiendaCreateManyInput = {
    Id?: string
    nombre?: string | null
    ubicacion?: string | null
    telefono?: string | null
  }

  export type tiendaUpdateManyMutationInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    ubicacion?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type tiendaUncheckedUpdateManyInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    ubicacion?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usuariosCreateInput = {
    Id?: string
    nombre?: string | null
    email: string
    contrasena: string
    fotoUrl?: string | null
    codigoVerificacion?: string | null
    codigoVerificacionExp?: Date | string | null
    activo?: boolean | null
    verificado?: boolean | null
    rol: $Enums.usuarios_rol
    tienda?: tiendaCreateNestedOneWithoutUsuariosInput
  }

  export type usuariosUncheckedCreateInput = {
    Id?: string
    nombre?: string | null
    email: string
    contrasena: string
    fotoUrl?: string | null
    codigoVerificacion?: string | null
    codigoVerificacionExp?: Date | string | null
    activo?: boolean | null
    verificado?: boolean | null
    rol: $Enums.usuarios_rol
    Id_tienda?: string | null
  }

  export type usuariosUpdateInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    contrasena?: StringFieldUpdateOperationsInput | string
    fotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacion?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacionExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    verificado?: NullableBoolFieldUpdateOperationsInput | boolean | null
    rol?: Enumusuarios_rolFieldUpdateOperationsInput | $Enums.usuarios_rol
    tienda?: tiendaUpdateOneWithoutUsuariosNestedInput
  }

  export type usuariosUncheckedUpdateInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    contrasena?: StringFieldUpdateOperationsInput | string
    fotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacion?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacionExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    verificado?: NullableBoolFieldUpdateOperationsInput | boolean | null
    rol?: Enumusuarios_rolFieldUpdateOperationsInput | $Enums.usuarios_rol
    Id_tienda?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usuariosCreateManyInput = {
    Id?: string
    nombre?: string | null
    email: string
    contrasena: string
    fotoUrl?: string | null
    codigoVerificacion?: string | null
    codigoVerificacionExp?: Date | string | null
    activo?: boolean | null
    verificado?: boolean | null
    rol: $Enums.usuarios_rol
    Id_tienda?: string | null
  }

  export type usuariosUpdateManyMutationInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    contrasena?: StringFieldUpdateOperationsInput | string
    fotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacion?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacionExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    verificado?: NullableBoolFieldUpdateOperationsInput | boolean | null
    rol?: Enumusuarios_rolFieldUpdateOperationsInput | $Enums.usuarios_rol
  }

  export type usuariosUncheckedUpdateManyInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    contrasena?: StringFieldUpdateOperationsInput | string
    fotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacion?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacionExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    verificado?: NullableBoolFieldUpdateOperationsInput | boolean | null
    rol?: Enumusuarios_rolFieldUpdateOperationsInput | $Enums.usuarios_rol
    Id_tienda?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ventaCreateInput = {
    Id?: string
    totaldeganancias?: Decimal | DecimalJsLike | number | string | null
    fechaDeVenta?: Date | string | null
    detallesventa?: detallesventaCreateNestedManyWithoutVentaInput
  }

  export type ventaUncheckedCreateInput = {
    Id?: string
    totaldeganancias?: Decimal | DecimalJsLike | number | string | null
    fechaDeVenta?: Date | string | null
    detallesventa?: detallesventaUncheckedCreateNestedManyWithoutVentaInput
  }

  export type ventaUpdateInput = {
    Id?: StringFieldUpdateOperationsInput | string
    totaldeganancias?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fechaDeVenta?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    detallesventa?: detallesventaUpdateManyWithoutVentaNestedInput
  }

  export type ventaUncheckedUpdateInput = {
    Id?: StringFieldUpdateOperationsInput | string
    totaldeganancias?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fechaDeVenta?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    detallesventa?: detallesventaUncheckedUpdateManyWithoutVentaNestedInput
  }

  export type ventaCreateManyInput = {
    Id?: string
    totaldeganancias?: Decimal | DecimalJsLike | number | string | null
    fechaDeVenta?: Date | string | null
  }

  export type ventaUpdateManyMutationInput = {
    Id?: StringFieldUpdateOperationsInput | string
    totaldeganancias?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fechaDeVenta?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ventaUncheckedUpdateManyInput = {
    Id?: StringFieldUpdateOperationsInput | string
    totaldeganancias?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fechaDeVenta?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type TiendaNullableScalarRelationFilter = {
    is?: tiendaWhereInput | null
    isNot?: tiendaWhereInput | null
  }

  export type ProductoListRelationFilter = {
    every?: productoWhereInput
    some?: productoWhereInput
    none?: productoWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type productoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type almacenOrderByRelevanceInput = {
    fields: almacenOrderByRelevanceFieldEnum | almacenOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type almacenCountOrderByAggregateInput = {
    Id?: SortOrder
    nombre?: SortOrder
    Id_tienda?: SortOrder
  }

  export type almacenMaxOrderByAggregateInput = {
    Id?: SortOrder
    nombre?: SortOrder
    Id_tienda?: SortOrder
  }

  export type almacenMinOrderByAggregateInput = {
    Id?: SortOrder
    nombre?: SortOrder
    Id_tienda?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type ProductoNullableScalarRelationFilter = {
    is?: productoWhereInput | null
    isNot?: productoWhereInput | null
  }

  export type categoriaOrderByRelevanceInput = {
    fields: categoriaOrderByRelevanceFieldEnum | categoriaOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type categoriaCountOrderByAggregateInput = {
    Id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    Id_producto?: SortOrder
  }

  export type categoriaMaxOrderByAggregateInput = {
    Id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    Id_producto?: SortOrder
  }

  export type categoriaMinOrderByAggregateInput = {
    Id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    Id_producto?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type ProveedorNullableScalarRelationFilter = {
    is?: proveedorWhereInput | null
    isNot?: proveedorWhereInput | null
  }

  export type ProductocompraListRelationFilter = {
    every?: productocompraWhereInput
    some?: productocompraWhereInput
    none?: productocompraWhereInput
  }

  export type productocompraOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type compraOrderByRelevanceInput = {
    fields: compraOrderByRelevanceFieldEnum | compraOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type compraCountOrderByAggregateInput = {
    Id?: SortOrder
    fecha?: SortOrder
    total?: SortOrder
    sku?: SortOrder
    Id_proveedor?: SortOrder
  }

  export type compraAvgOrderByAggregateInput = {
    total?: SortOrder
  }

  export type compraMaxOrderByAggregateInput = {
    Id?: SortOrder
    fecha?: SortOrder
    total?: SortOrder
    sku?: SortOrder
    Id_proveedor?: SortOrder
  }

  export type compraMinOrderByAggregateInput = {
    Id?: SortOrder
    fecha?: SortOrder
    total?: SortOrder
    sku?: SortOrder
    Id_proveedor?: SortOrder
  }

  export type compraSumOrderByAggregateInput = {
    total?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type VentaNullableScalarRelationFilter = {
    is?: ventaWhereInput | null
    isNot?: ventaWhereInput | null
  }

  export type detallesventaOrderByRelevanceInput = {
    fields: detallesventaOrderByRelevanceFieldEnum | detallesventaOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type detallesventaCountOrderByAggregateInput = {
    Id?: SortOrder
    cantidad_recibida?: SortOrder
    devuelto?: SortOrder
    Id_venta?: SortOrder
    Id_producto?: SortOrder
  }

  export type detallesventaAvgOrderByAggregateInput = {
    cantidad_recibida?: SortOrder
    devuelto?: SortOrder
  }

  export type detallesventaMaxOrderByAggregateInput = {
    Id?: SortOrder
    cantidad_recibida?: SortOrder
    devuelto?: SortOrder
    Id_venta?: SortOrder
    Id_producto?: SortOrder
  }

  export type detallesventaMinOrderByAggregateInput = {
    Id?: SortOrder
    cantidad_recibida?: SortOrder
    devuelto?: SortOrder
    Id_venta?: SortOrder
    Id_producto?: SortOrder
  }

  export type detallesventaSumOrderByAggregateInput = {
    cantidad_recibida?: SortOrder
    devuelto?: SortOrder
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type CategoriaListRelationFilter = {
    every?: categoriaWhereInput
    some?: categoriaWhereInput
    none?: categoriaWhereInput
  }

  export type DetallesventaListRelationFilter = {
    every?: detallesventaWhereInput
    some?: detallesventaWhereInput
    none?: detallesventaWhereInput
  }

  export type AlmacenNullableScalarRelationFilter = {
    is?: almacenWhereInput | null
    isNot?: almacenWhereInput | null
  }

  export type categoriaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type detallesventaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type productoOrderByRelevanceInput = {
    fields: productoOrderByRelevanceFieldEnum | productoOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type productoCountOrderByAggregateInput = {
    Id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    codigobarra?: SortOrder
    fotoUrl?: SortOrder
    precioventa?: SortOrder
    preciodeproveedor?: SortOrder
    preciokilo?: SortOrder
    unidaddemedida?: SortOrder
    esgranel?: SortOrder
    Id_almacen?: SortOrder
  }

  export type productoAvgOrderByAggregateInput = {
    precioventa?: SortOrder
    preciodeproveedor?: SortOrder
    preciokilo?: SortOrder
  }

  export type productoMaxOrderByAggregateInput = {
    Id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    codigobarra?: SortOrder
    fotoUrl?: SortOrder
    precioventa?: SortOrder
    preciodeproveedor?: SortOrder
    preciokilo?: SortOrder
    unidaddemedida?: SortOrder
    esgranel?: SortOrder
    Id_almacen?: SortOrder
  }

  export type productoMinOrderByAggregateInput = {
    Id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    codigobarra?: SortOrder
    fotoUrl?: SortOrder
    precioventa?: SortOrder
    preciodeproveedor?: SortOrder
    preciokilo?: SortOrder
    unidaddemedida?: SortOrder
    esgranel?: SortOrder
    Id_almacen?: SortOrder
  }

  export type productoSumOrderByAggregateInput = {
    precioventa?: SortOrder
    preciodeproveedor?: SortOrder
    preciokilo?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type CompraNullableScalarRelationFilter = {
    is?: compraWhereInput | null
    isNot?: compraWhereInput | null
  }

  export type productocompraOrderByRelevanceInput = {
    fields: productocompraOrderByRelevanceFieldEnum | productocompraOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type productocompraCountOrderByAggregateInput = {
    Id?: SortOrder
    cantidad?: SortOrder
    Id_producto?: SortOrder
    Id_compra?: SortOrder
  }

  export type productocompraAvgOrderByAggregateInput = {
    cantidad?: SortOrder
  }

  export type productocompraMaxOrderByAggregateInput = {
    Id?: SortOrder
    cantidad?: SortOrder
    Id_producto?: SortOrder
    Id_compra?: SortOrder
  }

  export type productocompraMinOrderByAggregateInput = {
    Id?: SortOrder
    cantidad?: SortOrder
    Id_producto?: SortOrder
    Id_compra?: SortOrder
  }

  export type productocompraSumOrderByAggregateInput = {
    cantidad?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type CompraListRelationFilter = {
    every?: compraWhereInput
    some?: compraWhereInput
    none?: compraWhereInput
  }

  export type compraOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type proveedorOrderByRelevanceInput = {
    fields: proveedorOrderByRelevanceFieldEnum | proveedorOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type proveedorCountOrderByAggregateInput = {
    Id?: SortOrder
    nombre?: SortOrder
    telefono?: SortOrder
    empresa?: SortOrder
  }

  export type proveedorMaxOrderByAggregateInput = {
    Id?: SortOrder
    nombre?: SortOrder
    telefono?: SortOrder
    empresa?: SortOrder
  }

  export type proveedorMinOrderByAggregateInput = {
    Id?: SortOrder
    nombre?: SortOrder
    telefono?: SortOrder
    empresa?: SortOrder
  }

  export type AlmacenListRelationFilter = {
    every?: almacenWhereInput
    some?: almacenWhereInput
    none?: almacenWhereInput
  }

  export type UsuariosListRelationFilter = {
    every?: usuariosWhereInput
    some?: usuariosWhereInput
    none?: usuariosWhereInput
  }

  export type almacenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usuariosOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type tiendaOrderByRelevanceInput = {
    fields: tiendaOrderByRelevanceFieldEnum | tiendaOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type tiendaCountOrderByAggregateInput = {
    Id?: SortOrder
    nombre?: SortOrder
    ubicacion?: SortOrder
    telefono?: SortOrder
  }

  export type tiendaMaxOrderByAggregateInput = {
    Id?: SortOrder
    nombre?: SortOrder
    ubicacion?: SortOrder
    telefono?: SortOrder
  }

  export type tiendaMinOrderByAggregateInput = {
    Id?: SortOrder
    nombre?: SortOrder
    ubicacion?: SortOrder
    telefono?: SortOrder
  }

  export type Enumusuarios_rolFilter<$PrismaModel = never> = {
    equals?: $Enums.usuarios_rol | Enumusuarios_rolFieldRefInput<$PrismaModel>
    in?: $Enums.usuarios_rol[]
    notIn?: $Enums.usuarios_rol[]
    not?: NestedEnumusuarios_rolFilter<$PrismaModel> | $Enums.usuarios_rol
  }

  export type usuariosOrderByRelevanceInput = {
    fields: usuariosOrderByRelevanceFieldEnum | usuariosOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type usuariosCountOrderByAggregateInput = {
    Id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    contrasena?: SortOrder
    fotoUrl?: SortOrder
    codigoVerificacion?: SortOrder
    codigoVerificacionExp?: SortOrder
    activo?: SortOrder
    verificado?: SortOrder
    rol?: SortOrder
    Id_tienda?: SortOrder
  }

  export type usuariosMaxOrderByAggregateInput = {
    Id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    contrasena?: SortOrder
    fotoUrl?: SortOrder
    codigoVerificacion?: SortOrder
    codigoVerificacionExp?: SortOrder
    activo?: SortOrder
    verificado?: SortOrder
    rol?: SortOrder
    Id_tienda?: SortOrder
  }

  export type usuariosMinOrderByAggregateInput = {
    Id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    contrasena?: SortOrder
    fotoUrl?: SortOrder
    codigoVerificacion?: SortOrder
    codigoVerificacionExp?: SortOrder
    activo?: SortOrder
    verificado?: SortOrder
    rol?: SortOrder
    Id_tienda?: SortOrder
  }

  export type Enumusuarios_rolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.usuarios_rol | Enumusuarios_rolFieldRefInput<$PrismaModel>
    in?: $Enums.usuarios_rol[]
    notIn?: $Enums.usuarios_rol[]
    not?: NestedEnumusuarios_rolWithAggregatesFilter<$PrismaModel> | $Enums.usuarios_rol
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumusuarios_rolFilter<$PrismaModel>
    _max?: NestedEnumusuarios_rolFilter<$PrismaModel>
  }

  export type ventaOrderByRelevanceInput = {
    fields: ventaOrderByRelevanceFieldEnum | ventaOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ventaCountOrderByAggregateInput = {
    Id?: SortOrder
    totaldeganancias?: SortOrder
    fechaDeVenta?: SortOrder
  }

  export type ventaAvgOrderByAggregateInput = {
    totaldeganancias?: SortOrder
  }

  export type ventaMaxOrderByAggregateInput = {
    Id?: SortOrder
    totaldeganancias?: SortOrder
    fechaDeVenta?: SortOrder
  }

  export type ventaMinOrderByAggregateInput = {
    Id?: SortOrder
    totaldeganancias?: SortOrder
    fechaDeVenta?: SortOrder
  }

  export type ventaSumOrderByAggregateInput = {
    totaldeganancias?: SortOrder
  }

  export type tiendaCreateNestedOneWithoutAlmacenInput = {
    create?: XOR<tiendaCreateWithoutAlmacenInput, tiendaUncheckedCreateWithoutAlmacenInput>
    connectOrCreate?: tiendaCreateOrConnectWithoutAlmacenInput
    connect?: tiendaWhereUniqueInput
  }

  export type productoCreateNestedManyWithoutAlmacenInput = {
    create?: XOR<productoCreateWithoutAlmacenInput, productoUncheckedCreateWithoutAlmacenInput> | productoCreateWithoutAlmacenInput[] | productoUncheckedCreateWithoutAlmacenInput[]
    connectOrCreate?: productoCreateOrConnectWithoutAlmacenInput | productoCreateOrConnectWithoutAlmacenInput[]
    createMany?: productoCreateManyAlmacenInputEnvelope
    connect?: productoWhereUniqueInput | productoWhereUniqueInput[]
  }

  export type productoUncheckedCreateNestedManyWithoutAlmacenInput = {
    create?: XOR<productoCreateWithoutAlmacenInput, productoUncheckedCreateWithoutAlmacenInput> | productoCreateWithoutAlmacenInput[] | productoUncheckedCreateWithoutAlmacenInput[]
    connectOrCreate?: productoCreateOrConnectWithoutAlmacenInput | productoCreateOrConnectWithoutAlmacenInput[]
    createMany?: productoCreateManyAlmacenInputEnvelope
    connect?: productoWhereUniqueInput | productoWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type tiendaUpdateOneWithoutAlmacenNestedInput = {
    create?: XOR<tiendaCreateWithoutAlmacenInput, tiendaUncheckedCreateWithoutAlmacenInput>
    connectOrCreate?: tiendaCreateOrConnectWithoutAlmacenInput
    upsert?: tiendaUpsertWithoutAlmacenInput
    disconnect?: tiendaWhereInput | boolean
    delete?: tiendaWhereInput | boolean
    connect?: tiendaWhereUniqueInput
    update?: XOR<XOR<tiendaUpdateToOneWithWhereWithoutAlmacenInput, tiendaUpdateWithoutAlmacenInput>, tiendaUncheckedUpdateWithoutAlmacenInput>
  }

  export type productoUpdateManyWithoutAlmacenNestedInput = {
    create?: XOR<productoCreateWithoutAlmacenInput, productoUncheckedCreateWithoutAlmacenInput> | productoCreateWithoutAlmacenInput[] | productoUncheckedCreateWithoutAlmacenInput[]
    connectOrCreate?: productoCreateOrConnectWithoutAlmacenInput | productoCreateOrConnectWithoutAlmacenInput[]
    upsert?: productoUpsertWithWhereUniqueWithoutAlmacenInput | productoUpsertWithWhereUniqueWithoutAlmacenInput[]
    createMany?: productoCreateManyAlmacenInputEnvelope
    set?: productoWhereUniqueInput | productoWhereUniqueInput[]
    disconnect?: productoWhereUniqueInput | productoWhereUniqueInput[]
    delete?: productoWhereUniqueInput | productoWhereUniqueInput[]
    connect?: productoWhereUniqueInput | productoWhereUniqueInput[]
    update?: productoUpdateWithWhereUniqueWithoutAlmacenInput | productoUpdateWithWhereUniqueWithoutAlmacenInput[]
    updateMany?: productoUpdateManyWithWhereWithoutAlmacenInput | productoUpdateManyWithWhereWithoutAlmacenInput[]
    deleteMany?: productoScalarWhereInput | productoScalarWhereInput[]
  }

  export type productoUncheckedUpdateManyWithoutAlmacenNestedInput = {
    create?: XOR<productoCreateWithoutAlmacenInput, productoUncheckedCreateWithoutAlmacenInput> | productoCreateWithoutAlmacenInput[] | productoUncheckedCreateWithoutAlmacenInput[]
    connectOrCreate?: productoCreateOrConnectWithoutAlmacenInput | productoCreateOrConnectWithoutAlmacenInput[]
    upsert?: productoUpsertWithWhereUniqueWithoutAlmacenInput | productoUpsertWithWhereUniqueWithoutAlmacenInput[]
    createMany?: productoCreateManyAlmacenInputEnvelope
    set?: productoWhereUniqueInput | productoWhereUniqueInput[]
    disconnect?: productoWhereUniqueInput | productoWhereUniqueInput[]
    delete?: productoWhereUniqueInput | productoWhereUniqueInput[]
    connect?: productoWhereUniqueInput | productoWhereUniqueInput[]
    update?: productoUpdateWithWhereUniqueWithoutAlmacenInput | productoUpdateWithWhereUniqueWithoutAlmacenInput[]
    updateMany?: productoUpdateManyWithWhereWithoutAlmacenInput | productoUpdateManyWithWhereWithoutAlmacenInput[]
    deleteMany?: productoScalarWhereInput | productoScalarWhereInput[]
  }

  export type productoCreateNestedOneWithoutCategoriaInput = {
    create?: XOR<productoCreateWithoutCategoriaInput, productoUncheckedCreateWithoutCategoriaInput>
    connectOrCreate?: productoCreateOrConnectWithoutCategoriaInput
    connect?: productoWhereUniqueInput
  }

  export type productoUpdateOneWithoutCategoriaNestedInput = {
    create?: XOR<productoCreateWithoutCategoriaInput, productoUncheckedCreateWithoutCategoriaInput>
    connectOrCreate?: productoCreateOrConnectWithoutCategoriaInput
    upsert?: productoUpsertWithoutCategoriaInput
    disconnect?: productoWhereInput | boolean
    delete?: productoWhereInput | boolean
    connect?: productoWhereUniqueInput
    update?: XOR<XOR<productoUpdateToOneWithWhereWithoutCategoriaInput, productoUpdateWithoutCategoriaInput>, productoUncheckedUpdateWithoutCategoriaInput>
  }

  export type proveedorCreateNestedOneWithoutCompraInput = {
    create?: XOR<proveedorCreateWithoutCompraInput, proveedorUncheckedCreateWithoutCompraInput>
    connectOrCreate?: proveedorCreateOrConnectWithoutCompraInput
    connect?: proveedorWhereUniqueInput
  }

  export type productocompraCreateNestedManyWithoutCompraInput = {
    create?: XOR<productocompraCreateWithoutCompraInput, productocompraUncheckedCreateWithoutCompraInput> | productocompraCreateWithoutCompraInput[] | productocompraUncheckedCreateWithoutCompraInput[]
    connectOrCreate?: productocompraCreateOrConnectWithoutCompraInput | productocompraCreateOrConnectWithoutCompraInput[]
    createMany?: productocompraCreateManyCompraInputEnvelope
    connect?: productocompraWhereUniqueInput | productocompraWhereUniqueInput[]
  }

  export type productocompraUncheckedCreateNestedManyWithoutCompraInput = {
    create?: XOR<productocompraCreateWithoutCompraInput, productocompraUncheckedCreateWithoutCompraInput> | productocompraCreateWithoutCompraInput[] | productocompraUncheckedCreateWithoutCompraInput[]
    connectOrCreate?: productocompraCreateOrConnectWithoutCompraInput | productocompraCreateOrConnectWithoutCompraInput[]
    createMany?: productocompraCreateManyCompraInputEnvelope
    connect?: productocompraWhereUniqueInput | productocompraWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type proveedorUpdateOneWithoutCompraNestedInput = {
    create?: XOR<proveedorCreateWithoutCompraInput, proveedorUncheckedCreateWithoutCompraInput>
    connectOrCreate?: proveedorCreateOrConnectWithoutCompraInput
    upsert?: proveedorUpsertWithoutCompraInput
    disconnect?: proveedorWhereInput | boolean
    delete?: proveedorWhereInput | boolean
    connect?: proveedorWhereUniqueInput
    update?: XOR<XOR<proveedorUpdateToOneWithWhereWithoutCompraInput, proveedorUpdateWithoutCompraInput>, proveedorUncheckedUpdateWithoutCompraInput>
  }

  export type productocompraUpdateManyWithoutCompraNestedInput = {
    create?: XOR<productocompraCreateWithoutCompraInput, productocompraUncheckedCreateWithoutCompraInput> | productocompraCreateWithoutCompraInput[] | productocompraUncheckedCreateWithoutCompraInput[]
    connectOrCreate?: productocompraCreateOrConnectWithoutCompraInput | productocompraCreateOrConnectWithoutCompraInput[]
    upsert?: productocompraUpsertWithWhereUniqueWithoutCompraInput | productocompraUpsertWithWhereUniqueWithoutCompraInput[]
    createMany?: productocompraCreateManyCompraInputEnvelope
    set?: productocompraWhereUniqueInput | productocompraWhereUniqueInput[]
    disconnect?: productocompraWhereUniqueInput | productocompraWhereUniqueInput[]
    delete?: productocompraWhereUniqueInput | productocompraWhereUniqueInput[]
    connect?: productocompraWhereUniqueInput | productocompraWhereUniqueInput[]
    update?: productocompraUpdateWithWhereUniqueWithoutCompraInput | productocompraUpdateWithWhereUniqueWithoutCompraInput[]
    updateMany?: productocompraUpdateManyWithWhereWithoutCompraInput | productocompraUpdateManyWithWhereWithoutCompraInput[]
    deleteMany?: productocompraScalarWhereInput | productocompraScalarWhereInput[]
  }

  export type productocompraUncheckedUpdateManyWithoutCompraNestedInput = {
    create?: XOR<productocompraCreateWithoutCompraInput, productocompraUncheckedCreateWithoutCompraInput> | productocompraCreateWithoutCompraInput[] | productocompraUncheckedCreateWithoutCompraInput[]
    connectOrCreate?: productocompraCreateOrConnectWithoutCompraInput | productocompraCreateOrConnectWithoutCompraInput[]
    upsert?: productocompraUpsertWithWhereUniqueWithoutCompraInput | productocompraUpsertWithWhereUniqueWithoutCompraInput[]
    createMany?: productocompraCreateManyCompraInputEnvelope
    set?: productocompraWhereUniqueInput | productocompraWhereUniqueInput[]
    disconnect?: productocompraWhereUniqueInput | productocompraWhereUniqueInput[]
    delete?: productocompraWhereUniqueInput | productocompraWhereUniqueInput[]
    connect?: productocompraWhereUniqueInput | productocompraWhereUniqueInput[]
    update?: productocompraUpdateWithWhereUniqueWithoutCompraInput | productocompraUpdateWithWhereUniqueWithoutCompraInput[]
    updateMany?: productocompraUpdateManyWithWhereWithoutCompraInput | productocompraUpdateManyWithWhereWithoutCompraInput[]
    deleteMany?: productocompraScalarWhereInput | productocompraScalarWhereInput[]
  }

  export type ventaCreateNestedOneWithoutDetallesventaInput = {
    create?: XOR<ventaCreateWithoutDetallesventaInput, ventaUncheckedCreateWithoutDetallesventaInput>
    connectOrCreate?: ventaCreateOrConnectWithoutDetallesventaInput
    connect?: ventaWhereUniqueInput
  }

  export type productoCreateNestedOneWithoutDetallesventaInput = {
    create?: XOR<productoCreateWithoutDetallesventaInput, productoUncheckedCreateWithoutDetallesventaInput>
    connectOrCreate?: productoCreateOrConnectWithoutDetallesventaInput
    connect?: productoWhereUniqueInput
  }

  export type ventaUpdateOneWithoutDetallesventaNestedInput = {
    create?: XOR<ventaCreateWithoutDetallesventaInput, ventaUncheckedCreateWithoutDetallesventaInput>
    connectOrCreate?: ventaCreateOrConnectWithoutDetallesventaInput
    upsert?: ventaUpsertWithoutDetallesventaInput
    disconnect?: ventaWhereInput | boolean
    delete?: ventaWhereInput | boolean
    connect?: ventaWhereUniqueInput
    update?: XOR<XOR<ventaUpdateToOneWithWhereWithoutDetallesventaInput, ventaUpdateWithoutDetallesventaInput>, ventaUncheckedUpdateWithoutDetallesventaInput>
  }

  export type productoUpdateOneWithoutDetallesventaNestedInput = {
    create?: XOR<productoCreateWithoutDetallesventaInput, productoUncheckedCreateWithoutDetallesventaInput>
    connectOrCreate?: productoCreateOrConnectWithoutDetallesventaInput
    upsert?: productoUpsertWithoutDetallesventaInput
    disconnect?: productoWhereInput | boolean
    delete?: productoWhereInput | boolean
    connect?: productoWhereUniqueInput
    update?: XOR<XOR<productoUpdateToOneWithWhereWithoutDetallesventaInput, productoUpdateWithoutDetallesventaInput>, productoUncheckedUpdateWithoutDetallesventaInput>
  }

  export type categoriaCreateNestedManyWithoutProductoInput = {
    create?: XOR<categoriaCreateWithoutProductoInput, categoriaUncheckedCreateWithoutProductoInput> | categoriaCreateWithoutProductoInput[] | categoriaUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: categoriaCreateOrConnectWithoutProductoInput | categoriaCreateOrConnectWithoutProductoInput[]
    createMany?: categoriaCreateManyProductoInputEnvelope
    connect?: categoriaWhereUniqueInput | categoriaWhereUniqueInput[]
  }

  export type detallesventaCreateNestedManyWithoutProductoInput = {
    create?: XOR<detallesventaCreateWithoutProductoInput, detallesventaUncheckedCreateWithoutProductoInput> | detallesventaCreateWithoutProductoInput[] | detallesventaUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: detallesventaCreateOrConnectWithoutProductoInput | detallesventaCreateOrConnectWithoutProductoInput[]
    createMany?: detallesventaCreateManyProductoInputEnvelope
    connect?: detallesventaWhereUniqueInput | detallesventaWhereUniqueInput[]
  }

  export type almacenCreateNestedOneWithoutProductoInput = {
    create?: XOR<almacenCreateWithoutProductoInput, almacenUncheckedCreateWithoutProductoInput>
    connectOrCreate?: almacenCreateOrConnectWithoutProductoInput
    connect?: almacenWhereUniqueInput
  }

  export type productocompraCreateNestedManyWithoutProductoInput = {
    create?: XOR<productocompraCreateWithoutProductoInput, productocompraUncheckedCreateWithoutProductoInput> | productocompraCreateWithoutProductoInput[] | productocompraUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: productocompraCreateOrConnectWithoutProductoInput | productocompraCreateOrConnectWithoutProductoInput[]
    createMany?: productocompraCreateManyProductoInputEnvelope
    connect?: productocompraWhereUniqueInput | productocompraWhereUniqueInput[]
  }

  export type categoriaUncheckedCreateNestedManyWithoutProductoInput = {
    create?: XOR<categoriaCreateWithoutProductoInput, categoriaUncheckedCreateWithoutProductoInput> | categoriaCreateWithoutProductoInput[] | categoriaUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: categoriaCreateOrConnectWithoutProductoInput | categoriaCreateOrConnectWithoutProductoInput[]
    createMany?: categoriaCreateManyProductoInputEnvelope
    connect?: categoriaWhereUniqueInput | categoriaWhereUniqueInput[]
  }

  export type detallesventaUncheckedCreateNestedManyWithoutProductoInput = {
    create?: XOR<detallesventaCreateWithoutProductoInput, detallesventaUncheckedCreateWithoutProductoInput> | detallesventaCreateWithoutProductoInput[] | detallesventaUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: detallesventaCreateOrConnectWithoutProductoInput | detallesventaCreateOrConnectWithoutProductoInput[]
    createMany?: detallesventaCreateManyProductoInputEnvelope
    connect?: detallesventaWhereUniqueInput | detallesventaWhereUniqueInput[]
  }

  export type productocompraUncheckedCreateNestedManyWithoutProductoInput = {
    create?: XOR<productocompraCreateWithoutProductoInput, productocompraUncheckedCreateWithoutProductoInput> | productocompraCreateWithoutProductoInput[] | productocompraUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: productocompraCreateOrConnectWithoutProductoInput | productocompraCreateOrConnectWithoutProductoInput[]
    createMany?: productocompraCreateManyProductoInputEnvelope
    connect?: productocompraWhereUniqueInput | productocompraWhereUniqueInput[]
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type categoriaUpdateManyWithoutProductoNestedInput = {
    create?: XOR<categoriaCreateWithoutProductoInput, categoriaUncheckedCreateWithoutProductoInput> | categoriaCreateWithoutProductoInput[] | categoriaUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: categoriaCreateOrConnectWithoutProductoInput | categoriaCreateOrConnectWithoutProductoInput[]
    upsert?: categoriaUpsertWithWhereUniqueWithoutProductoInput | categoriaUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: categoriaCreateManyProductoInputEnvelope
    set?: categoriaWhereUniqueInput | categoriaWhereUniqueInput[]
    disconnect?: categoriaWhereUniqueInput | categoriaWhereUniqueInput[]
    delete?: categoriaWhereUniqueInput | categoriaWhereUniqueInput[]
    connect?: categoriaWhereUniqueInput | categoriaWhereUniqueInput[]
    update?: categoriaUpdateWithWhereUniqueWithoutProductoInput | categoriaUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: categoriaUpdateManyWithWhereWithoutProductoInput | categoriaUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: categoriaScalarWhereInput | categoriaScalarWhereInput[]
  }

  export type detallesventaUpdateManyWithoutProductoNestedInput = {
    create?: XOR<detallesventaCreateWithoutProductoInput, detallesventaUncheckedCreateWithoutProductoInput> | detallesventaCreateWithoutProductoInput[] | detallesventaUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: detallesventaCreateOrConnectWithoutProductoInput | detallesventaCreateOrConnectWithoutProductoInput[]
    upsert?: detallesventaUpsertWithWhereUniqueWithoutProductoInput | detallesventaUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: detallesventaCreateManyProductoInputEnvelope
    set?: detallesventaWhereUniqueInput | detallesventaWhereUniqueInput[]
    disconnect?: detallesventaWhereUniqueInput | detallesventaWhereUniqueInput[]
    delete?: detallesventaWhereUniqueInput | detallesventaWhereUniqueInput[]
    connect?: detallesventaWhereUniqueInput | detallesventaWhereUniqueInput[]
    update?: detallesventaUpdateWithWhereUniqueWithoutProductoInput | detallesventaUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: detallesventaUpdateManyWithWhereWithoutProductoInput | detallesventaUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: detallesventaScalarWhereInput | detallesventaScalarWhereInput[]
  }

  export type almacenUpdateOneWithoutProductoNestedInput = {
    create?: XOR<almacenCreateWithoutProductoInput, almacenUncheckedCreateWithoutProductoInput>
    connectOrCreate?: almacenCreateOrConnectWithoutProductoInput
    upsert?: almacenUpsertWithoutProductoInput
    disconnect?: almacenWhereInput | boolean
    delete?: almacenWhereInput | boolean
    connect?: almacenWhereUniqueInput
    update?: XOR<XOR<almacenUpdateToOneWithWhereWithoutProductoInput, almacenUpdateWithoutProductoInput>, almacenUncheckedUpdateWithoutProductoInput>
  }

  export type productocompraUpdateManyWithoutProductoNestedInput = {
    create?: XOR<productocompraCreateWithoutProductoInput, productocompraUncheckedCreateWithoutProductoInput> | productocompraCreateWithoutProductoInput[] | productocompraUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: productocompraCreateOrConnectWithoutProductoInput | productocompraCreateOrConnectWithoutProductoInput[]
    upsert?: productocompraUpsertWithWhereUniqueWithoutProductoInput | productocompraUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: productocompraCreateManyProductoInputEnvelope
    set?: productocompraWhereUniqueInput | productocompraWhereUniqueInput[]
    disconnect?: productocompraWhereUniqueInput | productocompraWhereUniqueInput[]
    delete?: productocompraWhereUniqueInput | productocompraWhereUniqueInput[]
    connect?: productocompraWhereUniqueInput | productocompraWhereUniqueInput[]
    update?: productocompraUpdateWithWhereUniqueWithoutProductoInput | productocompraUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: productocompraUpdateManyWithWhereWithoutProductoInput | productocompraUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: productocompraScalarWhereInput | productocompraScalarWhereInput[]
  }

  export type categoriaUncheckedUpdateManyWithoutProductoNestedInput = {
    create?: XOR<categoriaCreateWithoutProductoInput, categoriaUncheckedCreateWithoutProductoInput> | categoriaCreateWithoutProductoInput[] | categoriaUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: categoriaCreateOrConnectWithoutProductoInput | categoriaCreateOrConnectWithoutProductoInput[]
    upsert?: categoriaUpsertWithWhereUniqueWithoutProductoInput | categoriaUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: categoriaCreateManyProductoInputEnvelope
    set?: categoriaWhereUniqueInput | categoriaWhereUniqueInput[]
    disconnect?: categoriaWhereUniqueInput | categoriaWhereUniqueInput[]
    delete?: categoriaWhereUniqueInput | categoriaWhereUniqueInput[]
    connect?: categoriaWhereUniqueInput | categoriaWhereUniqueInput[]
    update?: categoriaUpdateWithWhereUniqueWithoutProductoInput | categoriaUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: categoriaUpdateManyWithWhereWithoutProductoInput | categoriaUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: categoriaScalarWhereInput | categoriaScalarWhereInput[]
  }

  export type detallesventaUncheckedUpdateManyWithoutProductoNestedInput = {
    create?: XOR<detallesventaCreateWithoutProductoInput, detallesventaUncheckedCreateWithoutProductoInput> | detallesventaCreateWithoutProductoInput[] | detallesventaUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: detallesventaCreateOrConnectWithoutProductoInput | detallesventaCreateOrConnectWithoutProductoInput[]
    upsert?: detallesventaUpsertWithWhereUniqueWithoutProductoInput | detallesventaUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: detallesventaCreateManyProductoInputEnvelope
    set?: detallesventaWhereUniqueInput | detallesventaWhereUniqueInput[]
    disconnect?: detallesventaWhereUniqueInput | detallesventaWhereUniqueInput[]
    delete?: detallesventaWhereUniqueInput | detallesventaWhereUniqueInput[]
    connect?: detallesventaWhereUniqueInput | detallesventaWhereUniqueInput[]
    update?: detallesventaUpdateWithWhereUniqueWithoutProductoInput | detallesventaUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: detallesventaUpdateManyWithWhereWithoutProductoInput | detallesventaUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: detallesventaScalarWhereInput | detallesventaScalarWhereInput[]
  }

  export type productocompraUncheckedUpdateManyWithoutProductoNestedInput = {
    create?: XOR<productocompraCreateWithoutProductoInput, productocompraUncheckedCreateWithoutProductoInput> | productocompraCreateWithoutProductoInput[] | productocompraUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: productocompraCreateOrConnectWithoutProductoInput | productocompraCreateOrConnectWithoutProductoInput[]
    upsert?: productocompraUpsertWithWhereUniqueWithoutProductoInput | productocompraUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: productocompraCreateManyProductoInputEnvelope
    set?: productocompraWhereUniqueInput | productocompraWhereUniqueInput[]
    disconnect?: productocompraWhereUniqueInput | productocompraWhereUniqueInput[]
    delete?: productocompraWhereUniqueInput | productocompraWhereUniqueInput[]
    connect?: productocompraWhereUniqueInput | productocompraWhereUniqueInput[]
    update?: productocompraUpdateWithWhereUniqueWithoutProductoInput | productocompraUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: productocompraUpdateManyWithWhereWithoutProductoInput | productocompraUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: productocompraScalarWhereInput | productocompraScalarWhereInput[]
  }

  export type productoCreateNestedOneWithoutProductocompraInput = {
    create?: XOR<productoCreateWithoutProductocompraInput, productoUncheckedCreateWithoutProductocompraInput>
    connectOrCreate?: productoCreateOrConnectWithoutProductocompraInput
    connect?: productoWhereUniqueInput
  }

  export type compraCreateNestedOneWithoutProductocompraInput = {
    create?: XOR<compraCreateWithoutProductocompraInput, compraUncheckedCreateWithoutProductocompraInput>
    connectOrCreate?: compraCreateOrConnectWithoutProductocompraInput
    connect?: compraWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type productoUpdateOneWithoutProductocompraNestedInput = {
    create?: XOR<productoCreateWithoutProductocompraInput, productoUncheckedCreateWithoutProductocompraInput>
    connectOrCreate?: productoCreateOrConnectWithoutProductocompraInput
    upsert?: productoUpsertWithoutProductocompraInput
    disconnect?: productoWhereInput | boolean
    delete?: productoWhereInput | boolean
    connect?: productoWhereUniqueInput
    update?: XOR<XOR<productoUpdateToOneWithWhereWithoutProductocompraInput, productoUpdateWithoutProductocompraInput>, productoUncheckedUpdateWithoutProductocompraInput>
  }

  export type compraUpdateOneWithoutProductocompraNestedInput = {
    create?: XOR<compraCreateWithoutProductocompraInput, compraUncheckedCreateWithoutProductocompraInput>
    connectOrCreate?: compraCreateOrConnectWithoutProductocompraInput
    upsert?: compraUpsertWithoutProductocompraInput
    disconnect?: compraWhereInput | boolean
    delete?: compraWhereInput | boolean
    connect?: compraWhereUniqueInput
    update?: XOR<XOR<compraUpdateToOneWithWhereWithoutProductocompraInput, compraUpdateWithoutProductocompraInput>, compraUncheckedUpdateWithoutProductocompraInput>
  }

  export type compraCreateNestedManyWithoutProveedorInput = {
    create?: XOR<compraCreateWithoutProveedorInput, compraUncheckedCreateWithoutProveedorInput> | compraCreateWithoutProveedorInput[] | compraUncheckedCreateWithoutProveedorInput[]
    connectOrCreate?: compraCreateOrConnectWithoutProveedorInput | compraCreateOrConnectWithoutProveedorInput[]
    createMany?: compraCreateManyProveedorInputEnvelope
    connect?: compraWhereUniqueInput | compraWhereUniqueInput[]
  }

  export type compraUncheckedCreateNestedManyWithoutProveedorInput = {
    create?: XOR<compraCreateWithoutProveedorInput, compraUncheckedCreateWithoutProveedorInput> | compraCreateWithoutProveedorInput[] | compraUncheckedCreateWithoutProveedorInput[]
    connectOrCreate?: compraCreateOrConnectWithoutProveedorInput | compraCreateOrConnectWithoutProveedorInput[]
    createMany?: compraCreateManyProveedorInputEnvelope
    connect?: compraWhereUniqueInput | compraWhereUniqueInput[]
  }

  export type compraUpdateManyWithoutProveedorNestedInput = {
    create?: XOR<compraCreateWithoutProveedorInput, compraUncheckedCreateWithoutProveedorInput> | compraCreateWithoutProveedorInput[] | compraUncheckedCreateWithoutProveedorInput[]
    connectOrCreate?: compraCreateOrConnectWithoutProveedorInput | compraCreateOrConnectWithoutProveedorInput[]
    upsert?: compraUpsertWithWhereUniqueWithoutProveedorInput | compraUpsertWithWhereUniqueWithoutProveedorInput[]
    createMany?: compraCreateManyProveedorInputEnvelope
    set?: compraWhereUniqueInput | compraWhereUniqueInput[]
    disconnect?: compraWhereUniqueInput | compraWhereUniqueInput[]
    delete?: compraWhereUniqueInput | compraWhereUniqueInput[]
    connect?: compraWhereUniqueInput | compraWhereUniqueInput[]
    update?: compraUpdateWithWhereUniqueWithoutProveedorInput | compraUpdateWithWhereUniqueWithoutProveedorInput[]
    updateMany?: compraUpdateManyWithWhereWithoutProveedorInput | compraUpdateManyWithWhereWithoutProveedorInput[]
    deleteMany?: compraScalarWhereInput | compraScalarWhereInput[]
  }

  export type compraUncheckedUpdateManyWithoutProveedorNestedInput = {
    create?: XOR<compraCreateWithoutProveedorInput, compraUncheckedCreateWithoutProveedorInput> | compraCreateWithoutProveedorInput[] | compraUncheckedCreateWithoutProveedorInput[]
    connectOrCreate?: compraCreateOrConnectWithoutProveedorInput | compraCreateOrConnectWithoutProveedorInput[]
    upsert?: compraUpsertWithWhereUniqueWithoutProveedorInput | compraUpsertWithWhereUniqueWithoutProveedorInput[]
    createMany?: compraCreateManyProveedorInputEnvelope
    set?: compraWhereUniqueInput | compraWhereUniqueInput[]
    disconnect?: compraWhereUniqueInput | compraWhereUniqueInput[]
    delete?: compraWhereUniqueInput | compraWhereUniqueInput[]
    connect?: compraWhereUniqueInput | compraWhereUniqueInput[]
    update?: compraUpdateWithWhereUniqueWithoutProveedorInput | compraUpdateWithWhereUniqueWithoutProveedorInput[]
    updateMany?: compraUpdateManyWithWhereWithoutProveedorInput | compraUpdateManyWithWhereWithoutProveedorInput[]
    deleteMany?: compraScalarWhereInput | compraScalarWhereInput[]
  }

  export type almacenCreateNestedManyWithoutTiendaInput = {
    create?: XOR<almacenCreateWithoutTiendaInput, almacenUncheckedCreateWithoutTiendaInput> | almacenCreateWithoutTiendaInput[] | almacenUncheckedCreateWithoutTiendaInput[]
    connectOrCreate?: almacenCreateOrConnectWithoutTiendaInput | almacenCreateOrConnectWithoutTiendaInput[]
    createMany?: almacenCreateManyTiendaInputEnvelope
    connect?: almacenWhereUniqueInput | almacenWhereUniqueInput[]
  }

  export type usuariosCreateNestedManyWithoutTiendaInput = {
    create?: XOR<usuariosCreateWithoutTiendaInput, usuariosUncheckedCreateWithoutTiendaInput> | usuariosCreateWithoutTiendaInput[] | usuariosUncheckedCreateWithoutTiendaInput[]
    connectOrCreate?: usuariosCreateOrConnectWithoutTiendaInput | usuariosCreateOrConnectWithoutTiendaInput[]
    createMany?: usuariosCreateManyTiendaInputEnvelope
    connect?: usuariosWhereUniqueInput | usuariosWhereUniqueInput[]
  }

  export type almacenUncheckedCreateNestedManyWithoutTiendaInput = {
    create?: XOR<almacenCreateWithoutTiendaInput, almacenUncheckedCreateWithoutTiendaInput> | almacenCreateWithoutTiendaInput[] | almacenUncheckedCreateWithoutTiendaInput[]
    connectOrCreate?: almacenCreateOrConnectWithoutTiendaInput | almacenCreateOrConnectWithoutTiendaInput[]
    createMany?: almacenCreateManyTiendaInputEnvelope
    connect?: almacenWhereUniqueInput | almacenWhereUniqueInput[]
  }

  export type usuariosUncheckedCreateNestedManyWithoutTiendaInput = {
    create?: XOR<usuariosCreateWithoutTiendaInput, usuariosUncheckedCreateWithoutTiendaInput> | usuariosCreateWithoutTiendaInput[] | usuariosUncheckedCreateWithoutTiendaInput[]
    connectOrCreate?: usuariosCreateOrConnectWithoutTiendaInput | usuariosCreateOrConnectWithoutTiendaInput[]
    createMany?: usuariosCreateManyTiendaInputEnvelope
    connect?: usuariosWhereUniqueInput | usuariosWhereUniqueInput[]
  }

  export type almacenUpdateManyWithoutTiendaNestedInput = {
    create?: XOR<almacenCreateWithoutTiendaInput, almacenUncheckedCreateWithoutTiendaInput> | almacenCreateWithoutTiendaInput[] | almacenUncheckedCreateWithoutTiendaInput[]
    connectOrCreate?: almacenCreateOrConnectWithoutTiendaInput | almacenCreateOrConnectWithoutTiendaInput[]
    upsert?: almacenUpsertWithWhereUniqueWithoutTiendaInput | almacenUpsertWithWhereUniqueWithoutTiendaInput[]
    createMany?: almacenCreateManyTiendaInputEnvelope
    set?: almacenWhereUniqueInput | almacenWhereUniqueInput[]
    disconnect?: almacenWhereUniqueInput | almacenWhereUniqueInput[]
    delete?: almacenWhereUniqueInput | almacenWhereUniqueInput[]
    connect?: almacenWhereUniqueInput | almacenWhereUniqueInput[]
    update?: almacenUpdateWithWhereUniqueWithoutTiendaInput | almacenUpdateWithWhereUniqueWithoutTiendaInput[]
    updateMany?: almacenUpdateManyWithWhereWithoutTiendaInput | almacenUpdateManyWithWhereWithoutTiendaInput[]
    deleteMany?: almacenScalarWhereInput | almacenScalarWhereInput[]
  }

  export type usuariosUpdateManyWithoutTiendaNestedInput = {
    create?: XOR<usuariosCreateWithoutTiendaInput, usuariosUncheckedCreateWithoutTiendaInput> | usuariosCreateWithoutTiendaInput[] | usuariosUncheckedCreateWithoutTiendaInput[]
    connectOrCreate?: usuariosCreateOrConnectWithoutTiendaInput | usuariosCreateOrConnectWithoutTiendaInput[]
    upsert?: usuariosUpsertWithWhereUniqueWithoutTiendaInput | usuariosUpsertWithWhereUniqueWithoutTiendaInput[]
    createMany?: usuariosCreateManyTiendaInputEnvelope
    set?: usuariosWhereUniqueInput | usuariosWhereUniqueInput[]
    disconnect?: usuariosWhereUniqueInput | usuariosWhereUniqueInput[]
    delete?: usuariosWhereUniqueInput | usuariosWhereUniqueInput[]
    connect?: usuariosWhereUniqueInput | usuariosWhereUniqueInput[]
    update?: usuariosUpdateWithWhereUniqueWithoutTiendaInput | usuariosUpdateWithWhereUniqueWithoutTiendaInput[]
    updateMany?: usuariosUpdateManyWithWhereWithoutTiendaInput | usuariosUpdateManyWithWhereWithoutTiendaInput[]
    deleteMany?: usuariosScalarWhereInput | usuariosScalarWhereInput[]
  }

  export type almacenUncheckedUpdateManyWithoutTiendaNestedInput = {
    create?: XOR<almacenCreateWithoutTiendaInput, almacenUncheckedCreateWithoutTiendaInput> | almacenCreateWithoutTiendaInput[] | almacenUncheckedCreateWithoutTiendaInput[]
    connectOrCreate?: almacenCreateOrConnectWithoutTiendaInput | almacenCreateOrConnectWithoutTiendaInput[]
    upsert?: almacenUpsertWithWhereUniqueWithoutTiendaInput | almacenUpsertWithWhereUniqueWithoutTiendaInput[]
    createMany?: almacenCreateManyTiendaInputEnvelope
    set?: almacenWhereUniqueInput | almacenWhereUniqueInput[]
    disconnect?: almacenWhereUniqueInput | almacenWhereUniqueInput[]
    delete?: almacenWhereUniqueInput | almacenWhereUniqueInput[]
    connect?: almacenWhereUniqueInput | almacenWhereUniqueInput[]
    update?: almacenUpdateWithWhereUniqueWithoutTiendaInput | almacenUpdateWithWhereUniqueWithoutTiendaInput[]
    updateMany?: almacenUpdateManyWithWhereWithoutTiendaInput | almacenUpdateManyWithWhereWithoutTiendaInput[]
    deleteMany?: almacenScalarWhereInput | almacenScalarWhereInput[]
  }

  export type usuariosUncheckedUpdateManyWithoutTiendaNestedInput = {
    create?: XOR<usuariosCreateWithoutTiendaInput, usuariosUncheckedCreateWithoutTiendaInput> | usuariosCreateWithoutTiendaInput[] | usuariosUncheckedCreateWithoutTiendaInput[]
    connectOrCreate?: usuariosCreateOrConnectWithoutTiendaInput | usuariosCreateOrConnectWithoutTiendaInput[]
    upsert?: usuariosUpsertWithWhereUniqueWithoutTiendaInput | usuariosUpsertWithWhereUniqueWithoutTiendaInput[]
    createMany?: usuariosCreateManyTiendaInputEnvelope
    set?: usuariosWhereUniqueInput | usuariosWhereUniqueInput[]
    disconnect?: usuariosWhereUniqueInput | usuariosWhereUniqueInput[]
    delete?: usuariosWhereUniqueInput | usuariosWhereUniqueInput[]
    connect?: usuariosWhereUniqueInput | usuariosWhereUniqueInput[]
    update?: usuariosUpdateWithWhereUniqueWithoutTiendaInput | usuariosUpdateWithWhereUniqueWithoutTiendaInput[]
    updateMany?: usuariosUpdateManyWithWhereWithoutTiendaInput | usuariosUpdateManyWithWhereWithoutTiendaInput[]
    deleteMany?: usuariosScalarWhereInput | usuariosScalarWhereInput[]
  }

  export type tiendaCreateNestedOneWithoutUsuariosInput = {
    create?: XOR<tiendaCreateWithoutUsuariosInput, tiendaUncheckedCreateWithoutUsuariosInput>
    connectOrCreate?: tiendaCreateOrConnectWithoutUsuariosInput
    connect?: tiendaWhereUniqueInput
  }

  export type Enumusuarios_rolFieldUpdateOperationsInput = {
    set?: $Enums.usuarios_rol
  }

  export type tiendaUpdateOneWithoutUsuariosNestedInput = {
    create?: XOR<tiendaCreateWithoutUsuariosInput, tiendaUncheckedCreateWithoutUsuariosInput>
    connectOrCreate?: tiendaCreateOrConnectWithoutUsuariosInput
    upsert?: tiendaUpsertWithoutUsuariosInput
    disconnect?: tiendaWhereInput | boolean
    delete?: tiendaWhereInput | boolean
    connect?: tiendaWhereUniqueInput
    update?: XOR<XOR<tiendaUpdateToOneWithWhereWithoutUsuariosInput, tiendaUpdateWithoutUsuariosInput>, tiendaUncheckedUpdateWithoutUsuariosInput>
  }

  export type detallesventaCreateNestedManyWithoutVentaInput = {
    create?: XOR<detallesventaCreateWithoutVentaInput, detallesventaUncheckedCreateWithoutVentaInput> | detallesventaCreateWithoutVentaInput[] | detallesventaUncheckedCreateWithoutVentaInput[]
    connectOrCreate?: detallesventaCreateOrConnectWithoutVentaInput | detallesventaCreateOrConnectWithoutVentaInput[]
    createMany?: detallesventaCreateManyVentaInputEnvelope
    connect?: detallesventaWhereUniqueInput | detallesventaWhereUniqueInput[]
  }

  export type detallesventaUncheckedCreateNestedManyWithoutVentaInput = {
    create?: XOR<detallesventaCreateWithoutVentaInput, detallesventaUncheckedCreateWithoutVentaInput> | detallesventaCreateWithoutVentaInput[] | detallesventaUncheckedCreateWithoutVentaInput[]
    connectOrCreate?: detallesventaCreateOrConnectWithoutVentaInput | detallesventaCreateOrConnectWithoutVentaInput[]
    createMany?: detallesventaCreateManyVentaInputEnvelope
    connect?: detallesventaWhereUniqueInput | detallesventaWhereUniqueInput[]
  }

  export type detallesventaUpdateManyWithoutVentaNestedInput = {
    create?: XOR<detallesventaCreateWithoutVentaInput, detallesventaUncheckedCreateWithoutVentaInput> | detallesventaCreateWithoutVentaInput[] | detallesventaUncheckedCreateWithoutVentaInput[]
    connectOrCreate?: detallesventaCreateOrConnectWithoutVentaInput | detallesventaCreateOrConnectWithoutVentaInput[]
    upsert?: detallesventaUpsertWithWhereUniqueWithoutVentaInput | detallesventaUpsertWithWhereUniqueWithoutVentaInput[]
    createMany?: detallesventaCreateManyVentaInputEnvelope
    set?: detallesventaWhereUniqueInput | detallesventaWhereUniqueInput[]
    disconnect?: detallesventaWhereUniqueInput | detallesventaWhereUniqueInput[]
    delete?: detallesventaWhereUniqueInput | detallesventaWhereUniqueInput[]
    connect?: detallesventaWhereUniqueInput | detallesventaWhereUniqueInput[]
    update?: detallesventaUpdateWithWhereUniqueWithoutVentaInput | detallesventaUpdateWithWhereUniqueWithoutVentaInput[]
    updateMany?: detallesventaUpdateManyWithWhereWithoutVentaInput | detallesventaUpdateManyWithWhereWithoutVentaInput[]
    deleteMany?: detallesventaScalarWhereInput | detallesventaScalarWhereInput[]
  }

  export type detallesventaUncheckedUpdateManyWithoutVentaNestedInput = {
    create?: XOR<detallesventaCreateWithoutVentaInput, detallesventaUncheckedCreateWithoutVentaInput> | detallesventaCreateWithoutVentaInput[] | detallesventaUncheckedCreateWithoutVentaInput[]
    connectOrCreate?: detallesventaCreateOrConnectWithoutVentaInput | detallesventaCreateOrConnectWithoutVentaInput[]
    upsert?: detallesventaUpsertWithWhereUniqueWithoutVentaInput | detallesventaUpsertWithWhereUniqueWithoutVentaInput[]
    createMany?: detallesventaCreateManyVentaInputEnvelope
    set?: detallesventaWhereUniqueInput | detallesventaWhereUniqueInput[]
    disconnect?: detallesventaWhereUniqueInput | detallesventaWhereUniqueInput[]
    delete?: detallesventaWhereUniqueInput | detallesventaWhereUniqueInput[]
    connect?: detallesventaWhereUniqueInput | detallesventaWhereUniqueInput[]
    update?: detallesventaUpdateWithWhereUniqueWithoutVentaInput | detallesventaUpdateWithWhereUniqueWithoutVentaInput[]
    updateMany?: detallesventaUpdateManyWithWhereWithoutVentaInput | detallesventaUpdateManyWithWhereWithoutVentaInput[]
    deleteMany?: detallesventaScalarWhereInput | detallesventaScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumusuarios_rolFilter<$PrismaModel = never> = {
    equals?: $Enums.usuarios_rol | Enumusuarios_rolFieldRefInput<$PrismaModel>
    in?: $Enums.usuarios_rol[]
    notIn?: $Enums.usuarios_rol[]
    not?: NestedEnumusuarios_rolFilter<$PrismaModel> | $Enums.usuarios_rol
  }

  export type NestedEnumusuarios_rolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.usuarios_rol | Enumusuarios_rolFieldRefInput<$PrismaModel>
    in?: $Enums.usuarios_rol[]
    notIn?: $Enums.usuarios_rol[]
    not?: NestedEnumusuarios_rolWithAggregatesFilter<$PrismaModel> | $Enums.usuarios_rol
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumusuarios_rolFilter<$PrismaModel>
    _max?: NestedEnumusuarios_rolFilter<$PrismaModel>
  }

  export type tiendaCreateWithoutAlmacenInput = {
    Id?: string
    nombre?: string | null
    ubicacion?: string | null
    telefono?: string | null
    usuarios?: usuariosCreateNestedManyWithoutTiendaInput
  }

  export type tiendaUncheckedCreateWithoutAlmacenInput = {
    Id?: string
    nombre?: string | null
    ubicacion?: string | null
    telefono?: string | null
    usuarios?: usuariosUncheckedCreateNestedManyWithoutTiendaInput
  }

  export type tiendaCreateOrConnectWithoutAlmacenInput = {
    where: tiendaWhereUniqueInput
    create: XOR<tiendaCreateWithoutAlmacenInput, tiendaUncheckedCreateWithoutAlmacenInput>
  }

  export type productoCreateWithoutAlmacenInput = {
    Id?: string
    nombre?: string | null
    descripcion?: string | null
    codigobarra?: string | null
    fotoUrl?: string | null
    precioventa?: Decimal | DecimalJsLike | number | string | null
    preciodeproveedor?: Decimal | DecimalJsLike | number | string | null
    preciokilo?: Decimal | DecimalJsLike | number | string | null
    unidaddemedida?: string | null
    esgranel?: boolean | null
    categoria?: categoriaCreateNestedManyWithoutProductoInput
    detallesventa?: detallesventaCreateNestedManyWithoutProductoInput
    productocompra?: productocompraCreateNestedManyWithoutProductoInput
  }

  export type productoUncheckedCreateWithoutAlmacenInput = {
    Id?: string
    nombre?: string | null
    descripcion?: string | null
    codigobarra?: string | null
    fotoUrl?: string | null
    precioventa?: Decimal | DecimalJsLike | number | string | null
    preciodeproveedor?: Decimal | DecimalJsLike | number | string | null
    preciokilo?: Decimal | DecimalJsLike | number | string | null
    unidaddemedida?: string | null
    esgranel?: boolean | null
    categoria?: categoriaUncheckedCreateNestedManyWithoutProductoInput
    detallesventa?: detallesventaUncheckedCreateNestedManyWithoutProductoInput
    productocompra?: productocompraUncheckedCreateNestedManyWithoutProductoInput
  }

  export type productoCreateOrConnectWithoutAlmacenInput = {
    where: productoWhereUniqueInput
    create: XOR<productoCreateWithoutAlmacenInput, productoUncheckedCreateWithoutAlmacenInput>
  }

  export type productoCreateManyAlmacenInputEnvelope = {
    data: productoCreateManyAlmacenInput | productoCreateManyAlmacenInput[]
    skipDuplicates?: boolean
  }

  export type tiendaUpsertWithoutAlmacenInput = {
    update: XOR<tiendaUpdateWithoutAlmacenInput, tiendaUncheckedUpdateWithoutAlmacenInput>
    create: XOR<tiendaCreateWithoutAlmacenInput, tiendaUncheckedCreateWithoutAlmacenInput>
    where?: tiendaWhereInput
  }

  export type tiendaUpdateToOneWithWhereWithoutAlmacenInput = {
    where?: tiendaWhereInput
    data: XOR<tiendaUpdateWithoutAlmacenInput, tiendaUncheckedUpdateWithoutAlmacenInput>
  }

  export type tiendaUpdateWithoutAlmacenInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    ubicacion?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    usuarios?: usuariosUpdateManyWithoutTiendaNestedInput
  }

  export type tiendaUncheckedUpdateWithoutAlmacenInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    ubicacion?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    usuarios?: usuariosUncheckedUpdateManyWithoutTiendaNestedInput
  }

  export type productoUpsertWithWhereUniqueWithoutAlmacenInput = {
    where: productoWhereUniqueInput
    update: XOR<productoUpdateWithoutAlmacenInput, productoUncheckedUpdateWithoutAlmacenInput>
    create: XOR<productoCreateWithoutAlmacenInput, productoUncheckedCreateWithoutAlmacenInput>
  }

  export type productoUpdateWithWhereUniqueWithoutAlmacenInput = {
    where: productoWhereUniqueInput
    data: XOR<productoUpdateWithoutAlmacenInput, productoUncheckedUpdateWithoutAlmacenInput>
  }

  export type productoUpdateManyWithWhereWithoutAlmacenInput = {
    where: productoScalarWhereInput
    data: XOR<productoUpdateManyMutationInput, productoUncheckedUpdateManyWithoutAlmacenInput>
  }

  export type productoScalarWhereInput = {
    AND?: productoScalarWhereInput | productoScalarWhereInput[]
    OR?: productoScalarWhereInput[]
    NOT?: productoScalarWhereInput | productoScalarWhereInput[]
    Id?: StringFilter<"producto"> | string
    nombre?: StringNullableFilter<"producto"> | string | null
    descripcion?: StringNullableFilter<"producto"> | string | null
    codigobarra?: StringNullableFilter<"producto"> | string | null
    fotoUrl?: StringNullableFilter<"producto"> | string | null
    precioventa?: DecimalNullableFilter<"producto"> | Decimal | DecimalJsLike | number | string | null
    preciodeproveedor?: DecimalNullableFilter<"producto"> | Decimal | DecimalJsLike | number | string | null
    preciokilo?: DecimalNullableFilter<"producto"> | Decimal | DecimalJsLike | number | string | null
    unidaddemedida?: StringNullableFilter<"producto"> | string | null
    esgranel?: BoolNullableFilter<"producto"> | boolean | null
    Id_almacen?: StringNullableFilter<"producto"> | string | null
  }

  export type productoCreateWithoutCategoriaInput = {
    Id?: string
    nombre?: string | null
    descripcion?: string | null
    codigobarra?: string | null
    fotoUrl?: string | null
    precioventa?: Decimal | DecimalJsLike | number | string | null
    preciodeproveedor?: Decimal | DecimalJsLike | number | string | null
    preciokilo?: Decimal | DecimalJsLike | number | string | null
    unidaddemedida?: string | null
    esgranel?: boolean | null
    detallesventa?: detallesventaCreateNestedManyWithoutProductoInput
    almacen?: almacenCreateNestedOneWithoutProductoInput
    productocompra?: productocompraCreateNestedManyWithoutProductoInput
  }

  export type productoUncheckedCreateWithoutCategoriaInput = {
    Id?: string
    nombre?: string | null
    descripcion?: string | null
    codigobarra?: string | null
    fotoUrl?: string | null
    precioventa?: Decimal | DecimalJsLike | number | string | null
    preciodeproveedor?: Decimal | DecimalJsLike | number | string | null
    preciokilo?: Decimal | DecimalJsLike | number | string | null
    unidaddemedida?: string | null
    esgranel?: boolean | null
    Id_almacen?: string | null
    detallesventa?: detallesventaUncheckedCreateNestedManyWithoutProductoInput
    productocompra?: productocompraUncheckedCreateNestedManyWithoutProductoInput
  }

  export type productoCreateOrConnectWithoutCategoriaInput = {
    where: productoWhereUniqueInput
    create: XOR<productoCreateWithoutCategoriaInput, productoUncheckedCreateWithoutCategoriaInput>
  }

  export type productoUpsertWithoutCategoriaInput = {
    update: XOR<productoUpdateWithoutCategoriaInput, productoUncheckedUpdateWithoutCategoriaInput>
    create: XOR<productoCreateWithoutCategoriaInput, productoUncheckedCreateWithoutCategoriaInput>
    where?: productoWhereInput
  }

  export type productoUpdateToOneWithWhereWithoutCategoriaInput = {
    where?: productoWhereInput
    data: XOR<productoUpdateWithoutCategoriaInput, productoUncheckedUpdateWithoutCategoriaInput>
  }

  export type productoUpdateWithoutCategoriaInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    codigobarra?: NullableStringFieldUpdateOperationsInput | string | null
    fotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    precioventa?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    preciodeproveedor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    preciokilo?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    unidaddemedida?: NullableStringFieldUpdateOperationsInput | string | null
    esgranel?: NullableBoolFieldUpdateOperationsInput | boolean | null
    detallesventa?: detallesventaUpdateManyWithoutProductoNestedInput
    almacen?: almacenUpdateOneWithoutProductoNestedInput
    productocompra?: productocompraUpdateManyWithoutProductoNestedInput
  }

  export type productoUncheckedUpdateWithoutCategoriaInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    codigobarra?: NullableStringFieldUpdateOperationsInput | string | null
    fotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    precioventa?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    preciodeproveedor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    preciokilo?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    unidaddemedida?: NullableStringFieldUpdateOperationsInput | string | null
    esgranel?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Id_almacen?: NullableStringFieldUpdateOperationsInput | string | null
    detallesventa?: detallesventaUncheckedUpdateManyWithoutProductoNestedInput
    productocompra?: productocompraUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type proveedorCreateWithoutCompraInput = {
    Id?: string
    nombre?: string | null
    telefono?: string | null
    empresa?: string | null
  }

  export type proveedorUncheckedCreateWithoutCompraInput = {
    Id?: string
    nombre?: string | null
    telefono?: string | null
    empresa?: string | null
  }

  export type proveedorCreateOrConnectWithoutCompraInput = {
    where: proveedorWhereUniqueInput
    create: XOR<proveedorCreateWithoutCompraInput, proveedorUncheckedCreateWithoutCompraInput>
  }

  export type productocompraCreateWithoutCompraInput = {
    Id?: string
    cantidad?: number | null
    producto?: productoCreateNestedOneWithoutProductocompraInput
  }

  export type productocompraUncheckedCreateWithoutCompraInput = {
    Id?: string
    cantidad?: number | null
    Id_producto?: string | null
  }

  export type productocompraCreateOrConnectWithoutCompraInput = {
    where: productocompraWhereUniqueInput
    create: XOR<productocompraCreateWithoutCompraInput, productocompraUncheckedCreateWithoutCompraInput>
  }

  export type productocompraCreateManyCompraInputEnvelope = {
    data: productocompraCreateManyCompraInput | productocompraCreateManyCompraInput[]
    skipDuplicates?: boolean
  }

  export type proveedorUpsertWithoutCompraInput = {
    update: XOR<proveedorUpdateWithoutCompraInput, proveedorUncheckedUpdateWithoutCompraInput>
    create: XOR<proveedorCreateWithoutCompraInput, proveedorUncheckedCreateWithoutCompraInput>
    where?: proveedorWhereInput
  }

  export type proveedorUpdateToOneWithWhereWithoutCompraInput = {
    where?: proveedorWhereInput
    data: XOR<proveedorUpdateWithoutCompraInput, proveedorUncheckedUpdateWithoutCompraInput>
  }

  export type proveedorUpdateWithoutCompraInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    empresa?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type proveedorUncheckedUpdateWithoutCompraInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    empresa?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type productocompraUpsertWithWhereUniqueWithoutCompraInput = {
    where: productocompraWhereUniqueInput
    update: XOR<productocompraUpdateWithoutCompraInput, productocompraUncheckedUpdateWithoutCompraInput>
    create: XOR<productocompraCreateWithoutCompraInput, productocompraUncheckedCreateWithoutCompraInput>
  }

  export type productocompraUpdateWithWhereUniqueWithoutCompraInput = {
    where: productocompraWhereUniqueInput
    data: XOR<productocompraUpdateWithoutCompraInput, productocompraUncheckedUpdateWithoutCompraInput>
  }

  export type productocompraUpdateManyWithWhereWithoutCompraInput = {
    where: productocompraScalarWhereInput
    data: XOR<productocompraUpdateManyMutationInput, productocompraUncheckedUpdateManyWithoutCompraInput>
  }

  export type productocompraScalarWhereInput = {
    AND?: productocompraScalarWhereInput | productocompraScalarWhereInput[]
    OR?: productocompraScalarWhereInput[]
    NOT?: productocompraScalarWhereInput | productocompraScalarWhereInput[]
    Id?: StringFilter<"productocompra"> | string
    cantidad?: IntNullableFilter<"productocompra"> | number | null
    Id_producto?: StringNullableFilter<"productocompra"> | string | null
    Id_compra?: StringNullableFilter<"productocompra"> | string | null
  }

  export type ventaCreateWithoutDetallesventaInput = {
    Id?: string
    totaldeganancias?: Decimal | DecimalJsLike | number | string | null
    fechaDeVenta?: Date | string | null
  }

  export type ventaUncheckedCreateWithoutDetallesventaInput = {
    Id?: string
    totaldeganancias?: Decimal | DecimalJsLike | number | string | null
    fechaDeVenta?: Date | string | null
  }

  export type ventaCreateOrConnectWithoutDetallesventaInput = {
    where: ventaWhereUniqueInput
    create: XOR<ventaCreateWithoutDetallesventaInput, ventaUncheckedCreateWithoutDetallesventaInput>
  }

  export type productoCreateWithoutDetallesventaInput = {
    Id?: string
    nombre?: string | null
    descripcion?: string | null
    codigobarra?: string | null
    fotoUrl?: string | null
    precioventa?: Decimal | DecimalJsLike | number | string | null
    preciodeproveedor?: Decimal | DecimalJsLike | number | string | null
    preciokilo?: Decimal | DecimalJsLike | number | string | null
    unidaddemedida?: string | null
    esgranel?: boolean | null
    categoria?: categoriaCreateNestedManyWithoutProductoInput
    almacen?: almacenCreateNestedOneWithoutProductoInput
    productocompra?: productocompraCreateNestedManyWithoutProductoInput
  }

  export type productoUncheckedCreateWithoutDetallesventaInput = {
    Id?: string
    nombre?: string | null
    descripcion?: string | null
    codigobarra?: string | null
    fotoUrl?: string | null
    precioventa?: Decimal | DecimalJsLike | number | string | null
    preciodeproveedor?: Decimal | DecimalJsLike | number | string | null
    preciokilo?: Decimal | DecimalJsLike | number | string | null
    unidaddemedida?: string | null
    esgranel?: boolean | null
    Id_almacen?: string | null
    categoria?: categoriaUncheckedCreateNestedManyWithoutProductoInput
    productocompra?: productocompraUncheckedCreateNestedManyWithoutProductoInput
  }

  export type productoCreateOrConnectWithoutDetallesventaInput = {
    where: productoWhereUniqueInput
    create: XOR<productoCreateWithoutDetallesventaInput, productoUncheckedCreateWithoutDetallesventaInput>
  }

  export type ventaUpsertWithoutDetallesventaInput = {
    update: XOR<ventaUpdateWithoutDetallesventaInput, ventaUncheckedUpdateWithoutDetallesventaInput>
    create: XOR<ventaCreateWithoutDetallesventaInput, ventaUncheckedCreateWithoutDetallesventaInput>
    where?: ventaWhereInput
  }

  export type ventaUpdateToOneWithWhereWithoutDetallesventaInput = {
    where?: ventaWhereInput
    data: XOR<ventaUpdateWithoutDetallesventaInput, ventaUncheckedUpdateWithoutDetallesventaInput>
  }

  export type ventaUpdateWithoutDetallesventaInput = {
    Id?: StringFieldUpdateOperationsInput | string
    totaldeganancias?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fechaDeVenta?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ventaUncheckedUpdateWithoutDetallesventaInput = {
    Id?: StringFieldUpdateOperationsInput | string
    totaldeganancias?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    fechaDeVenta?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type productoUpsertWithoutDetallesventaInput = {
    update: XOR<productoUpdateWithoutDetallesventaInput, productoUncheckedUpdateWithoutDetallesventaInput>
    create: XOR<productoCreateWithoutDetallesventaInput, productoUncheckedCreateWithoutDetallesventaInput>
    where?: productoWhereInput
  }

  export type productoUpdateToOneWithWhereWithoutDetallesventaInput = {
    where?: productoWhereInput
    data: XOR<productoUpdateWithoutDetallesventaInput, productoUncheckedUpdateWithoutDetallesventaInput>
  }

  export type productoUpdateWithoutDetallesventaInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    codigobarra?: NullableStringFieldUpdateOperationsInput | string | null
    fotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    precioventa?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    preciodeproveedor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    preciokilo?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    unidaddemedida?: NullableStringFieldUpdateOperationsInput | string | null
    esgranel?: NullableBoolFieldUpdateOperationsInput | boolean | null
    categoria?: categoriaUpdateManyWithoutProductoNestedInput
    almacen?: almacenUpdateOneWithoutProductoNestedInput
    productocompra?: productocompraUpdateManyWithoutProductoNestedInput
  }

  export type productoUncheckedUpdateWithoutDetallesventaInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    codigobarra?: NullableStringFieldUpdateOperationsInput | string | null
    fotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    precioventa?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    preciodeproveedor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    preciokilo?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    unidaddemedida?: NullableStringFieldUpdateOperationsInput | string | null
    esgranel?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Id_almacen?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: categoriaUncheckedUpdateManyWithoutProductoNestedInput
    productocompra?: productocompraUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type categoriaCreateWithoutProductoInput = {
    Id?: string
    nombre?: string | null
    descripcion?: string | null
  }

  export type categoriaUncheckedCreateWithoutProductoInput = {
    Id?: string
    nombre?: string | null
    descripcion?: string | null
  }

  export type categoriaCreateOrConnectWithoutProductoInput = {
    where: categoriaWhereUniqueInput
    create: XOR<categoriaCreateWithoutProductoInput, categoriaUncheckedCreateWithoutProductoInput>
  }

  export type categoriaCreateManyProductoInputEnvelope = {
    data: categoriaCreateManyProductoInput | categoriaCreateManyProductoInput[]
    skipDuplicates?: boolean
  }

  export type detallesventaCreateWithoutProductoInput = {
    Id?: string
    cantidad_recibida?: Decimal | DecimalJsLike | number | string | null
    devuelto?: Decimal | DecimalJsLike | number | string | null
    venta?: ventaCreateNestedOneWithoutDetallesventaInput
  }

  export type detallesventaUncheckedCreateWithoutProductoInput = {
    Id?: string
    cantidad_recibida?: Decimal | DecimalJsLike | number | string | null
    devuelto?: Decimal | DecimalJsLike | number | string | null
    Id_venta?: string | null
  }

  export type detallesventaCreateOrConnectWithoutProductoInput = {
    where: detallesventaWhereUniqueInput
    create: XOR<detallesventaCreateWithoutProductoInput, detallesventaUncheckedCreateWithoutProductoInput>
  }

  export type detallesventaCreateManyProductoInputEnvelope = {
    data: detallesventaCreateManyProductoInput | detallesventaCreateManyProductoInput[]
    skipDuplicates?: boolean
  }

  export type almacenCreateWithoutProductoInput = {
    Id?: string
    nombre?: string | null
    tienda?: tiendaCreateNestedOneWithoutAlmacenInput
  }

  export type almacenUncheckedCreateWithoutProductoInput = {
    Id?: string
    nombre?: string | null
    Id_tienda?: string | null
  }

  export type almacenCreateOrConnectWithoutProductoInput = {
    where: almacenWhereUniqueInput
    create: XOR<almacenCreateWithoutProductoInput, almacenUncheckedCreateWithoutProductoInput>
  }

  export type productocompraCreateWithoutProductoInput = {
    Id?: string
    cantidad?: number | null
    compra?: compraCreateNestedOneWithoutProductocompraInput
  }

  export type productocompraUncheckedCreateWithoutProductoInput = {
    Id?: string
    cantidad?: number | null
    Id_compra?: string | null
  }

  export type productocompraCreateOrConnectWithoutProductoInput = {
    where: productocompraWhereUniqueInput
    create: XOR<productocompraCreateWithoutProductoInput, productocompraUncheckedCreateWithoutProductoInput>
  }

  export type productocompraCreateManyProductoInputEnvelope = {
    data: productocompraCreateManyProductoInput | productocompraCreateManyProductoInput[]
    skipDuplicates?: boolean
  }

  export type categoriaUpsertWithWhereUniqueWithoutProductoInput = {
    where: categoriaWhereUniqueInput
    update: XOR<categoriaUpdateWithoutProductoInput, categoriaUncheckedUpdateWithoutProductoInput>
    create: XOR<categoriaCreateWithoutProductoInput, categoriaUncheckedCreateWithoutProductoInput>
  }

  export type categoriaUpdateWithWhereUniqueWithoutProductoInput = {
    where: categoriaWhereUniqueInput
    data: XOR<categoriaUpdateWithoutProductoInput, categoriaUncheckedUpdateWithoutProductoInput>
  }

  export type categoriaUpdateManyWithWhereWithoutProductoInput = {
    where: categoriaScalarWhereInput
    data: XOR<categoriaUpdateManyMutationInput, categoriaUncheckedUpdateManyWithoutProductoInput>
  }

  export type categoriaScalarWhereInput = {
    AND?: categoriaScalarWhereInput | categoriaScalarWhereInput[]
    OR?: categoriaScalarWhereInput[]
    NOT?: categoriaScalarWhereInput | categoriaScalarWhereInput[]
    Id?: StringFilter<"categoria"> | string
    nombre?: StringNullableFilter<"categoria"> | string | null
    descripcion?: StringNullableFilter<"categoria"> | string | null
    Id_producto?: StringNullableFilter<"categoria"> | string | null
  }

  export type detallesventaUpsertWithWhereUniqueWithoutProductoInput = {
    where: detallesventaWhereUniqueInput
    update: XOR<detallesventaUpdateWithoutProductoInput, detallesventaUncheckedUpdateWithoutProductoInput>
    create: XOR<detallesventaCreateWithoutProductoInput, detallesventaUncheckedCreateWithoutProductoInput>
  }

  export type detallesventaUpdateWithWhereUniqueWithoutProductoInput = {
    where: detallesventaWhereUniqueInput
    data: XOR<detallesventaUpdateWithoutProductoInput, detallesventaUncheckedUpdateWithoutProductoInput>
  }

  export type detallesventaUpdateManyWithWhereWithoutProductoInput = {
    where: detallesventaScalarWhereInput
    data: XOR<detallesventaUpdateManyMutationInput, detallesventaUncheckedUpdateManyWithoutProductoInput>
  }

  export type detallesventaScalarWhereInput = {
    AND?: detallesventaScalarWhereInput | detallesventaScalarWhereInput[]
    OR?: detallesventaScalarWhereInput[]
    NOT?: detallesventaScalarWhereInput | detallesventaScalarWhereInput[]
    Id?: StringFilter<"detallesventa"> | string
    cantidad_recibida?: DecimalNullableFilter<"detallesventa"> | Decimal | DecimalJsLike | number | string | null
    devuelto?: DecimalNullableFilter<"detallesventa"> | Decimal | DecimalJsLike | number | string | null
    Id_venta?: StringNullableFilter<"detallesventa"> | string | null
    Id_producto?: StringNullableFilter<"detallesventa"> | string | null
  }

  export type almacenUpsertWithoutProductoInput = {
    update: XOR<almacenUpdateWithoutProductoInput, almacenUncheckedUpdateWithoutProductoInput>
    create: XOR<almacenCreateWithoutProductoInput, almacenUncheckedCreateWithoutProductoInput>
    where?: almacenWhereInput
  }

  export type almacenUpdateToOneWithWhereWithoutProductoInput = {
    where?: almacenWhereInput
    data: XOR<almacenUpdateWithoutProductoInput, almacenUncheckedUpdateWithoutProductoInput>
  }

  export type almacenUpdateWithoutProductoInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    tienda?: tiendaUpdateOneWithoutAlmacenNestedInput
  }

  export type almacenUncheckedUpdateWithoutProductoInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    Id_tienda?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type productocompraUpsertWithWhereUniqueWithoutProductoInput = {
    where: productocompraWhereUniqueInput
    update: XOR<productocompraUpdateWithoutProductoInput, productocompraUncheckedUpdateWithoutProductoInput>
    create: XOR<productocompraCreateWithoutProductoInput, productocompraUncheckedCreateWithoutProductoInput>
  }

  export type productocompraUpdateWithWhereUniqueWithoutProductoInput = {
    where: productocompraWhereUniqueInput
    data: XOR<productocompraUpdateWithoutProductoInput, productocompraUncheckedUpdateWithoutProductoInput>
  }

  export type productocompraUpdateManyWithWhereWithoutProductoInput = {
    where: productocompraScalarWhereInput
    data: XOR<productocompraUpdateManyMutationInput, productocompraUncheckedUpdateManyWithoutProductoInput>
  }

  export type productoCreateWithoutProductocompraInput = {
    Id?: string
    nombre?: string | null
    descripcion?: string | null
    codigobarra?: string | null
    fotoUrl?: string | null
    precioventa?: Decimal | DecimalJsLike | number | string | null
    preciodeproveedor?: Decimal | DecimalJsLike | number | string | null
    preciokilo?: Decimal | DecimalJsLike | number | string | null
    unidaddemedida?: string | null
    esgranel?: boolean | null
    categoria?: categoriaCreateNestedManyWithoutProductoInput
    detallesventa?: detallesventaCreateNestedManyWithoutProductoInput
    almacen?: almacenCreateNestedOneWithoutProductoInput
  }

  export type productoUncheckedCreateWithoutProductocompraInput = {
    Id?: string
    nombre?: string | null
    descripcion?: string | null
    codigobarra?: string | null
    fotoUrl?: string | null
    precioventa?: Decimal | DecimalJsLike | number | string | null
    preciodeproveedor?: Decimal | DecimalJsLike | number | string | null
    preciokilo?: Decimal | DecimalJsLike | number | string | null
    unidaddemedida?: string | null
    esgranel?: boolean | null
    Id_almacen?: string | null
    categoria?: categoriaUncheckedCreateNestedManyWithoutProductoInput
    detallesventa?: detallesventaUncheckedCreateNestedManyWithoutProductoInput
  }

  export type productoCreateOrConnectWithoutProductocompraInput = {
    where: productoWhereUniqueInput
    create: XOR<productoCreateWithoutProductocompraInput, productoUncheckedCreateWithoutProductocompraInput>
  }

  export type compraCreateWithoutProductocompraInput = {
    Id?: string
    fecha?: Date | string | null
    total?: Decimal | DecimalJsLike | number | string | null
    sku?: string | null
    proveedor?: proveedorCreateNestedOneWithoutCompraInput
  }

  export type compraUncheckedCreateWithoutProductocompraInput = {
    Id?: string
    fecha?: Date | string | null
    total?: Decimal | DecimalJsLike | number | string | null
    sku?: string | null
    Id_proveedor?: string | null
  }

  export type compraCreateOrConnectWithoutProductocompraInput = {
    where: compraWhereUniqueInput
    create: XOR<compraCreateWithoutProductocompraInput, compraUncheckedCreateWithoutProductocompraInput>
  }

  export type productoUpsertWithoutProductocompraInput = {
    update: XOR<productoUpdateWithoutProductocompraInput, productoUncheckedUpdateWithoutProductocompraInput>
    create: XOR<productoCreateWithoutProductocompraInput, productoUncheckedCreateWithoutProductocompraInput>
    where?: productoWhereInput
  }

  export type productoUpdateToOneWithWhereWithoutProductocompraInput = {
    where?: productoWhereInput
    data: XOR<productoUpdateWithoutProductocompraInput, productoUncheckedUpdateWithoutProductocompraInput>
  }

  export type productoUpdateWithoutProductocompraInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    codigobarra?: NullableStringFieldUpdateOperationsInput | string | null
    fotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    precioventa?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    preciodeproveedor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    preciokilo?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    unidaddemedida?: NullableStringFieldUpdateOperationsInput | string | null
    esgranel?: NullableBoolFieldUpdateOperationsInput | boolean | null
    categoria?: categoriaUpdateManyWithoutProductoNestedInput
    detallesventa?: detallesventaUpdateManyWithoutProductoNestedInput
    almacen?: almacenUpdateOneWithoutProductoNestedInput
  }

  export type productoUncheckedUpdateWithoutProductocompraInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    codigobarra?: NullableStringFieldUpdateOperationsInput | string | null
    fotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    precioventa?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    preciodeproveedor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    preciokilo?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    unidaddemedida?: NullableStringFieldUpdateOperationsInput | string | null
    esgranel?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Id_almacen?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: categoriaUncheckedUpdateManyWithoutProductoNestedInput
    detallesventa?: detallesventaUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type compraUpsertWithoutProductocompraInput = {
    update: XOR<compraUpdateWithoutProductocompraInput, compraUncheckedUpdateWithoutProductocompraInput>
    create: XOR<compraCreateWithoutProductocompraInput, compraUncheckedCreateWithoutProductocompraInput>
    where?: compraWhereInput
  }

  export type compraUpdateToOneWithWhereWithoutProductocompraInput = {
    where?: compraWhereInput
    data: XOR<compraUpdateWithoutProductocompraInput, compraUncheckedUpdateWithoutProductocompraInput>
  }

  export type compraUpdateWithoutProductocompraInput = {
    Id?: StringFieldUpdateOperationsInput | string
    fecha?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    proveedor?: proveedorUpdateOneWithoutCompraNestedInput
  }

  export type compraUncheckedUpdateWithoutProductocompraInput = {
    Id?: StringFieldUpdateOperationsInput | string
    fecha?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    Id_proveedor?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type compraCreateWithoutProveedorInput = {
    Id?: string
    fecha?: Date | string | null
    total?: Decimal | DecimalJsLike | number | string | null
    sku?: string | null
    productocompra?: productocompraCreateNestedManyWithoutCompraInput
  }

  export type compraUncheckedCreateWithoutProveedorInput = {
    Id?: string
    fecha?: Date | string | null
    total?: Decimal | DecimalJsLike | number | string | null
    sku?: string | null
    productocompra?: productocompraUncheckedCreateNestedManyWithoutCompraInput
  }

  export type compraCreateOrConnectWithoutProveedorInput = {
    where: compraWhereUniqueInput
    create: XOR<compraCreateWithoutProveedorInput, compraUncheckedCreateWithoutProveedorInput>
  }

  export type compraCreateManyProveedorInputEnvelope = {
    data: compraCreateManyProveedorInput | compraCreateManyProveedorInput[]
    skipDuplicates?: boolean
  }

  export type compraUpsertWithWhereUniqueWithoutProveedorInput = {
    where: compraWhereUniqueInput
    update: XOR<compraUpdateWithoutProveedorInput, compraUncheckedUpdateWithoutProveedorInput>
    create: XOR<compraCreateWithoutProveedorInput, compraUncheckedCreateWithoutProveedorInput>
  }

  export type compraUpdateWithWhereUniqueWithoutProveedorInput = {
    where: compraWhereUniqueInput
    data: XOR<compraUpdateWithoutProveedorInput, compraUncheckedUpdateWithoutProveedorInput>
  }

  export type compraUpdateManyWithWhereWithoutProveedorInput = {
    where: compraScalarWhereInput
    data: XOR<compraUpdateManyMutationInput, compraUncheckedUpdateManyWithoutProveedorInput>
  }

  export type compraScalarWhereInput = {
    AND?: compraScalarWhereInput | compraScalarWhereInput[]
    OR?: compraScalarWhereInput[]
    NOT?: compraScalarWhereInput | compraScalarWhereInput[]
    Id?: StringFilter<"compra"> | string
    fecha?: DateTimeNullableFilter<"compra"> | Date | string | null
    total?: DecimalNullableFilter<"compra"> | Decimal | DecimalJsLike | number | string | null
    sku?: StringNullableFilter<"compra"> | string | null
    Id_proveedor?: StringNullableFilter<"compra"> | string | null
  }

  export type almacenCreateWithoutTiendaInput = {
    Id?: string
    nombre?: string | null
    producto?: productoCreateNestedManyWithoutAlmacenInput
  }

  export type almacenUncheckedCreateWithoutTiendaInput = {
    Id?: string
    nombre?: string | null
    producto?: productoUncheckedCreateNestedManyWithoutAlmacenInput
  }

  export type almacenCreateOrConnectWithoutTiendaInput = {
    where: almacenWhereUniqueInput
    create: XOR<almacenCreateWithoutTiendaInput, almacenUncheckedCreateWithoutTiendaInput>
  }

  export type almacenCreateManyTiendaInputEnvelope = {
    data: almacenCreateManyTiendaInput | almacenCreateManyTiendaInput[]
    skipDuplicates?: boolean
  }

  export type usuariosCreateWithoutTiendaInput = {
    Id?: string
    nombre?: string | null
    email: string
    contrasena: string
    fotoUrl?: string | null
    codigoVerificacion?: string | null
    codigoVerificacionExp?: Date | string | null
    activo?: boolean | null
    verificado?: boolean | null
    rol: $Enums.usuarios_rol
  }

  export type usuariosUncheckedCreateWithoutTiendaInput = {
    Id?: string
    nombre?: string | null
    email: string
    contrasena: string
    fotoUrl?: string | null
    codigoVerificacion?: string | null
    codigoVerificacionExp?: Date | string | null
    activo?: boolean | null
    verificado?: boolean | null
    rol: $Enums.usuarios_rol
  }

  export type usuariosCreateOrConnectWithoutTiendaInput = {
    where: usuariosWhereUniqueInput
    create: XOR<usuariosCreateWithoutTiendaInput, usuariosUncheckedCreateWithoutTiendaInput>
  }

  export type usuariosCreateManyTiendaInputEnvelope = {
    data: usuariosCreateManyTiendaInput | usuariosCreateManyTiendaInput[]
    skipDuplicates?: boolean
  }

  export type almacenUpsertWithWhereUniqueWithoutTiendaInput = {
    where: almacenWhereUniqueInput
    update: XOR<almacenUpdateWithoutTiendaInput, almacenUncheckedUpdateWithoutTiendaInput>
    create: XOR<almacenCreateWithoutTiendaInput, almacenUncheckedCreateWithoutTiendaInput>
  }

  export type almacenUpdateWithWhereUniqueWithoutTiendaInput = {
    where: almacenWhereUniqueInput
    data: XOR<almacenUpdateWithoutTiendaInput, almacenUncheckedUpdateWithoutTiendaInput>
  }

  export type almacenUpdateManyWithWhereWithoutTiendaInput = {
    where: almacenScalarWhereInput
    data: XOR<almacenUpdateManyMutationInput, almacenUncheckedUpdateManyWithoutTiendaInput>
  }

  export type almacenScalarWhereInput = {
    AND?: almacenScalarWhereInput | almacenScalarWhereInput[]
    OR?: almacenScalarWhereInput[]
    NOT?: almacenScalarWhereInput | almacenScalarWhereInput[]
    Id?: StringFilter<"almacen"> | string
    nombre?: StringNullableFilter<"almacen"> | string | null
    Id_tienda?: StringNullableFilter<"almacen"> | string | null
  }

  export type usuariosUpsertWithWhereUniqueWithoutTiendaInput = {
    where: usuariosWhereUniqueInput
    update: XOR<usuariosUpdateWithoutTiendaInput, usuariosUncheckedUpdateWithoutTiendaInput>
    create: XOR<usuariosCreateWithoutTiendaInput, usuariosUncheckedCreateWithoutTiendaInput>
  }

  export type usuariosUpdateWithWhereUniqueWithoutTiendaInput = {
    where: usuariosWhereUniqueInput
    data: XOR<usuariosUpdateWithoutTiendaInput, usuariosUncheckedUpdateWithoutTiendaInput>
  }

  export type usuariosUpdateManyWithWhereWithoutTiendaInput = {
    where: usuariosScalarWhereInput
    data: XOR<usuariosUpdateManyMutationInput, usuariosUncheckedUpdateManyWithoutTiendaInput>
  }

  export type usuariosScalarWhereInput = {
    AND?: usuariosScalarWhereInput | usuariosScalarWhereInput[]
    OR?: usuariosScalarWhereInput[]
    NOT?: usuariosScalarWhereInput | usuariosScalarWhereInput[]
    Id?: StringFilter<"usuarios"> | string
    nombre?: StringNullableFilter<"usuarios"> | string | null
    email?: StringFilter<"usuarios"> | string
    contrasena?: StringFilter<"usuarios"> | string
    fotoUrl?: StringNullableFilter<"usuarios"> | string | null
    codigoVerificacion?: StringNullableFilter<"usuarios"> | string | null
    codigoVerificacionExp?: DateTimeNullableFilter<"usuarios"> | Date | string | null
    activo?: BoolNullableFilter<"usuarios"> | boolean | null
    verificado?: BoolNullableFilter<"usuarios"> | boolean | null
    rol?: Enumusuarios_rolFilter<"usuarios"> | $Enums.usuarios_rol
    Id_tienda?: StringNullableFilter<"usuarios"> | string | null
  }

  export type tiendaCreateWithoutUsuariosInput = {
    Id?: string
    nombre?: string | null
    ubicacion?: string | null
    telefono?: string | null
    almacen?: almacenCreateNestedManyWithoutTiendaInput
  }

  export type tiendaUncheckedCreateWithoutUsuariosInput = {
    Id?: string
    nombre?: string | null
    ubicacion?: string | null
    telefono?: string | null
    almacen?: almacenUncheckedCreateNestedManyWithoutTiendaInput
  }

  export type tiendaCreateOrConnectWithoutUsuariosInput = {
    where: tiendaWhereUniqueInput
    create: XOR<tiendaCreateWithoutUsuariosInput, tiendaUncheckedCreateWithoutUsuariosInput>
  }

  export type tiendaUpsertWithoutUsuariosInput = {
    update: XOR<tiendaUpdateWithoutUsuariosInput, tiendaUncheckedUpdateWithoutUsuariosInput>
    create: XOR<tiendaCreateWithoutUsuariosInput, tiendaUncheckedCreateWithoutUsuariosInput>
    where?: tiendaWhereInput
  }

  export type tiendaUpdateToOneWithWhereWithoutUsuariosInput = {
    where?: tiendaWhereInput
    data: XOR<tiendaUpdateWithoutUsuariosInput, tiendaUncheckedUpdateWithoutUsuariosInput>
  }

  export type tiendaUpdateWithoutUsuariosInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    ubicacion?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    almacen?: almacenUpdateManyWithoutTiendaNestedInput
  }

  export type tiendaUncheckedUpdateWithoutUsuariosInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    ubicacion?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    almacen?: almacenUncheckedUpdateManyWithoutTiendaNestedInput
  }

  export type detallesventaCreateWithoutVentaInput = {
    Id?: string
    cantidad_recibida?: Decimal | DecimalJsLike | number | string | null
    devuelto?: Decimal | DecimalJsLike | number | string | null
    producto?: productoCreateNestedOneWithoutDetallesventaInput
  }

  export type detallesventaUncheckedCreateWithoutVentaInput = {
    Id?: string
    cantidad_recibida?: Decimal | DecimalJsLike | number | string | null
    devuelto?: Decimal | DecimalJsLike | number | string | null
    Id_producto?: string | null
  }

  export type detallesventaCreateOrConnectWithoutVentaInput = {
    where: detallesventaWhereUniqueInput
    create: XOR<detallesventaCreateWithoutVentaInput, detallesventaUncheckedCreateWithoutVentaInput>
  }

  export type detallesventaCreateManyVentaInputEnvelope = {
    data: detallesventaCreateManyVentaInput | detallesventaCreateManyVentaInput[]
    skipDuplicates?: boolean
  }

  export type detallesventaUpsertWithWhereUniqueWithoutVentaInput = {
    where: detallesventaWhereUniqueInput
    update: XOR<detallesventaUpdateWithoutVentaInput, detallesventaUncheckedUpdateWithoutVentaInput>
    create: XOR<detallesventaCreateWithoutVentaInput, detallesventaUncheckedCreateWithoutVentaInput>
  }

  export type detallesventaUpdateWithWhereUniqueWithoutVentaInput = {
    where: detallesventaWhereUniqueInput
    data: XOR<detallesventaUpdateWithoutVentaInput, detallesventaUncheckedUpdateWithoutVentaInput>
  }

  export type detallesventaUpdateManyWithWhereWithoutVentaInput = {
    where: detallesventaScalarWhereInput
    data: XOR<detallesventaUpdateManyMutationInput, detallesventaUncheckedUpdateManyWithoutVentaInput>
  }

  export type productoCreateManyAlmacenInput = {
    Id?: string
    nombre?: string | null
    descripcion?: string | null
    codigobarra?: string | null
    fotoUrl?: string | null
    precioventa?: Decimal | DecimalJsLike | number | string | null
    preciodeproveedor?: Decimal | DecimalJsLike | number | string | null
    preciokilo?: Decimal | DecimalJsLike | number | string | null
    unidaddemedida?: string | null
    esgranel?: boolean | null
  }

  export type productoUpdateWithoutAlmacenInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    codigobarra?: NullableStringFieldUpdateOperationsInput | string | null
    fotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    precioventa?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    preciodeproveedor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    preciokilo?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    unidaddemedida?: NullableStringFieldUpdateOperationsInput | string | null
    esgranel?: NullableBoolFieldUpdateOperationsInput | boolean | null
    categoria?: categoriaUpdateManyWithoutProductoNestedInput
    detallesventa?: detallesventaUpdateManyWithoutProductoNestedInput
    productocompra?: productocompraUpdateManyWithoutProductoNestedInput
  }

  export type productoUncheckedUpdateWithoutAlmacenInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    codigobarra?: NullableStringFieldUpdateOperationsInput | string | null
    fotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    precioventa?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    preciodeproveedor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    preciokilo?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    unidaddemedida?: NullableStringFieldUpdateOperationsInput | string | null
    esgranel?: NullableBoolFieldUpdateOperationsInput | boolean | null
    categoria?: categoriaUncheckedUpdateManyWithoutProductoNestedInput
    detallesventa?: detallesventaUncheckedUpdateManyWithoutProductoNestedInput
    productocompra?: productocompraUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type productoUncheckedUpdateManyWithoutAlmacenInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    codigobarra?: NullableStringFieldUpdateOperationsInput | string | null
    fotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    precioventa?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    preciodeproveedor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    preciokilo?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    unidaddemedida?: NullableStringFieldUpdateOperationsInput | string | null
    esgranel?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type productocompraCreateManyCompraInput = {
    Id?: string
    cantidad?: number | null
    Id_producto?: string | null
  }

  export type productocompraUpdateWithoutCompraInput = {
    Id?: StringFieldUpdateOperationsInput | string
    cantidad?: NullableIntFieldUpdateOperationsInput | number | null
    producto?: productoUpdateOneWithoutProductocompraNestedInput
  }

  export type productocompraUncheckedUpdateWithoutCompraInput = {
    Id?: StringFieldUpdateOperationsInput | string
    cantidad?: NullableIntFieldUpdateOperationsInput | number | null
    Id_producto?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type productocompraUncheckedUpdateManyWithoutCompraInput = {
    Id?: StringFieldUpdateOperationsInput | string
    cantidad?: NullableIntFieldUpdateOperationsInput | number | null
    Id_producto?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type categoriaCreateManyProductoInput = {
    Id?: string
    nombre?: string | null
    descripcion?: string | null
  }

  export type detallesventaCreateManyProductoInput = {
    Id?: string
    cantidad_recibida?: Decimal | DecimalJsLike | number | string | null
    devuelto?: Decimal | DecimalJsLike | number | string | null
    Id_venta?: string | null
  }

  export type productocompraCreateManyProductoInput = {
    Id?: string
    cantidad?: number | null
    Id_compra?: string | null
  }

  export type categoriaUpdateWithoutProductoInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type categoriaUncheckedUpdateWithoutProductoInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type categoriaUncheckedUpdateManyWithoutProductoInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type detallesventaUpdateWithoutProductoInput = {
    Id?: StringFieldUpdateOperationsInput | string
    cantidad_recibida?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    devuelto?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    venta?: ventaUpdateOneWithoutDetallesventaNestedInput
  }

  export type detallesventaUncheckedUpdateWithoutProductoInput = {
    Id?: StringFieldUpdateOperationsInput | string
    cantidad_recibida?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    devuelto?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    Id_venta?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type detallesventaUncheckedUpdateManyWithoutProductoInput = {
    Id?: StringFieldUpdateOperationsInput | string
    cantidad_recibida?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    devuelto?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    Id_venta?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type productocompraUpdateWithoutProductoInput = {
    Id?: StringFieldUpdateOperationsInput | string
    cantidad?: NullableIntFieldUpdateOperationsInput | number | null
    compra?: compraUpdateOneWithoutProductocompraNestedInput
  }

  export type productocompraUncheckedUpdateWithoutProductoInput = {
    Id?: StringFieldUpdateOperationsInput | string
    cantidad?: NullableIntFieldUpdateOperationsInput | number | null
    Id_compra?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type productocompraUncheckedUpdateManyWithoutProductoInput = {
    Id?: StringFieldUpdateOperationsInput | string
    cantidad?: NullableIntFieldUpdateOperationsInput | number | null
    Id_compra?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type compraCreateManyProveedorInput = {
    Id?: string
    fecha?: Date | string | null
    total?: Decimal | DecimalJsLike | number | string | null
    sku?: string | null
  }

  export type compraUpdateWithoutProveedorInput = {
    Id?: StringFieldUpdateOperationsInput | string
    fecha?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    productocompra?: productocompraUpdateManyWithoutCompraNestedInput
  }

  export type compraUncheckedUpdateWithoutProveedorInput = {
    Id?: StringFieldUpdateOperationsInput | string
    fecha?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    productocompra?: productocompraUncheckedUpdateManyWithoutCompraNestedInput
  }

  export type compraUncheckedUpdateManyWithoutProveedorInput = {
    Id?: StringFieldUpdateOperationsInput | string
    fecha?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type almacenCreateManyTiendaInput = {
    Id?: string
    nombre?: string | null
  }

  export type usuariosCreateManyTiendaInput = {
    Id?: string
    nombre?: string | null
    email: string
    contrasena: string
    fotoUrl?: string | null
    codigoVerificacion?: string | null
    codigoVerificacionExp?: Date | string | null
    activo?: boolean | null
    verificado?: boolean | null
    rol: $Enums.usuarios_rol
  }

  export type almacenUpdateWithoutTiendaInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    producto?: productoUpdateManyWithoutAlmacenNestedInput
  }

  export type almacenUncheckedUpdateWithoutTiendaInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    producto?: productoUncheckedUpdateManyWithoutAlmacenNestedInput
  }

  export type almacenUncheckedUpdateManyWithoutTiendaInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usuariosUpdateWithoutTiendaInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    contrasena?: StringFieldUpdateOperationsInput | string
    fotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacion?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacionExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    verificado?: NullableBoolFieldUpdateOperationsInput | boolean | null
    rol?: Enumusuarios_rolFieldUpdateOperationsInput | $Enums.usuarios_rol
  }

  export type usuariosUncheckedUpdateWithoutTiendaInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    contrasena?: StringFieldUpdateOperationsInput | string
    fotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacion?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacionExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    verificado?: NullableBoolFieldUpdateOperationsInput | boolean | null
    rol?: Enumusuarios_rolFieldUpdateOperationsInput | $Enums.usuarios_rol
  }

  export type usuariosUncheckedUpdateManyWithoutTiendaInput = {
    Id?: StringFieldUpdateOperationsInput | string
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    contrasena?: StringFieldUpdateOperationsInput | string
    fotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacion?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacionExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    verificado?: NullableBoolFieldUpdateOperationsInput | boolean | null
    rol?: Enumusuarios_rolFieldUpdateOperationsInput | $Enums.usuarios_rol
  }

  export type detallesventaCreateManyVentaInput = {
    Id?: string
    cantidad_recibida?: Decimal | DecimalJsLike | number | string | null
    devuelto?: Decimal | DecimalJsLike | number | string | null
    Id_producto?: string | null
  }

  export type detallesventaUpdateWithoutVentaInput = {
    Id?: StringFieldUpdateOperationsInput | string
    cantidad_recibida?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    devuelto?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    producto?: productoUpdateOneWithoutDetallesventaNestedInput
  }

  export type detallesventaUncheckedUpdateWithoutVentaInput = {
    Id?: StringFieldUpdateOperationsInput | string
    cantidad_recibida?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    devuelto?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    Id_producto?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type detallesventaUncheckedUpdateManyWithoutVentaInput = {
    Id?: StringFieldUpdateOperationsInput | string
    cantidad_recibida?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    devuelto?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    Id_producto?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}