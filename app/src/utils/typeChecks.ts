/**
 * @public
 */
export function isString(obj: unknown): obj is string {
  return typeof obj === "string";
}

/**
 * @public
 */
export function isObject(obj: unknown): obj is Record<string, unknown> {
  return typeof obj === "object" && obj !== null && !Array.isArray(obj);
}
