export type SelectOption<T> = { label: string; value: T };

export type SelectOptions<T> =
  | SelectOption<T>[]
  | ReadonlyArray<SelectOption<T>>;
