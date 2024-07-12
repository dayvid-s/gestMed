export function removeProperty(obj: any, prop: any) {
  const { [prop]: _, ...rest } = obj;
  return rest;
}