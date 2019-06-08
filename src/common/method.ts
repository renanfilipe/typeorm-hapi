type noTryCatch = <T>(promise: Promise<T>) => Promise<[Error | undefined, T]>;

export const noTryCatch: noTryCatch = <T>(promise: Promise<T>): Promise<[Error | undefined, T]> => promise
  .then<[undefined, T]>((data: T) => [undefined, data])
  // tslint:disable-next-line: no-any
  .catch<[Error, any]>((error: Error) => [error, undefined]);
