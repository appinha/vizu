export function isString(obj: unknown): obj is string {
  return typeof obj === "string";
}

export function isObject(obj: unknown): obj is Record<string, unknown> {
  return typeof obj === "object" && obj !== null && !Array.isArray(obj);
}
