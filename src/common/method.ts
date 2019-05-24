export const noTryCatch = <T>(promise: Promise<T>): Promise<[T, Error | undefined]> => promise
  .then<[T, undefined]>((data: T) => [data, undefined])
  // tslint:disable-next-line: no-any
  .catch<[any, Error]>((error: Error) => [undefined, error]);
